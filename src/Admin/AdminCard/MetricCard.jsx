import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const MetricCard = ({ title, value, subtext, trend, info }) => {
  console.log("INFO =>", info);
  return (
    <div className="bg-[#131313] rounded-lg p-6 text-white w-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{title}</p>
        <span className="text-red-700 text-xs bg-[#252525] px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <div className="flex items-center py-2">
        <h2 className="text-2xl font-semibold">{value}</h2>
        <span className="text-xs text-gray-400">{subtext}</span>
      </div>

   {info && (
  <div className="text-sm mt-3">
    {Object.entries(info).map(([key, val]) => (
      <div
        key={key}
        className="flex justify-between items-center border-b border-gray-700 py-1"
      >
        <div className="flex items-center gap-2">
          <BsCheckCircleFill className="text-green-500 text-sm" />
          <span className="text-gray-300">{key}</span>
        </div>
        <span className="text-white">{val}</span>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default MetricCard;
