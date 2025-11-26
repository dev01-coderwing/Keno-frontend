import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChartCard = ({ title = "Average Resolution Time", data }) => {
  const chartRef = useRef(null);

  const getGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const chartData = {
    labels: ["", ""],
    datasets: [
      {
        label: "Bot",
        data: [2.07, null],
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, "#00FF75", "#147A42"),
        borderRadius: 12,
        barThickness: 50,
      },
      {
        label: "Human",
        data: [null, 2.07],
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, "#FF6A76", "#9A1A1A"),
        borderRadius: 12,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#131313] p-5 rounded-xl text-white w-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p>{title}</p>
          <h2 className="text-2xl font-semibold mt-4">2Hrs 4Mins</h2>
          <p className="text-xs text-gray-400 mt-1">/ This Week</p>
        </div>
        <span className="text-xs bg-[#262626] text-[#FF6A76] px-2 py-1 rounded-lg font-semibold">
          -2.87%
        </span>
      </div>

      <div className="h-40 relative">
        <Bar ref={chartRef} data={chartData} options={options} height="100%" />
      </div>

      <div className="flex justify-around text-center text-sm mt-4">
        <p>2Hrs 4Mins</p>
        <p>2Hrs 4Mins</p>
      </div>
    </div>
  );
};

export default BarChartCard;
