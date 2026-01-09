import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveKenoResult } from "../../redux/analyticsSlice";

const LiveRaceCard = () => {
  const dispatch = useDispatch();

  const { liveKeno, loading, error } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchLiveKenoResult());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-[#191919] text-white">
        Loading LIVE Race...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-[#191919] text-red-500">
        {error}
      </div>
    );
  }

  if (!liveKeno) return null;

  return (
    <div className="p-4 rounded-xl w-full max-w-full bg-[#191919] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center mb-2 pb-2 border-b border-gray-600">
        <h3 className="text-lg font-semibold text-white">
          {liveKeno.label} (Draw {liveKeno.draw})
        </h3>

        <span className="text-xs font-semibold px-2 py-1 text-black rounded bg-green-400">
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Date / Location */}
        <div className="pb-4 md:pb-0 md:pr-6 md:border-r border-gray-600">
          <div className="text-sm text-gray-400 font-semibold">
            Date
          </div>
          <div className="text-white font-medium text-lg">
            {liveKeno.date}
          </div>

          <div className="text-xs text-gray-400 mt-1">
            Location: {liveKeno.location}
          </div>
        </div>

        {/* Numbers */}
        <div className="pt-4 md:pt-0 w-full">
          <div className="text-sm text-gray-400 mb-2 font-semibold">
            Numbers
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {liveKeno.numbers.map((num, index) => (
              <span
                key={index}
                className="bg-white text-black text-xs sm:text-sm font-semibold px-2 py-1 rounded-md text-center"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRaceCard;
