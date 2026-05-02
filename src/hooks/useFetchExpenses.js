import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useFetchExpenses() {
  const transaction = useSelector((state) => state.transaction.list);
  const list = Array.isArray(transaction) ? transaction : [];

  return useMemo(() => {
    const { salary, expense } = list.reduce(
      (acc, item) => {
        if (item.type === "Income") {
          acc.salary += Number(item.amount);
        } else if (item.type === "Expense") {
          acc.expense += Number(item.amount);
        }
        return acc;
      },
      { salary: 0, expense: 0 },
    );

    const balance = salary - expense;
    return [salary, expense, balance];
  }, [list]);
}
