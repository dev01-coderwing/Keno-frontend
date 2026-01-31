import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateTracksideCombinations,
} from "../../redux/TrackideCombinationSlice";
import RaceCard from "../../Component/Cards/RaceCard";

function TrackSideCombinationGenerator() {
  const dispatch = useDispatch();

  const { trackside, loading, errorMsg } = useSelector(
    (state) => state.trackideCombination
  );

  const [betType, setBetType] = useState("Quinella");
  const [minRaces, setMinRaces] = useState(50);
  const [numCombinations, setNumCombinations] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      generateTracksideCombinations({
        location: "NSW",
        betType,
        minRaces,
        numCombinations,
      })
    );
  };

  return (
    <div className="bg-[#1d1d1d] p-4 sm:p-6 rounded-xl w-full mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Trackside Combination Generator
      </h3>

      <p className="text-xs text-gray-300 mb-4">
        Generate Trackside combinations based on overdue races
      </p>

      <div className="flex justify-center">
        <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-xs sm:text-sm"
          >
            {/* Bet Type */}
            <div className="flex justify-between items-center">
              <label className="text-white">Bet Type:</label>
              <select
                value={betType}
                onChange={(e) => setBetType(e.target.value)}
                className="bg-[#3F3F3F] text-white px-3 py-2 rounded"
              >
                <option value="Quinella">Quinella</option>
                <option value="Trifecta">Trifecta</option>
                <option value="First Four">First Four</option>
              </select>
            </div>

            {/* Min Races */}
            <div className="flex justify-between items-center">
              <label className="text-white">
                Min races since last occurrence:
              </label>
              <input
                type="number"
                value={minRaces}
                onChange={(e) => setMinRaces(Number(e.target.value))}
                className="bg-[#3F3F3F] text-white px-3 py-2 rounded w-24 text-center"
              />
            </div>

            {/* No of combinations */}
            <div className="flex justify-between items-center">
              <label className="text-white">No. of combinations:</label>
              <input
                type="number"
                value={numCombinations}
                onChange={(e) =>
                  setNumCombinations(Number(e.target.value))
                }
                className="bg-[#3F3F3F] text-white px-3 py-2 rounded w-24 text-center"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-white px-12 py-2 text-black rounded font-semibold"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-red-400 text-center mt-3">{errorMsg}</p>
      )}

     
    </div>
  );
}

export default TrackSideCombinationGenerator;
