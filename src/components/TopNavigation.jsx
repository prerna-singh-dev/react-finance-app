import { NavLink, Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const linkClass = ({ isActive }) =>
    isActive ? "text-pink-700 font-semibold" : "text-slate-900";

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
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

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm ${focusRing}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-primary-nav"
            aria-haspopup="menu"
          >
            {isOpen ? (
              <span className="text-xl leading-none" aria-hidden="true">
                &times;
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close menu overlay"
            onClick={close}
          />
          <nav
            className="fixed inset-x-0 top-[57px] z-40 lg:hidden"
            aria-label="Primary navigation"
            id="mobile-primary-nav"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="rounded-b-2xl border border-t-0 border-slate-200 bg-white shadow-xl">
                <ul className="space-y-1 p-3 text-sm">
                  <li>
                    <NavLink
                      to="/"
                      onClick={close}
                      className={(args) =>
                        `block rounded-xl px-3 py-2 hover:bg-slate-50 ${focusRing} ${linkClass(
                          args,
                        )}`
                      }
                      aria-current={pathname === "/" ? "page" : undefined}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/transactions"
                      onClick={close}
                      className={(args) =>
                        `block rounded-xl px-3 py-2 hover:bg-slate-50 ${focusRing} ${linkClass(
                          args,
                        )}`
                      }
                      aria-current={
                        pathname === "/transactions" ? "page" : undefined
                      }
                    >
                      Transactions
                    </NavLink>
                    <ul className="mt-1 space-y-1 pl-3">
                      <li>
                        <NavLink
                          to="/transactions/list"
                          onClick={close}
                          className={(args) =>
                            `block rounded-xl px-3 py-2 hover:bg-slate-50 ${focusRing} ${linkClass(
                              args,
                            )}`
                          }
                          aria-current={
                            pathname === "/transactions/list"
                              ? "page"
                              : undefined
                          }
                        >
                          All Transactions
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/transactions/add"
                          onClick={close}
                          className={(args) =>
                            `block rounded-xl px-3 py-2 hover:bg-slate-50 ${focusRing} ${linkClass(
                              args,
                            )}`
                          }
                          aria-current={
                            pathname === "/transactions/add"
                              ? "page"
                              : undefined
                          }
                        >
                          Log Transaction
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      onClick={close}
                      className={(args) =>
                        `block rounded-xl px-3 py-2 hover:bg-slate-50 ${focusRing} ${linkClass(
                          args,
                        )}`
                      }
                      aria-current={
                        pathname === "/categories" ? "page" : undefined
                      }
                    >
                      Categories
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default TopNavigation;
