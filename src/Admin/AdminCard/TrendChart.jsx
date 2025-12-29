import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotColdNumbers } from "../../redux/dashboardSlice";

const TrendChart = () => {
  const dispatch = useDispatch();

  const { hotNumbers, draw, time, hotColdLoading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchHotColdNumbers());
  }, [dispatch]);

  if (hotColdLoading) {
    return <div className="text-white">Loading Hot Numbers...</div>;
  }

  // 🔹 HOT numbers ko chart format me convert
  const chartData = hotNumbers.map((num, index) => ({
    name: `#${index + 1}`, // X-axis label
    value: num,           // Y-axis value
  }));

  return (
    <div className="w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex justify-between text-gray-400 text-xs mb-2">
        <span>Draw {draw}</span>
        <span>{time}</span>
      </div>

      {/* Chart */}
      <div className="border border-gray-400 w-full sm:h-40 h-36 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#EF4000"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hot numbers list */}
      <div className="flex justify-center gap-3 mt-4 text-sm text-white">
        {hotNumbers.map((num) => (
          <span
            key={num}
            className="px-3 py-1 bg-[#EF4000] rounded-full"
          >
            {num}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 text-[10px] sm:text-base text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#EF4000] rounded-full"></span>
          Hot Numbers
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
