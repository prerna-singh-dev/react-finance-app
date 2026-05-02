# Project improvements log — read this later

This document explains **what you were doing in the project**, **what changed in code (and why)**, and **how to review `Transactions.jsx`** without reading every line.

---

## 1. What *you* were doing (your direction)

These were your goals and preferences — they shaped the work:

- **Accessibility**: improve keyboard and screen-reader support (nav, forms, transactions, etc.).
- **Incremental changes**: you asked to **avoid one huge unreadable diff** (especially in `Transactions.jsx`); we tried to stick to small steps after that feedback.
- **Understanding**: you wanted **simple explanations** of bugs (e.g. sort menu outside-click, filters).
- **Performance**: memoize expense totals so work isn’t repeated every render.
- **Production**: deploy to **Netlify** — SPA routing, build, and lint should behave.

---

## 2. What *improved* in code (high level)

### 2.1 `src/hooks/useFetchExpenses.js` — memoized totals

- **Before**: Income/expense/balance were recomputed on every render of every component using the hook.
- **After**: Same numbers are computed with `useMemo`, **only when the transaction list reference/contents driving the memo change** (when Redux updates that list).
- **Why**: Cheaper when many components read totals (e.g. sidebar + dashboard).

### 2.2 `src/components/Transactions.jsx` — semantics, sort menu, filters

**Your changes (iterative UX / a11y):**

- “**Adjust filters**” control: use a real **`<button type="button">`** instead of a clickable `<a>` without `href` (invalid + poor for keyboard/AT).
- **Edit / Delete** emoji buttons: **`type="button"`** + **`aria-label`** so screen readers get a name, not only “emoji”.
- **Sort options**: use **`<button type="button">`** instead of `<a>` without `href`.
- **Sort button**: **`aria-haspopup`**, **`aria-expanded`**, **`aria-controls`** + stable **`id`** on the dropdown (`useId()`).
- **Keyboard**: **Escape** closes the sort menu.
- **Click outside**: `ref` on a **wrapper** that includes both the sort **toggle** and the **menu** so outside-click logic doesn’t treat the toggle as “outside” incorrectly.
- **Listener only while open**: document click listener runs **only when** the menu is open (less noise, clearer behavior).

**Larger refactor you noticed (why it looks like a lot):**

- **Filters bug**: `Filters.jsx` calls `applyFilters(payload)` so the parent must filter using that **payload**, not only Redux state on the same tick (Redux can lag one update). The parent was updated so filtering uses **one shared function** `filterTransactionList(list, criteria)` for:
  - **first paint** when filters already exist (e.g. from `sessionStorage`), and
  - **Apply** in the UI.
- **Lint / React patterns**: an effect that only existed to “apply filters on mount” was replaced by **initial state** built from the same filter function — fewer double-renders and clearer data flow.
- **Edge cases**: empty amount fields can become **`NaN`**; filtering treats empty/invalid min/max as “no bound” so the list doesn’t go empty by accident.
- **Date filters**: the UI had date options; filtering now applies **date ranges** consistently with those options.

**Mental model for review (3 blocks only):**

1. **Helpers at top**: `sortTransactionList`, `toYMD`, `filterTransactionList` — pure logic, no React.
2. **Initial state**: `useState(() => …)` — “what rows show first” (including saved filters).
3. **`applyFilters`**: runs when you click Apply — same rules as (2), then closes panel / loading UI.

### 2.3 `src/main.jsx` — lazy routes + Suspense

- **Before**: All route pages imported eagerly in one bundle.
- **After**: `React.lazy` for page components + `<Suspense fallback={…}>` around `RouterProvider`.
- **Why**: Smaller initial download; each route can load its own chunk (e.g. charts on dashboard).

### 2.4 Netlify — SPA refresh / deep links

- **File**: `public/_redirects` with `/* /index.html 200`
- **Why**: Static hosts must serve `index.html` for client-side routes (e.g. `/transactions`) so refresh doesn’t 404.

### 2.5 `eslint.config.js` — entry file exception

- **Issue**: `react-refresh/only-export-components` can **false-positive** on `src/main.jsx` (bootstrap file, not a “components only” module).
- **Fix**: Turn that rule **off only for `src/main.jsx`**, **after** the general `**/*.{js,jsx}` block so the override wins.

### 2.6 `src/components/IncomeVsExpenseChart.jsx` — line chart (month + year buckets)

- **Problem (original)**: Short month list + `monthLabels[getMonth()]` dropped **December**; `+ … || …` broke totals; month-name-only buckets merged **every year’s December**.
- **Current**: **Last 12 months** on the X-axis, each bucket **`YYYY-MM`**, labels like **Dec 2025** — see **§5** for old/new snippets, comparison table, and a **dry run with sample rows**.

---

## 3. “What I did” vs “what you improved” — quick table

| Area | You (direction / steps) | Code / tooling improvements |
|------|-------------------------|-------------------------------|
| Transactions UX | Incremental a11y (button vs `<a>`, labels, menu behavior) | Shared filter function, payload-safe Apply, date + NaN-safe amounts, initial state |
| Sort menu | Outside click, Escape, wrapper `ref` | Same, plus gated document listener |
| Performance | Asked for memoized totals | `useMemo` in `useFetchExpenses` |
| Deploy | Netlify readiness | `_redirects`, build/lint sanity |
| Bundling | (implicit: prod app) | `lazy` + `Suspense` in `main.jsx` |
| Lint | Wanted CI to make sense | `eslint.config.js` override for `main.jsx` |

---

## 4. Files touched beyond this doc (reference)

- `src/hooks/useFetchExpenses.js`
- `src/components/Transactions.jsx`
- `src/main.jsx`
- `public/_redirects`
- `eslint.config.js`
- `src/components/IncomeVsExpenseChart.jsx` (dashboard line chart — year/month bucketing; see **§5** below)
- `ACCESSIBILITY_CHANGES.md` (updated separately as the **full a11y inventory**)

---

## 5. Income vs expense line chart (`IncomeVsExpenseChart.jsx`) — detailed notes

This section is a **study guide**: what was wrong, what we tried, what the file does **now**, with **code snippets**, **examples**, and a **dry run**.

### 5.1 What the chart is supposed to do

- Read all **transactions** from Redux (`state.transaction.list`).
- Group each row into **time buckets** (one bucket per tick on the X-axis).
- For each bucket, sum **Income** and **Expense** separately.
- Draw a **line chart**: two lines (income vs expense) across those buckets.

The hard part is choosing buckets so that:

1. **December last year** and **December this year** are not accidentally **merged**.
2. **No month “disappears”** because the code only built labels for January → current month.

---

### 5.2 Version A — original logic (broken for December and for totals)

**Idea:** Build `monthLabels` = month names from January only **up to the current month**, then for each transaction do `monthLabels[getMonth()]`.

**Simplified old snippet (conceptual):**

```javascript
const currentMonth = new Date().getMonth();
const monthLabels = [
  "January", "February", /* … */, "December",
].slice(0, currentMonth + 1); // e.g. in May → only 5 names

transactions.forEach((item) => {
  const month = monthLabels[new Date(item.date).getMonth()];
  // December → getMonth() === 11, but monthLabels[11] is undefined if only 5 months!
  if (item.type === "Income") {
    monthlyIncome[month] = monthlyIncome[month] + item.amount || item.amount; // precedence bug
  }
  // …
});
```

**Why December broke**

- If “today” is **May**, `monthLabels` has indices **0–4** only.
- A transaction in **December** has `getMonth() === 11`.
- `monthLabels[11]` → **`undefined`** → that row never lands in a real bucket → looks like “December / last year not showing.”

**Why totals could be wrong**

- `a + b || c` does **not** mean `(a + b)` with fallback; `+` binds before `||`, so you don’t always get “previous total + new amount.”

---

### 5.3 Version B — “minimal” fix (12 month names, still year-blind)

**Idea:** Always use **all 12** names (`January` … `December`), fix addition with `(bucket || 0) + amount`.

**Simplified snippet:**

```javascript
const MONTH_LABELS = ["January", /* … */, "December"];

transactions.forEach((item) => {
  const monthName = MONTH_LABELS[new Date(item.date).getMonth()];
  const amount = Number(item.amount);
  if (item.type === "Income") {
    monthlyIncome[monthName] = (monthlyIncome[monthName] || 0) + amount;
  }
  // …
});
```

**What got better**

- **December shows up** again: index 11 always exists.
- **Totals** add correctly.

**What was still wrong for your data**

- Bucket key is only **`"December"`**, not **year + month**.
- So **December 2024** and **December 2025** both add into the **same** `"December"` total — you cannot see “last year December vs this year” as separate points.

---

### 5.4 Version C — current file (last 12 months, `YYYY-MM` buckets)

**Idea:**

1. Decide the **12 month slots** on the X-axis: the **last 12 calendar months** ending at **this month** (e.g. Mar 2025 … Feb 2026).
2. Each slot has:
   - an internal key: **`"YYYY-MM"`** (e.g. `"2025-12"`),
   - a **label** for humans: e.g. **`Dec 2025`** via `toLocaleDateString`.
3. For each transaction, compute **`yearMonthKey`** from `item.date`:
   - If stored as `YYYY-MM-DD`, use **`dateStr.slice(0, 7)`** → stable, no UTC “day shifted” surprises for the month.
4. If that key is **one of the 12 slots**, add the amount to income or expense; otherwise **ignore** (too old for this chart).

**Core helpers (as in the repo):**

```javascript
// "2025-12-15" → "2025-12"
function yearMonthKey(dateStr) {
  if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr.slice(0, 7);
  }
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// Build keys + labels for last 12 months from "today"
function last12MonthKeysAndLabels() {
  const now = new Date();
  const keys = [];
  const labels = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    keys.push(key);
    labels.push(d.toLocaleDateString("en-IN", { month: "short", year: "numeric" }));
  }
  return { keys, labels };
}
```

**Aggregation (pattern):**

```javascript
const { keys, labels } = last12MonthKeysAndLabels();
const keySet = new Set(keys);
const monthlyIncome = Object.fromEntries(keys.map((k) => [k, 0]));
const monthlyExpense = Object.fromEntries(keys.map((k) => [k, 0]));

list.forEach((item) => {
  const key = yearMonthKey(item.date);
  if (!key || !keySet.has(key)) return;
  const amount = Number(item.amount);
  if (Number.isNaN(amount)) return;
  if (item.type === "Income") monthlyIncome[key] += amount;
  else if (item.type === "Expense") monthlyExpense[key] += amount;
});

const monthlyIncomeMap = keys.map((k) => monthlyIncome[k]);
const monthlyExpenseMap = keys.map((k) => monthlyExpense[k]);
```

**Chart title in the app** (so users know the rule):  
`Income vs Expense (last 12 months, by month and year)`.

---

### 5.5 Side-by-side comparison (old “minimal” vs current)

| Topic | Version B (12 month names) | Version C (current) |
|--------|----------------------------|----------------------|
| X-axis | Always Jan … Dec (names only) | **12 consecutive months** ending **this month** |
| Label | `"December"` | `"Dec 2025"` (month **+ year**) |
| Bucket key | `"December"` | `"2025-12"` |
| Dec 2024 vs Dec 2025 | **Same bucket** | **Different buckets** (if both fall in the 12-month window) |
| Transaction from 14 months ago | Still folded into a month name | **Dropped** from this chart (not in `keySet`) |

---

### 5.6 Dry run — concrete example

**Assume “today” is 1 Feb 2026** (so the last 12 months are Mar 2025 → Feb 2026).

`last12MonthKeysAndLabels()` produces **keys** like:

```text
2025-03, 2025-04, …, 2025-12, 2026-01, 2026-02
```

**Sample transactions:**

| date       | type    | amount |
|-----------|---------|--------|
| 2025-12-10 | Expense | 100    |
| 2026-12-05 | Income  | 500    | ← *if you had this, key would be 2026-12 — not in window above* |
| 2026-01-15 | Income  | 200    |

**Dry run steps**

1. **`2025-12-10`** → `yearMonthKey` → **`2025-12`**.  
   - Is `2025-12` in the 12 keys? **Yes** (December **2025** is in the window).  
   - `monthlyExpense["2025-12"]` += 100 → **100**.

2. **`2026-12-05`** → **`2026-12`**.  
   - Window ends Feb 2026 → **2026-12 is not** in `keySet` → row **skipped** on this chart (that’s expected for “last 12 months”).

3. **`2026-01-15`** → **`2026-01`** → in set → income += 200.

So **last year’s December (2025-12)** shows on the **Dec 2025** tick, and **January 2026** on its own tick — **no mixing** with a generic “December.”

---

### 5.7 Trade-offs (honest)

- **Rolling 12 months** is clear and matches “recent trend,” but **does not** show a full **calendar year** (Jan–Dec of one year only) unless that year happens to align with the window.
- If you later want **“calendar year 2026 only”** or **24 months**, that’s a **separate** small product decision — the current code is optimized for **year-safe monthly buckets in a 12-month window**.

---

## 6. If you forget everything else

- **`filterTransactionList`** = single source of truth for “what rows match the filter UI”.
- **`applyFilters(payload)`** must use **`payload`** because **`Filters.jsx` already passes it** on purpose.
- **`13.9s` in React Profiler** (if you see it again) is usually **time since recording started**, not “component took 13 seconds” — check the **`ms`** next to it for duration.

This file is for **your** reading; it is not required for the app to run.
