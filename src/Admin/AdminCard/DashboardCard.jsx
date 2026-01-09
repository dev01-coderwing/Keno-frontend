import React from 'react';

const DashboardCard = ({ value, label }) => {
  return (
    <div className="bg-[#131313] w-full sm:max-w-xs p-4 text-center rounded-lg shadow-md">
      <h3 className="font-semibold text-3xl sm:text-4xl py-2">{value}</h3>
      <p className="text-xs text-gray-400 sm:text-gray-500 py-2">{label}</p>
    </div>
  );
};

export default DashboardCard;
