import React from "react";
import "./styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useData } from "../../hooks/useData";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Oct",
  "Nov",
  "Dez",
];

export function BarChart() {
  function data() {
    const { incomes, outcomes } = useData();
    return {
      labels,
      datasets: [
        {
          label: "Entradas",
          data: incomes(),
          backgroundColor: "rgba(45, 74, 34, 1)",
        },
        {
          label: "Saídas",
          data: outcomes(),
          backgroundColor: "rgba(90, 220, 162, 1)",
        },
      ],
    };
  }
  return (
    <main className="bar-chart-container">
      <Bar options={options} data={data()} />
    </main>
  );
}
