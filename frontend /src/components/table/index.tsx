import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/transactionsContext";
import { FiTrash } from "react-icons/fi";

import "./styles.css";

export function Table() {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <main className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>

            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <>
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td
                    className={
                      transaction.type === "INCOME"
                        ? "income-value"
                        : "outcome-value"
                    }
                  >
                    {transaction.value}
                  </td>
                  <td>Outra</td>
                  <td>{transaction.date}</td>
                  <td>
                    <FiTrash
                      size={32}
                      color="#E92929"
                      onClick={() => {
                        deleteTransaction({
                          transaction_id: transaction.id,
                        });
                      }}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
