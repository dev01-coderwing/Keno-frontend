import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveTrackside } from "../../redux/adminanalyticsSlice";

const LiveRaceCard = () => {
  const dispatch = useDispatch();

  const { liveTrackside, loading, error } = useSelector(
    (state) => state.adminAnalytics
  );

  useEffect(() => {
    dispatch(fetchLiveTrackside());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-[#191919] text-white">
        Loading LIVE Trackside...
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

  if (!liveTrackside || !liveTrackside.latestRace) {
    return (
      <div className="p-4 rounded-xl bg-[#191919] text-gray-400">
        No live data
      </div>
    );
  }

  const { latestRace, recentRaces, location } = liveTrackside;

  return (
    <div className="p-4 rounded-xl w-full max-w-full bg-[#191919] overflow-auto text-white">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center mb-2 pb-2 border-b border-gray-600">
        <h3 className="text-lg font-semibold">
          Trackside LIVE (Draw {latestRace.id})
        </h3>
        <span className="text-xs font-semibold px-2 py-1 text-black rounded bg-green-400">
          LIVE
        </span>
      </div>

      {/* Latest Race */}
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="pb-4 md:pb-0 md:pr-6 md:border-r border-gray-600">
          <div className="text-sm text-gray-400 font-semibold">Date</div>
          <div className="font-medium text-lg">{latestRace.date}</div>
          <div className="text-xs text-gray-400 mt-1">
            Location: {location}
          </div>
        </div>

        <div className="pt-4 md:pt-0 w-full">
          <div className="text-sm text-gray-400 mb-2 font-semibold">
            Latest Numbers
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {latestRace.numbers.map((num, index) => (
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

      {/* Recent Races */}
      {Array.isArray(recentRaces) && recentRaces.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">
            Recent Races
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentRaces.map((race) => (
              <div
                key={race.id}
                className="bg-[#101010] rounded-lg p-3 border border-gray-700"
              >
                <div className="text-xs text-gray-400 mb-1">
                  Draw #{race.id} | {race.time}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {race.numbers.map((num, i) => (
                    <span
                      key={i}
                      className="bg-white text-black text-xs px-2 py-1 rounded"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveRaceCard;
