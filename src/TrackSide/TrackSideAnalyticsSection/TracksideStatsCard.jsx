import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracksideGraph } from "../../redux/tracksideGraphSlice";

function TracksideStatsCard() {
  const dispatch = useDispatch();

  const { graphData, loading, error } = useSelector(
    (state) => state.tracksideGraph
  );

  useEffect(() => {
    dispatch(fetchTracksideGraph());
  }, [dispatch]);

  // -------- MONTH WISE DATA CONVERSION --------
  const rawData = graphData?.raceTrendChart?.data || [];

  const monthMap = {};

  rawData.forEach((item) => {
    const month = item.date.slice(0, 7); // "2026-01"
    if (!monthMap[month]) {
      monthMap[month] = 0;
    }
    monthMap[month] += item.races;
  });

  const monthNames = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  const chartData = Object.keys(monthMap).map((key) => {
    const monthNum = key.split("-")[1];

    return {
      name: monthNames[monthNum] || monthNum,
      Races: monthMap[key],
    };
  });
  // -------------------------------------------

  if (loading) {
    return <p className="text-white text-center mt-10">Loading graph...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        API Error: {error}
      </p>
    );
  }

  return (
    <>
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-end sm:items-start">
          <div className="flex flex-col gap-6 sm:gap-3 text-right text-[10px] sm:text-sm leading-none sm:leading-normal">
            <span>2000</span>
            <span>1500</span>
            <span>1000</span>
            <span>500</span>
            <span>0</span>
          </div>

          <div className="border w-full h-40 ml-2 sm:ml-4 rounded-2xl sm:rounded-3xl">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Races"
                  dot={false}
                  stroke="#3CD856"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONTH LABELS */}
        <div className="flex flex-wrap gap-2 sm:gap-1 justify-center text-[10px] sm:text-sm mt-2 sm:ml-10">
          {chartData.map((item, idx) => (
            <span key={idx}>{item.name}</span>
          ))}
        </div>

        {/* LEGEND */}
        <div className="flex flex-wrap gap-6 sm:gap-20 mt-4 justify-center sm:justify-start sm:ml-10 text-[10px] sm:text-base">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#3CD856]"></span>
            Total Races per Month
          </div>
        </div>
      </div>
    </>
  );
}

export default TracksideStatsCard;
