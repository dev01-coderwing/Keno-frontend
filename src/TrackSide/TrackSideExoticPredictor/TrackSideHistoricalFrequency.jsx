import React, { useState } from "react";
import Entries from "../../Component/Cards/Entries";
function TrackSideHistoricalFrequency() {
     const [betType, setBetType] = useState(""); 
    
      const getEntryCount = () => {
        switch (betType) {
          case "quinella":
            return 2;
          case "trifecta":
            return 3;
          case "first-four":
            return 4;
          default:
            return 1;
        }
      };
    
      const handleChange = (e) => {
        setBetType(e.target.value);
      };
  return (
    <>
     <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Historical Frequency Analysis
          </h3>
          <p className="text-xs text-gray-300 mb-4">
            Break down the historical performance of your exact bet combination.
          </p>
    
          {/* ✅ Bet Type Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
            <label className="text-sm font-medium text-white">Bet Type:</label>
            <select
              className="bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-xs text-white"
              name="bet-type"
              id="bet-type"
              value={betType}
              onChange={handleChange}
            >
              <option value="default">Select</option>
              <option value="quinella">Quinella</option>
              <option value="trifecta">Trifecta</option>
              <option value="first-four">First Four</option>
            </select>
          </div>
    
          {/* ✅ Dynamic Entries */}
          <div className="py-2">
            <h4 className="text-base font-medium text-white mb-2">Select your entries</h4>
            <Entries count={getEntryCount()} />
          </div>
    
          {/* Results Section */}
          <div className="mt-6">
            <h4 className="text-base sm:text-xl font-semibold text-white mb-4">
              Results:
            </h4>
            <div className="bg-[#0E0E0E] p-4 rounded-lg space-y-2 text-white">
              {[
                { label: "Your combination", value: "7-12-8-10" },
                { label: "Last occurrence", value: "295 races ago" },
                { label: "Avg. frequency", value: "Every 80 races" },
                { label: "Current drought (Avg.)", value: "32" },
                { label: "Winning %", value: "40%" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1"
                >
                  <span
                    className={`${
                      item.label === "Your combination"
                        ? "text-base font-semibold"
                        : "text-sm"
                    }`}
                  >
                    {item.label}:
                  </span>
                  <span
                    className={`${
                      item.label === "Your combination"
                        ? "text-base font-semibold"
                        : "text-sm font-medium"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
    
    </>
  )
}

export default TrackSideHistoricalFrequency