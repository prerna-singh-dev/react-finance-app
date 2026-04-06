import useFetchExpenses from "../hooks/useFetchExpenses";
import { NavLink, Link } from "react-router";
function Sidebar() {
  const [salary, expense, balance] = useFetchExpenses();

  return (
    <>
      <aside className="hidden w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-700 text-sm font-semibold text-white">
            RF
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              React Finance
            </div>
            <div className="text-xs text-slate-500">Tracker</div>
          </div>
        </div>

        <nav>
          <ul className="mt-6 space-y-2 text-sm list-none">
            <li className="font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700  text-white rounded-xl px-3 py-2 block  hover:bg-pink-800"
                    : "text-slate-900 rounded-xl px-3 py-2 block  hover:bg-slate-100"
                }
                to="/"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="font-medium">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-pink-700  text-white rounded-xl px-3 py-2 block  hover:bg-pink-800"
                    : "text-slate-900 rounded-xl px-3 py-2 block  hover:bg-slate-100"
                }
                to="/transactions"
              >
                Transactions
              </NavLink>
              <ul className="ml-5 space-y-2 mt-2">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-pink-700  text-white rounded-xl px-3 py-2 block  hover:bg-pink-800"
                        : "text-slate-900 rounded-xl px-3 py-2 block  hover:bg-slate-100"
                    }
                    to="/transactions/list"
                  >
                    All Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-pink-700  text-white rounded-xl px-3 py-2 block  hover:bg-pink-800"
                        : "text-slate-900 rounded-xl px-3 py-2 block  hover:bg-slate-100"
                    }
                    to="/transactions/add"
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
                    ? "bg-pink-700  text-white rounded-xl px-3 py-2 block  hover:bg-pink-800"
                    : "text-slate-900 rounded-xl px-3 py-2 block  hover:bg-slate-100"
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
              <span className="text-slate-600">Salary</span>
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
              <span className="text-slate-600">Saved</span>
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
