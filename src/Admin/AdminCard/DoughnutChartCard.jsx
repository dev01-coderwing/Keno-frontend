import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChartCard = ({ title, trend, data, centerText, subtext }) => {
  return (
    <div className="bg-[#131313] p-6 rounded-lg text-white w-full">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <span className="text-green-500 bg-[#262626] px-2 py-1 rounded-lg text-xs">{trend}</span>
      </div>
      <div className="h-32 relative flex items-center justify-center">
        <Doughnut data={data} options={{ cutout: "70%" }} />
        <div className="absolute inset-0 flex justify-center top-8 items-center text-lg font-semibold">
          {centerText}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 pt-4">{subtext}</div>
    </div>
  );
};

export default DoughnutChartCard;
