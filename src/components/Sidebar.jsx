import useFetchExpenses from "../hooks/useFetchExpenses";
import { NavLink, Link } from "react-router";
import { useLocation } from "react-router-dom";
function Sidebar() {
  const [salary, expense, balance] = useFetchExpenses();

  const { pathname } = useLocation();

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  return (
    <>
      <aside className="w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-700 text-sm font-semibold text-white">
            <Link to="/" className={focusRing}>
              RF
            </Link>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              <Link to="/" className={focusRing}>
                React Finance
              </Link>
            </div>
            <div className="text-xs text-slate-500">Tracker</div>
          </div>
        </div>

        <nav aria-label="Sidebar navigation">
          <ul className="mt-6 space-y-2 text-sm list-none">
            <li className="font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `bg-pink-700 text-white rounded-xl px-3 py-2 block hover:bg-pink-800 ${focusRing}`
                    : `text-slate-900 rounded-xl px-3 py-2 block hover:bg-slate-100 ${focusRing}`
                }
                to="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Dashboard
              </NavLink>
            </li>

            <li className="font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `bg-pink-700 text-white rounded-xl px-3 py-2 block hover:bg-pink-800 ${focusRing}`
                    : `text-slate-900 rounded-xl px-3 py-2 block hover:bg-slate-100 ${focusRing}`
                }
                to="/transactions"
                aria-current={pathname === "/transactions" ? "page" : undefined}
              >
                Transactions
              </NavLink>
              <ul className="ml-5 space-y-2 mt-2">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `bg-pink-700 text-white rounded-xl px-3 py-2 block hover:bg-pink-800 ${focusRing}`
                        : `text-slate-900 rounded-xl px-3 py-2 block hover:bg-slate-100 ${focusRing}`
                    }
                    to="/transactions/list"
                    aria-current={
                      pathname === "/transactions/list" ? "page" : undefined
                    }
                  >
                    All Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `bg-pink-700 text-white rounded-xl px-3 py-2 block hover:bg-pink-800 ${focusRing}`
                        : `text-slate-900 rounded-xl px-3 py-2 block hover:bg-slate-100 ${focusRing}`
                    }
                    to="/transactions/add"
                    aria-current={
                      pathname === "/transactions/add" ? "page" : undefined
                    }
                  >
                    Log Transaction
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `bg-pink-700 text-white rounded-xl px-3 py-2 block hover:bg-pink-800 ${focusRing}`
                    : `text-slate-900 rounded-xl px-3 py-2 block hover:bg-slate-100 ${focusRing}`
                }
                to="/categories"
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Quick stats
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Income</span>
              <span className="font-semibold text-slate-900">
                &#8377;{salary ? salary : 0}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Spent</span>
              <span className="font-semibold text-rose-600">
                &#8377;{expense ? expense : 0}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Balance</span>
              <span className="font-semibold text-emerald-600">
                &#8377;{balance ? balance : 0}
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
