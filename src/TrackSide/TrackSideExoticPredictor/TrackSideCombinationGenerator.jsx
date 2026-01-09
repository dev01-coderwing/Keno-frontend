import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCombinations } from "../../redux/combinationSlice";
import RaceCard from "../../Component/Cards/RaceCard";


function TrackSideCombinationGenerator() {

    const [betType, setBetType] = useState("Quinella");
      const [minRaces, setMinRaces] = useState(50);
      const [numCombinations, setNumCombinations] = useState(2);
      const [combinations, setCombinations] = useState([]); // store API response
      const [loading, setLoading] = useState(false);
      const [errorMsg, setErrorMsg] = useState("");
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to generate combinations.");
          return;
        }
        setLoading(true);
        setErrorMsg("");
    
        try {
          const res = await api.post(
            "/combinations/generate",
            {
              betType,
              minRaces,
              numCombinations,
            },
            {
              headers: { Authorization: `Bearer ${token}` }, 
            }
          );
          console.log("API response:", res.data);
          
          setCombinations(res.data.combinations || []);
        } catch (err) {
          console.error(err);
          setErrorMsg(err?.response?.data?.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
    
  return (
    <>
        <div className="bg-[#1d1d1d] p-4 sm:p-6 rounded-xl w-full mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Combination Generator
      </h3>
      <p className="text-xs sm:text-sm font-extralight text-gray-300 mb-4">
        Get random exotic bet combinations filtered by recent frequency
      </p>

      <div className="flex justify-center">
        <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full text-xs sm:text-sm"
          >
            {/* Bet Type */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <label className="text-white">Bet Type:</label>
              <select
                className="bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-white"
                value={betType}
                onChange={(e) => setBetType(e.target.value)}
              >
                <option value="Quinella">Quinella</option>
                <option value="Trifecta">Trifecta</option>
                <option value="First Four">First Four</option>
              </select>
            </div>

            {/* Min Races */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <label className="text-white">
                Min. races since last occurrence:
              </label>
              <input
                className="no-spinner bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-white"
                type="number"
                value={minRaces}
                onChange={(e) => setMinRaces(Number(e.target.value))}
              />
            </div>

            {/* Number of Combinations */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <label className="text-white">No. of combinations:</label>
              <input
                className="no-spinner bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-white"
                type="number"
                value={numCombinations}
                onChange={(e) => setNumCombinations(Number(e.target.value))}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-white px-10 sm:px-20 py-2 text-black rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error */}
      {errorMsg && <p className="text-red-400 text-center mt-2">{errorMsg}</p>}

      {/* Display Response */}
      <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
        {combinations.length > 0 ? (
          <div
            id="racecard-scroll"
            className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
          >
            {combinations.map((combo, index) => {
              console.log("Combo inside map:", combo);
              return (
                <div key={index} className="flex-shrink-0 w-72 sm:w-full">
                  <RaceCard
                    combination={combo.numbers.join("-")}
                    summary={`Bet Type: ${combo.betType} | ${combo.percentage}% (last ${combo.racesSince} races)`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center">
            No combinations yet
          </p>
        )}
      </div>
    </div>
    
    
    </>
  )
}

export default TrackSideCombinationGenerator