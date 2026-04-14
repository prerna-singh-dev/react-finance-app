import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseDoughnut() {
  const transactions = useSelector((state) => state.transaction.list);
  /* data for doughnut chart*/
  const categoryMap = transactions.reduce((acc, item) => {
    if (item.type === "Expense")
      acc[item.category] = acc[item.category] + item.amount || item.amount;
    return acc;
  }, {});

  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count; // spread colors evenly
      return `hsl(${hue}, 70%, 60%)`;
    });
  };

  const backgroundColors = generateColors(Object.keys(categoryMap).length);

  const chartData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Amount spent",
        data: Object.values(categoryMap),
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      {transactions && transactions?.length > 0 ? (
        <Doughnut data={chartData} />
      ) : (
        <div className="text-center py-14 text-sm space-y-2">
          <p>“No expense data available.”</p>
          <p>
            <Link to="/transactions/add" className="text-pink-700 font-medium">
              Add transactions
            </Link>
            &nbsp; to view expense distribution by category.
          </p>
        </div>
      )}
    </>
  );
}

export default ExpenseDoughnut;
