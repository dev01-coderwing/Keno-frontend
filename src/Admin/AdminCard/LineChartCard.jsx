import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const LineChartCard = ({ title, data }) => {
  const chartData = {
    labels: data.map((item) => item.week),
    datasets: [
      {
        label: "Bot",
        data: data.map((item) => item.Bot),
        fill: false,
        borderColor: "#FFFFFF",
        tension: 0.4,
      },
      {
        label: "Humans",
        data: data.map((item) => item.Humans),
        fill: false,
        borderColor: "#9270A7",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
      },
      y: {
        ticks: { color: "#ffffff" },
      },
    },
  };

  return (
    <div className="bg-[#131313] p-4 rounded-lg text-white w-full">
      <p className="mb-2">{title}</p>
      <Line data={chartData} options={options} />
      <p className="text-xs text-gray-400 py-2 text-center">
        Time Period (Last 6 Weeks)
      </p>
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-sm">Average Bot FRT</p>
          <h4 className="text-2xl">3 Mins</h4>
          <span className="bg-[#262626] px-2 py-1 rounded-lg text-xs text-green-500">+ 2.87%</span>
        </div>
        <div className="text-center">
          <p className="text-sm">Average Human FRT </p>
          <h4 className="text-2xl">4 Mins 2 sec</h4>
          <span className="bg-[#262626] px-2 py-1 rounded-lg text-xs text-green-500">+ 2.87%</span>
        </div>
      </div>
    </div>
  );
};

export default LineChartCard;
