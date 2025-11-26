import React from "react";

const MetricCard = ({ title, value, subtext, trend, info }) => {
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
        <div className=" text-sm">
          {Object.entries(info).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-gray-700">
              <span className="py-1">{key}</span>
              <span className="py-1">{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
