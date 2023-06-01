import { useContext } from "react";
import { TransactionContext } from "../contexts/transactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.value;
        acc.total += transaction.value;
      } else {
        acc.outcome += transaction.value;
        acc.total -= transaction.value;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );


  return summary;
}
