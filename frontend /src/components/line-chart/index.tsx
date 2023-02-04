import React from "react";
import "./styles.css";
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
import { useData } from "../../hooks/useData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Chart.js Line Chart",
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

export function LineChart() {
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
    <main className="line-chart-container">
      <Line options={options} data={data()} />
    </main>
  );
}
