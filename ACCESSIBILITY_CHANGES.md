# Accessibility — full project log

This document lists **accessibility-related behavior and markup** implemented across the app: **where**, **what**, and **why**. It replaces scattered session notes with a single reference you can read later.

---

## App shell

### `src/App.jsx`

- **`ErrorBoundary`** wraps the main **`Outlet`** so render errors in route content surface a fallback UI instead of a blank screen (see `ErrorBoundary.jsx`).

**Why**: Failures are visible and recoverable via navigation.

---

## Navigation

### `src/components/Sidebar.jsx`

- **Focus styling**: `focus-visible:ring-2 focus-visible:ring-pink-700 …` on logo links and `NavLink`s.
- **Landmark**: `nav` with **`aria-label="Sidebar navigation"`**.
- **Current page**: `aria-current="page"` where the route matches `pathname`.

**Why**: Keyboard users see focus; screen readers get a labeled nav and current location.

### `src/components/TopNavigation.jsx` (mobile)

- **Focus styling**: same ring pattern on logo links, hamburger, and menu links.
- **Hamburger semantics**: `aria-expanded`, `aria-controls="mobile-primary-nav"`, `aria-haspopup="menu"`, dynamic **`aria-label`** (open/close).
- **Landmark**: `nav` with **`aria-label="Primary navigation"`** and `id="mobile-primary-nav"`.
- **Overlay**: full-screen dismiss control with **`aria-label="Close menu overlay"`**.
- **Keyboard**: **Escape** closes the menu when open.
- **Decorative glyph**: `aria-hidden="true"` on the × character where appropriate.

**Why**: Mobile menu state is exposed to assistive tech; Escape matches common expectations.

---

## Route loading (code splitting)

### `src/main.jsx`

- **`Suspense`** fallback while lazy route chunks load.
- **Decorative spinner**: loading indicator uses **`aria-hidden="true"`**; visible text **“Loading…”** supplies the status for sighted users (for stricter AT you could add `role="status"` + `aria-live="polite"` on the text container).

**Why**: Avoids silent blank transitions; keeps decorative animation out of the accessibility tree where possible.

---

## Dashboard

### `src/components/Dashboard.jsx`

- **Sections**: `aria-label` on summary and charts sections.
- **Cards**: summary areas use **`article`** with descriptive **`aria-label`** (e.g. income summary).
- **Decorative images**: `alt=""` and `aria-hidden="true"` where icons are visual only.
- **Charts**: wrappers use **`role="region"`** + **`aria-label`** (canvas charts still need textual summaries for full WCAG compliance — see gaps).

**Why**: Page structure is navigable by landmark and section; charts get a label even though canvas has no text.

---

## Transactions

### `src/components/Transactions.jsx`

- **Filter control**: toolbar filter button has **`aria-label="Apply Filters"`** (and `title` for pointer tooltips).
- **Sort control**:
  - **`aria-label="Sort Transactions"`**
  - **`aria-haspopup="menu"`**, **`aria-expanded`**, **`aria-controls`** tied to list **`id`** from **`useId()`**
- **Sort menu items**: **`button type="button"`** (not `<a>` without `href`) for **Newest / Oldest**.
- **Keyboard**: **Escape** closes the sort menu (window `keydown` while open).
- **Pointer**: click **outside** the sort control wrapper closes the menu; listener only attached while menu is open.
- **Row actions**: Edit / Delete use **`type="button"`** and **`aria-label`** including description or category.
- **Empty state**: **“Adjust filters”** is a **`button type="button"`**, not a fake link.

**Why**: Correct roles and names for icon-only controls; sort UI exposes open/closed relationship; no invalid interactive anchors.

---

## Filters panel

### `src/components/Filters.jsx`

- **Close control**: **`aria-label="Close filters"`**.
- **Custom radios/checkboxes**: visually hidden native inputs with **`peer-focus-visible:ring-*`** so keyboard focus is still visible on the styled control.

**Why**: Close is identifiable to AT; custom styling doesn’t fully hide keyboard affordance.

**Gap**: Grouping could be strengthened with **`fieldset` / `legend`** for Type / Month / Category (see gaps).

---

## Categories

### `src/components/Categories.jsx`

- **Delete**: real **`button`** with **`aria-label`** including category name; focus ring.
- **Add form**: **`aria-label="Add new category"`** on the form.
- **Errors**: **`role="alert"`** + **`aria-live="polite"`** on validation messages.
- **Actions**: Save / Clear buttons include **`aria-label`** where helpful.
- **Decorative**: trash glyph can use **`aria-hidden`** when the button label carries the name.

**Why**: CRUD controls are named; errors are announced.

---

## Emoji picker (category icon)

### `src/components/EmojiTab.jsx`

- **Tab pattern**: `role="tablist"`, **`aria-label="Emoji categories"`**, tabs with **`role="tab"`**, **`aria-selected`**, **`aria-controls`**, **`tabIndex`** management; panels with **`role="tabpanel"`** and **`aria-labelledby`**.
- **Keyboard**: ArrowLeft/Right, Home/End, Enter/Space.
- **Emoji buttons**: **`aria-label="Select {emoji} icon"`**, **`type="button"`**.
- **Focus rings** on tabs and emoji buttons.

**Why**: Tabs without this pattern are unusable for many keyboard and screen-reader users.

---

## Add / edit transaction

### `src/components/AddTransaction.jsx`

- **Validation**: error text uses **`role="alert"`** + **`aria-live="polite"`**.
- **Success / loading modal**: uses **`GlobalModal`** with **`ariaLabel`** / **`ariaBusy`** for dialog naming and busy state (see modal).
- **Decorative** imagery in modal: `aria-hidden` where appropriate.

**Why**: Form errors and async save state are communicated.

---

## Modals

### `src/components/GlobalModal.jsx`

- **Dialog semantics**: **`role="dialog"`**, **`aria-modal="true"`**, **`aria-label`** (prop), optional **`aria-busy`**.
- **Focus**: container is focusable via **`tabIndex={-1}`** and receives focus on open.
- **Close**: button with **`aria-label="Close dialog"`**; × is **`aria-hidden`**.

**Why**: Assistive tech recognizes a modal; user has a named close control.

**Gap**: No **focus trap** or **focus restoration** to the opener yet; Escape-to-close is not global here (depends on usage).

---

## Page header / decorative imagery

### `src/components/PageHeader.jsx`

- Decorative or redundant imagery marked **`aria-hidden="true"`** where applicable.

**Why**: Avoids duplicate or meaningless announcements.

---

## Background / motion

### `src/components/Particle.jsx`

- Particles limited on small viewports (**`hidden lg:block`**) so motion and work aren’t forced on mobile.

**Why**: Reduces distraction and main-thread work on small devices.

### `src/index.css`

- Page **background color** aligned with branded background so content isn’t jarring when particles are hidden.

**Why**: Visual consistency; avoids “flash” of wrong color.

---

## Error and not-found pages

### `src/components/NotFound.jsx`

- Proper **heading** (`h1` / supporting text) and **link back** to dashboard.

**Why**: Clear structure and an actionable recovery path.

### `src/components/ErrorBoundary.jsx`

- Error state uses **headings** and a **link** to dashboard.

**Why**: Users aren’t stuck on a broken blank view without a path out.

---

## Known accessibility gaps (remaining)

These are **not** all blockers for shipping, but they are the usual next steps if you want stricter WCAG / audits:

1. **Charts** (`ExpenseDoughnut.jsx`, `IncomeVsExpenseChart.jsx`): Chart.js uses **canvas** — add a **text summary**, **data table**, or **visually hidden** description for screen readers.
2. **`GlobalModal.jsx`**: Add **focus trap**, **Escape** to close (if product agrees), and **return focus** to the element that opened the dialog.
3. **`Filters.jsx`**: Consider **`fieldset` / `legend`** for filter groups; ensure every input has an associated **visible** label where possible (not only peer styling).
4. **`Transactions.jsx` sort menu**: Optional upgrade to full **menu** pattern (`role="menu"` / `menuitem`) and roving tabindex if you want stricter menu semantics than “ disclosure + buttons”.
5. **`main.jsx` `RouteFallback`**: Optionally add **`role="status"`** + **`aria-live="polite"`** on the loading message for explicit announcement.

---

## How to extend this doc

When you add a feature, append a short subsection: **file → change → why**. Keep “gaps” honest so future you knows what’s left.
