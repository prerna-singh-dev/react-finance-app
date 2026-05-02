import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/** "2025-12-01" -> "2025-12" (avoids mixing December last year with December this year). */
function yearMonthKey(dateStr) {
  if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr.slice(0, 7);
  }
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** 12 month buckets ending this month: each slot is one real calendar month + year. */
function last12MonthKeysAndLabels() {
  const now = new Date();
  const keys = [];
  const labels = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    keys.push(key);
    labels.push(
      d.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    );
  }
  return { keys, labels };
}

function IncomeVsExpenseChart() {
  const transactions = useSelector((state) => state.transaction.list);
  const { keys, labels } = last12MonthKeysAndLabels();
  const keySet = new Set(keys);
  const monthlyIncome = Object.fromEntries(keys.map((k) => [k, 0]));
  const monthlyExpense = Object.fromEntries(keys.map((k) => [k, 0]));

  (Array.isArray(transactions) ? transactions : []).forEach((item) => {
    const key = yearMonthKey(item.date);
    if (!key || !keySet.has(key)) return;
    const amount = Number(item.amount);
    if (Number.isNaN(amount)) return;
    if (item.type === "Income") {
      monthlyIncome[key] += amount;
    } else if (item.type === "Expense") {
      monthlyExpense[key] += amount;
    }
  });

  const monthlyIncomeMap = keys.map((k) => monthlyIncome[k]);
  const monthlyExpenseMap = keys.map((k) => monthlyExpense[k]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expense (last 12 months, by month and year)",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: monthlyIncomeMap,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: monthlyExpenseMap,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      {transactions && transactions?.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <div className="text-center py-14 text-sm space-y-2">
          <p>“Your financial journey starts here 📈”</p>
          <p>
            <Link to="/transactions/add" className="text-pink-700 font-medium">
              Add transactions
            </Link>
            &nbsp; to visualize your spending and income trends.
          </p>
        </div>
      )}
    </>
  );
}

export default IncomeVsExpenseChart;
