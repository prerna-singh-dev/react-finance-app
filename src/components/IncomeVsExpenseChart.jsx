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
function IncomeVsExpenseChart() {
  const transactions = useSelector((state) => state.transaction.list);
  let monthlyIncome = {};
  let monthlyExpense = {};
  const currentMonth = new Date().getMonth();
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepetember",
    "October",
    "Novemeber",
    "December",
  ].slice(0, currentMonth + 1);

  transactions.forEach((item) => {
    const month = monthLabels[new Date(item.date).getMonth()];

    if (item.type === "Income") {
      monthlyIncome[month] = monthlyIncome[month] + item.amount || item.amount;
    } else {
      monthlyExpense[month] =
        monthlyExpense[month] + item.amount || item.amount;
    }
  });

  const monthlyIncomeMap = monthLabels.map((item) => monthlyIncome[item] || 0);
  const monthlyExpenseMap = monthLabels.map(
    (item) => monthlyExpense[item] || 0
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expense Trend over months",
      },
    },
  };

  const chartData = {
    labels: monthLabels,
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
