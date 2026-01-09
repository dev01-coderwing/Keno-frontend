import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchOddEvenDistribution } from "../../redux/dashboardSlice";

const BarChartSection = () => {
  const dispatch = useDispatch();

  const { oddEvenData, oddEvenLoading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchOddEvenDistribution());
  }, [dispatch]);

  if (oddEvenLoading) {
    return <div className="text-white p-4">Loading Odd / Even...</div>;
  }

  const barColors = ["#FF6B6B", "#00FFAB"]; // Odd, Even

  return (
    <div className="h-full w-full max-w-full overflow-x-auto px-2 sm:px-0">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={oddEvenData}>
          <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {oddEvenData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % barColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSection;
