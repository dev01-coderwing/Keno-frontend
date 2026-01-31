import React, { useState } from "react";
import TracksideEntries from "./TracksideEntries";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracksideHistorical } from "../../redux/tracksideHistoricalSlice";

function TrackSideHistoricalFrequency() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.tracksideHistorical
  );

  const [location, setLocation] = useState("NSW");
  const [betType, setBetType] = useState("");
  const [rows, setRows] = useState([]);

  const getEntryCount = () => {
    switch (betType) {
      case "quinella":
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
    rows.every((r) => r.number !== null);

  const entriesArray = rows.map((r) => r.number);

  const handleFetch = () => {
    if (!allSelected || !betType) return;

    dispatch(
      fetchTracksideHistorical({
        location,
        betType:
          betType === "quinella"
            ? "Quinella"
            : betType === "trifecta"
            ? "Trifecta"
            : "First Four",
        entries: entriesArray,
      })
    );
  };

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
              Select one number per position
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
        </>
      )}

      {/* Results */}
      {data?.data && (
        <div className="mt-6 bg-[#0E0E0E] p-4 rounded text-white">
          <p><b>Combination:</b> {data.data.combination}</p>
          <p><b>Occurrences:</b> {data.data.occurrences}</p>
          <p><b>Average Every:</b> {data.data.avgEvery}</p>
          <p><b>Winning %:</b> {data.data.winningPercentage}%</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default TrackSideHistoricalFrequency;
