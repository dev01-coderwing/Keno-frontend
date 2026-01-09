import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchBetComparison } from "../../redux/betComparisonSlice";

const Comparison = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.betComparison
  );

  useEffect(() => {
    dispatch(fetchBetComparison());
  }, [dispatch]);

  return (
    <div className="bg-[#131313] py-4 border-b h-[220px]">
      {/* 🔥 parent height mandatory */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="Standard"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="Exotic"
            stroke="#00FF7F"
            fill="#00FF7F"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>

      {loading && (
        <p className="text-center text-gray-400 text-sm mt-2">
          Loading...
        </p>
      )}
    </div>
  );
};

export default Comparison;
