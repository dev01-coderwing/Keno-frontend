import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChartCard = ({ title, data = [] }) => {
  const chartRef = useRef(null);

  const bot = data[0]?.Bot || 0;
  const human = data[0]?.Humans || 0;
  const label = data[0]?.label || "0Hrs 0Mins";

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
        data: [bot, null],
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, "#00FF75", "#147A42"),
        borderRadius: 12,
        barThickness: 50,
      },
      {
        label: "Human",
        data: [null, human],
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
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="bg-[#131313] p-5 rounded-xl text-white w-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p>{title}</p>
          <h2 className="text-2xl font-semibold mt-4">{label}</h2>
          <p className="text-xs text-gray-400 mt-1">/ This Week</p>
        </div>
      </div>

      <div className="h-40">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChartCard;
