import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchKenoGraph } from "../../redux/kenoGraphSlice";

const StatsCard = () => {
  const dispatch = useDispatch();

  const { graphData, loading, error } = useSelector(
    (state) => state.kenoGraph
  );

  useEffect(() => {
    dispatch(fetchKenoGraph());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const chartData = graphData?.drawTrendChart?.data || [];

  // 👉 Month extractor (Jan, Feb, ...)
  const getMonthName = (dateStr) =>
    new Date(dateStr).toLocaleString("en-US", { month: "short" });

  // 👉 Unique months only
  const months = [...new Set(chartData.map((d) => getMonthName(d.date)))];

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="flex items-end sm:items-start">
        {/* Y Axis */}
        <div className="flex flex-col gap-6 sm:gap-3 text-right text-[10px] sm:text-sm">
          <span>1200</span>
          <span>900</span>
          <span>600</span>
          <span>300</span>
          <span>0</span>
        </div>

        {/* Chart */}
        <div className="border w-full h-40 ml-2 sm:ml-4 rounded-2xl sm:rounded-3xl">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={chartData}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="draws"
                dot={false}
                stroke="#101FA1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ Only MONTH */}
      <div className="flex gap-4 justify-center text-[10px] sm:text-sm mt-2 sm:ml-10">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 justify-center sm:justify-start sm:ml-10 text-[10px] sm:text-base">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 bg-[#101FA1] inline-block"></span>
          Daily Draws
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
