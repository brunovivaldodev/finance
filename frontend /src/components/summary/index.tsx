import React, { useContext } from "react";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
} from "react-icons/fi";
import { TransactionContext } from "../../contexts/transactionsContext";
import { useSummary } from "../../hooks/useSummary";
import "./styles.css";

export function Summary() {
  const summary = useSummary();
  return (
    <section className="summary-container">
      <div className="summary-card">
        <header>
          <span>Entradas</span>
          <FiArrowUpCircle size={32} color="#49AA26" />
        </header>
        <strong>{summary.income}</strong>
      </div>
      <div className="summary-card">
        <header>
          <span>Saídas</span>
          <FiArrowDownCircle size={32} color="#E92929" />
        </header>
        <strong>{summary.outcome}</strong>
      </div>
      <div className="summary-card summary-last-card-color">
        <header>
          <span>Total</span>
          <FiDollarSign size={32} />
        </header>
        <strong>{summary.total}</strong>
      </div>
    </section>
  );
}
