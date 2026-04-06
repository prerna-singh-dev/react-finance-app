import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTransaction } from "../features/transaction/transactionSlice";

function Transactions() {
  const transactions = useSelector((state) => state.transaction.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <section className="space-y-6">
        <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">
              Transactions overview
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Here’s a snapshot of your financial activity. Add new transactions
              and monitor where your money is going—every entry helps you stay
              one step ahead.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Recent transactions
              </div>
              <div className="mt-1 text-xs text-slate-500">some lines</div>
            </div>
            {transactions && transactions?.length > 0 && (
              <div className="flex items-center gap-2">
                <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Export
                </button>
                <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Filters
                </button>
              </div>
            )}
          </div>

          {transactions && transactions?.length > 0 ? (
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
                        <td className="px-4 py-3 font-medium text-slate-900">
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
                            onClick={() => dispatch(deleteTransaction(item.id))}
                          >
                            ❌
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm">
                <div className="text-slate-600">
                  Showing 5 of {transactions?.length}
                </div>
                <div className="flex items-center gap-2">
                  {/* <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-medium text-slate-700 hover:bg-slate-50">
                Prev
              </button>
              <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-medium text-slate-700 hover:bg-slate-50">
                Next
              </button> */}
                </div>
              </div>
            </>
          ) : (
            <p className="flex justify-center items-center p-4">
              No transaction data !!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Transactions;
