import { useSelector } from "react-redux";
import useFetchExpenses from "../hooks/useFetchExpenses";
import ExpenseDoughnut from "./ExpenseDoughnut";
import IncomeVsExpenseChart from "./IncomeVsExpenseChart";
import PageHeader from "./PageHeader";

function Dashboard() {
  const [salary, expense, balance] = useFetchExpenses();
  const category = useSelector((state) => state.category.list);

  return (
    <section className="space-y-6">
      <PageHeader
        heading="Transactions overview"
        subHeading="Dashboard"
        image="budget.png"
      >
        <p className="mt-1 text-sm text-slate-600">
          Track your income, expenses, and financial health in one place.
          <br />
          Analyze spending patterns and trends with clear insights.
        </p>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
          <img src="income.png" alt="" className="w-14 inline-block my-2" />

          <div className="mt-2 text-2xl font-semibold text-slate-900 my-2">
            &#8377;{salary ? salary : 0}
          </div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-widest">
            Income
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
          <img src="saving.png" alt="" className="w-14 inline-block my-2" />

          <div className="mt-2 text-2xl font-semibold text-emerald-600 my-2">
            &#8377;{balance ? balance : 0}
          </div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-widest">
            Balance
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
          <img src="expense.png" alt="" className="w-14 inline-block my-2" />

          <div className="mt-2 text-2xl font-semibold text-rose-600 my-2">
            &#8377;{expense ? expense : 0}
          </div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-widest">
            Expense
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-center">
          <img src="category.png" alt="" className="w-14 inline-block my-2" />

          <div className="mt-2 text-2xl font-semibold text-slate-900 my-2">
            {category ? category?.length : 0}
          </div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-widest">
            Categories
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl">
          <ExpenseDoughnut />
        </div>
        <div className="bg-white p-4  col-span-2 rounded-2xl">
          <IncomeVsExpenseChart />
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
