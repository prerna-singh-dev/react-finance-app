import { useSelector } from "react-redux";
import useFetchExpenses from "../hooks/useFetchExpenses";
function Dashboard() {
  const [salary, expense, balance] = useFetchExpenses();
  const category = useSelector((state) => state.category.list);
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Dashboard
          </div>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Transactions overview
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            A simple Tailwind UI starter.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Salary</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            &#8377;{salary ? salary : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Balance</div>
          <div className="mt-2 text-2xl font-semibold text-emerald-600">
            &#8377;{balance ? balance : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Expense</div>
          <div className="mt-2 text-2xl font-semibold text-rose-600">
            &#8377;{expense ? expense : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Categories</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {category ? category?.length : 0}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
