import React, { useEffect, useRef, useState } from "react";
import TracksideEntries from "./TracksideEntries";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracksideHistorical } from "../../redux/tracksideHistoricalSlice";

// 🔹 Result tiles component
const ResultTiles = ({ result }) => {
  return (
    <div className="flex gap-1">
      {result?.map((num, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded overflow-hidden border border-gray-600"
        >
          <img
            src={`/image/${num}.jpeg`}
            alt={num}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

function TrackSideHistoricalFrequency() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.tracksideHistorical
  );

  const resultRef = useRef(null);

  const [betType, setBetType] = useState("");
  const [rows, setRows] = useState([]);

  const getEntryCount = () => {
    switch (betType) {
      case "quinella":
        return 2;
      case "exacta":
        return 2;
      case "trifecta":
        return 3;
      case "first-four":
        return 4;
      default:
        return 0;
    }
  };

  const handleEntriesChange = (updatedRows) => {
    setRows(updatedRows);
  };

  const allSelected =
    rows.length === getEntryCount() &&
    rows.every((r) => Array.isArray(r.number) && r.number.length > 0);

  const entriesArray = rows.map((r) => r.number);

  const handleFetch = () => {
    if (!allSelected) return;

    dispatch(
      fetchTracksideHistorical({
        entries: entriesArray,
      })
    );
  };

  // 🔽 Auto scroll to results when data arrives
  useEffect(() => {
    if (data?.data && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Trackside Historical Frequency
      </h3>

      {/* Bet Type */}
      <div className="flex gap-2 mb-4 items-center">
        <label className="text-white text-sm">Bet Type:</label>
        <select
          value={betType}
          onChange={(e) => setBetType(e.target.value)}
          className="bg-[#3F3F3F] text-white px-3 py-2 rounded"
        >
          <option value="">Select</option>
          <option value="quinella">Quinella</option>
          <option value="exacta">Exacta</option>
          <option value="trifecta">Trifecta</option>
          <option value="first-four">First Four</option>
        </select>
      </div>

      {/* Entries */}
      {betType && (
        <>
          <TracksideEntries
            count={getEntryCount()}
            maxNumber={12}
            onEntriesChange={handleEntriesChange}
          />

          {!allSelected && (
            <p className="text-yellow-400 text-xs">
              Select at least one number per position
            </p>
          )}

          <button
            onClick={handleFetch}
            disabled={!allSelected || loading}
            className="bg-blue-600 text-white text-xs mt-3 px-4 py-2 rounded 
                       hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>

          {loading && (
            <p className="text-blue-400 text-xs mt-2 animate-pulse">
              Fetching historical data...
            </p>
          )}
        </>
      )}
{data?.summary && (
  <div className="mt-6 mb-4 bg-[#101010] border border-gray-800 rounded-lg p-4 text-white">
    <h4 className="font-semibold mb-2">Summary</h4>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
      <div className="bg-[#0E0E0E] p-3 rounded">
        <p className="text-gray-400 text-xs">Total Games</p>
        <p className="text-lg font-semibold">{data.summary.totalGames}</p>
      </div>

      <div className="bg-[#0E0E0E] p-3 rounded">
        <p className="text-gray-400 text-xs">Combined Hits</p>
        <p className="text-lg font-semibold">{data.summary.combinedHits}</p>
      </div>

      <div className="bg-[#0E0E0E] p-3 rounded">
        <p className="text-gray-400 text-xs">Hits (Last 1k)</p>
        <p className="text-lg font-semibold">{data.summary.combinedHitsLast1k}</p>
      </div>

      <div className="bg-[#0E0E0E] p-3 rounded">
        <p className="text-gray-400 text-xs">Avg Games</p>
        <p className="text-lg font-semibold">{data.summary.combinedAvgGames}</p>
      </div>
    </div>

    <p className="text-xs text-gray-400 mt-3">
      {data.summary.formattedSummary}
    </p>
  </div>
)}

      {/* Results - Screenshot Style UI */}
      {data?.data && (
        <div ref={resultRef} className="mt-8 space-y-6">
          <h3 className="text-sm text-gray-400 mb-2">
            LAST 5 HITS BY BET TYPE
          </h3>

        {Object.entries(data.data)
  .filter(([_, stats]) => stats?.last5Hits && stats.last5Hits.length > 0)
  .map(([betTypeKey, stats]) => (
            <div
              key={betTypeKey}
              className="bg-[#0E0E0E] rounded-lg p-4 border border-gray-800"
            >
              <h4 className="text-white font-semibold mb-3">
                {betTypeKey}
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-gray-300 border-collapse">
                  <thead className="bg-[#151515]">
                    <tr>
                      <th className="px-2 py-2 text-left">Race #</th>
                      <th className="px-2 py-2 text-left">Date</th>
                      <th className="px-2 py-2 text-left">Result</th>
                      <th className="px-2 py-2 text-left">Div $1</th>
                      <th className="px-2 py-2 text-left">Drought</th>
                      <th className="px-2 py-2 text-left">Avg Drought</th>
                      <th className="px-2 py-2 text-left">Longest Drought</th>
                      <th className="px-2 py-2 text-left">Hits</th>
    <th className="px-2 py-2 text-left">Avg Games</th>
    <th className="px-2 py-2 text-left">Hits (Last 1k)</th>
    <th className="px-2 py-2 text-left">Current Drought</th>
    <th className="px-2 py-2 text-left">Combos</th>
    <th className="px-2 py-2 text-left">Flexi %</th>
    <th className="px-2 py-2 text-left">Avg Div</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.last5Hits?.map((hit, idx) => (
                    <tr
  key={idx}
  className="border-b border-gray-800 hover:bg-[#111]"
>
  <td className="px-2 py-2">{hit.raceNumber || "-"}</td>
  <td className="px-2 py-2">{hit.date || "-"}</td>
  <td className="px-2 py-2">
    <ResultTiles result={hit.result} />
  </td>
  <td className="px-2 py-2">{hit.dividend || "$0.00"}</td>
  <td className="px-2 py-2">{hit.drought}</td>
  <td className="px-2 py-2">{hit.avgDrought}</td>
  <td className="px-2 py-2">{hit.longestDrought}</td>

  {/*  NEW FIELDS (bet-type level stats repeated per row) */}
  <td className="px-2 py-2">{stats.hits}</td>
  <td className="px-2 py-2">{stats.avgGms}</td>
  <td className="px-2 py-2">{stats.hitsLast1k}</td>
  <td className="px-2 py-2">{stats.currentDrought}</td>
  <td className="px-2 py-2">{stats.combos}</td>
  <td className="px-2 py-2">{stats.flexiPercent}</td>
  <td className="px-2 py-2">{stats.avgDiv}</td>
</tr>

                    ))}

                    {(!stats.last5Hits ||
                      stats.last5Hits.length === 0) && (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-3 text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-3">
          Failed to fetch data: {error}
        </p>
      )}
    </div>
  );
}

export default TrackSideHistoricalFrequency;
