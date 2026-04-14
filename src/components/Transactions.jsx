import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteTransaction } from "../features/transaction/transactionSlice";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import GlobalModal from "./GlobalModal";
import PageHeader from "./PageHeader";

function Transactions() {
  const transactionData = useSelector((state) => state.transaction.list);
  const filters = useSelector((state) => state.filters.options);

  const [transactions, setTransactions] = useState(transactionData);
  const [toggleSortMenu, setToggleSortMenu] = useState(false);
  const [toggleFilterMenu, setToggleFilterMenu] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    sort("desc");
  }, []);

  const isFilterExist = () => {
    const isAnyFilter = Object.values(filters).some((item) => {
      if (
        (Array.isArray(item) && item.length === 0) ||
        (typeof item === "string" && item.trim() === "")
      )
        return false;
      else return true;
    });
    return isAnyFilter;
  };

  const isAnyFilter = isFilterExist();

  useEffect(() => {
    if (isAnyFilter) applyFilters();
  }, []);

  const sort = (sortOrder) => {
    let sortedTransactions = [];
    if (sortOrder === "asc") {
      sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (sortOrder === "desc") {
      sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    setTransactions(sortedTransactions);
  };

  const applyFilters = () => {
    console.log("Inside apply filters");
    setShowLoading(true);

    let filteredTransaction = [];
    filteredTransaction = transactionData.filter((item) => {
      return (
        (!filters.type || item.type === filters.type) &&
        (filters.category.length === 0 ||
          filters.category.includes(item.category)) &&
        (filters.minAmount === null || item.amount >= filters.minAmount) &&
        (filters.maxAmount === null || item.amount <= filters.maxAmount)
      );
    });

    console.log(filteredTransaction);

    setTransactions(filteredTransaction);
    setShowLoading(false);
    setToggleFilterMenu(false);
  };

  const resetFilters = () => {
    setTransactions(transactionData);
    setToggleFilterMenu(false);
  };

  const deleteTransactions = () => {
    setTransactions(transactionData);
  };

  return (
    <>
      <section className="space-y-6">
        <PageHeader
          heading="Manage your records"
          subHeading="Transaction"
          image="transfer.png"
        >
          <p className="mt-1 text-sm text-slate-600">
            Track and manage all your income and expenses in one place.
            <br /> View detailed records and stay organized with your financial
            activity.
          </p>
        </PageHeader>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between  p-4 pb-2">
            <div>
              <div className="text-base font-semibold text-slate-900">
                Recent transactions
              </div>
              <div className="mt-1 text-xs text-slate-500">some lines</div>
            </div>
            {(transactions || isAnyFilter) && (
              <div className="flex items-center gap-2 relative">
                <button
                  className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 relative"
                  title="Filter"
                  aria-label="Apply Filters"
                  onClick={() => setToggleFilterMenu((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Sort Transactions"
                  title="Sort"
                  className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 relative"
                  onClick={() => setToggleSortMenu((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 17V7m0 0l-3 3m3-3l3 3"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7v10m0 0l3-3m-3 3l-3-3"
                    />
                  </svg>
                </button>
                {toggleSortMenu && (
                  <ul className="absolute right-0 top-8 border bg-white text-xs shadow-md">
                    <li className="py-1.5 px-4 border-b border-gray-200 hover:bg-gray-100">
                      <a
                        onClick={() => sort("desc")}
                        className="inline-block cursor-pointer"
                      >
                        Newset
                      </a>
                    </li>
                    <li className="py-1.5 px-4 hover:bg-gray-100">
                      <a
                        onClick={() => sort("asc")}
                        className="inline-block cursor-pointer"
                      >
                        Oldest
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          {toggleFilterMenu && (
            <Filters
              applyFilters={applyFilters}
              onResetFilters={resetFilters}
              closeFilters={() => setToggleFilterMenu(false)}
            />
          )}

          {isAnyFilter && (
            <ul className="p-4 list-none flex items-center gap-2 mb-3">
              <li> Applied Filters :</li>
              {Object.keys(filters).map(
                (item) =>
                  filters[item] != "" && (
                    <li key={item}>
                      <button className="rounded-full px-3 py-1 text-xs font-medium text-white bg-pink-700 cursor-pointer">
                        {filters[item]}
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}

          {transactions.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Description</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-600">
                          {new Date(item.date).toLocaleDateString("en-IN", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900 capitalize">
                          {item.description}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              item.type === "Income"
                                ? "text-emerald-700 bg-emerald-50"
                                : "text-rose-700 bg-rose-50"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            item.type === "Income"
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {item.amount}
                        </td>
                        <td className="px-4 py-3  font-semibold">
                          <button
                            className="text-lg mx-2"
                            onClick={() =>
                              navigate(`/transactions/edit/${item.id}`)
                            }
                          >
                            ✏️
                          </button>
                          <button
                            className="text-lg mx-2"
                            onClick={() => {
                              dispatch(deleteTransaction(item.id));
                              deleteTransactions();
                            }}
                          >
                            ❌
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className=" border-t border-slate-200 p-4 text-sm">
                <div className="text-center">
                  <Link
                    to="/transactions/add"
                    className="inline-block py-2 rounded-xl bg-pink-700 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-600"
                  >
                    Add More
                  </Link>
                </div>
              </div>
            </>
          ) : !isAnyFilter ? (
            <p className="flex justify-center items-center p-16">
              No transaction data !!
            </p>
          ) : (
            <p className="flex justify-center items-center p-16 text-sm">
              No results found.
              <a
                className="text-pink-700 font-medium inline-block ml-1 text-sm"
                onClick={() => setToggleFilterMenu(true)}
              >
                Adjust filters
              </a>
            </p>
          )}
          {showLoading && (
            <GlobalModal>
              <p>Applying filters...</p>
            </GlobalModal>
          )}
        </div>
      </section>
    </>
  );
}

export default Transactions;
