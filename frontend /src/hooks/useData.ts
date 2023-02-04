import { useContext } from "react";
import { TransactionContext } from "../contexts/transactionsContext";

export function useData() {
  const { transactions } = useContext(TransactionContext);

  const incomes = () => {
    const trans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    transactions.forEach((transaction) => {
      if (transaction.type === "INCOME") {
        const date = new Date(transaction.date).getMonth();
        trans[date] += transaction.value;
      }
    });
    return trans;
  };

  const outcomes = () => {
    const trans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    transactions.forEach((transaction) => {
      if (transaction.type === "OUTCOME") {
        const date = new Date(transaction.date).getMonth();
        trans[date] += transaction.value;
      }
    });
    return trans;
  };

  return {
    incomes,
    outcomes,
  };
}
