import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrawHistory } from "../../redux/dashboardSlice";

const DrawHistoryTable = () => {
  const dispatch = useDispatch();

  const { drawHistory, drawHistoryLoading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDrawHistory());
  }, [dispatch]);
const parseNumbers = (value) => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(/[-, ]+/)     // "-", "," ya space se split
      .map((n) => Number(n))
      .filter((n) => !Number.isNaN(n));
  }

  return [];
};

  if (drawHistoryLoading) {
    return (
      <div className="h-full flex items-center justify-center text-white">
        Loading Recent Races...
      </div>
    );
  }

  if (!Array.isArray(drawHistory) || drawHistory.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No race history available
      </div>
    );
  }

  const list = drawHistory.slice(0, 10);

  return (
    <div className="w-full h-full p-4 rounded-xl bg-[#191919] text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Recent Races</h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map((item, idx) => (
          <div
            key={`${item.race || item.id}-${idx}`}
            className="rounded-xl border border-gray-700 bg-gradient-to-br from-[#0f0f0f] to-[#151515] p-3 shadow-sm"
          >
            {/* Header */}
            <div className="text-xs text-gray-300 mb-2">
              Draw {item.race || item.id} | {item.time}
            </div>

            {/* Numbers */}
            <div className="flex gap-2 flex-wrap">
             {parseNumbers(item.number || item.numbers).map((num, i) => (
                <span
                  key={i}
                  className="h-7 w-7 flex items-center justify-center rounded-md bg-white text-black text-xs font-bold"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawHistoryTable;
