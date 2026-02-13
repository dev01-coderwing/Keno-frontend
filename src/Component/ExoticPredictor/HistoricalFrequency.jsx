// import React, { useState } from "react";
// import Entries from "../Cards/Entries";

// const HistoricalFrequency = () => {
//   const [betType, setBetType] = useState(""); // ✅ default

//   const getEntryCount = () => {
//     switch (betType) {
//       case "quinella":
//         return 2;
//       case "trifecta":
//         return 3;
//       case "first-four":
//         return 4;
//       default:
//         return 1;
//     }
//   };

//   const handleChange = (e) => {
//     setBetType(e.target.value);
//   };

//   return (
//     <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
//       <h3 className="text-lg sm:text-xl font-semibold mb-2">
//         Historical Frequency Analysis
//       </h3>
//       <p className="text-xs text-gray-300 mb-4">
//         Break down the historical performance of your exact bet combination.
//       </p>

//       {/* ✅ Bet Type Select */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
//         <label className="text-sm font-medium text-white">Bet Type:</label>
//         <select
//           className="bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-xs text-white"
//           name="bet-type"
//           id="bet-type"
//           value={betType}
//           onChange={handleChange}
//         >
//           <option value="default">Select</option>
//           <option value="quinella">Quinella</option>
//           <option value="trifecta">Trifecta</option>
//           <option value="first-four">First Four</option>
//         </select>
//       </div>

//       {/* ✅ Dynamic Entries */}
//       <div className="py-2">
//         <h4 className="text-base font-medium text-white mb-2">Select your entries</h4>
//         <Entries count={getEntryCount()} />
//       </div>

//       {/* Results Section */}
//       <div className="mt-6">
//         <h4 className="text-base sm:text-xl font-semibold text-white mb-4">
//           Results:
//         </h4>
//         <div className="bg-[#0E0E0E] p-4 rounded-lg space-y-2 text-white">
//           {[
//             { label: "Your combination", value: "7-12-8-10" },
//             { label: "Last occurrence", value: "295 races ago" },
//             { label: "Avg. frequency", value: "Every 80 races" },
//             { label: "Current drought (Avg.)", value: "32" },
//             { label: "Winning %", value: "40%" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1"
//             >
//               <span
//                 className={`${
//                   item.label === "Your combination"
//                     ? "text-base font-semibold"
//                     : "text-sm"
//                 }`}
//               >
//                 {item.label}:
//               </span>
//               <span
//                 className={`${
//                   item.label === "Your combination"
//                     ? "text-base font-semibold"
//                     : "text-sm font-medium"
//                 }`}
//               >
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoricalFrequency;


import React, { useState } from "react";
import Entries from "../Cards/Entries";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalFrequency } from "../../redux/historicalFrequencySlice";

const HistoricalFrequency = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.historical);
const [lastFetchedEntries, setLastFetchedEntries] = useState([]);

  const [location, setLocation] = useState("NSW");
  const [rows, setRows] = useState([]);
  const [size, setSize] = useState(4);

  // ✅ Receive rows from Entries
  const handleEntriesChange = (updatedRows) => {
    setRows(updatedRows);
    setSize(updatedRows.length);
  };

  // ✅ Check if all rows have selected number
const allSelected =
  rows.length === size && rows.every((r) => r.number !== null && r.number !== 0);


  // ✅ Convert rows → entries array
const getEntriesArray = () => rows.map((r) => r.numbers?.[0]);

  const handleFetch = () => {
    if (!allSelected) return;
 const entriesArr = getEntriesArray();
console.log("Rows:", rows);
console.log("EntriesArr:", entriesArr);

  setLastFetchedEntries(entriesArr);
    dispatch(
      fetchHistoricalFrequency({
        location,
entries: entriesArr,
        size,
      })
    );
  };

  // ✅ API response mapping
  const resultItems = data?.data
    ? [
{
  label: "Your Combination",
  value: lastFetchedEntries.length
    ? lastFetchedEntries.join("-")
    : "—",
},

          { label: "Combination Size", value: data.data.size },
        { label: "Total Draws", value: data.data.totalDraws },
        { label: "Occurrences", value: data.data.occurrences },
        { label: "Average Every", value: `${data.data.avgEvery} draws` },
        {
          label: "Last Occurrence",
          value: `${data.data.lastOccurrenceRacesAgo} draws ago`,
        },
        { label: "Average Interval", value: data.data.averageInterval },
        { label: "Winning %", value: `${data.data.winningPercentage}%` },
        { label: "Last Draw Number", value: data.data.lastDrawNumber },
        {
          label: "Appeared",
          value: data.data.appeared ? "Yes ✅" : "No ❌",
        },
      ]
    : [];

  return (
    <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">
        Keno 
      </h3>
      <p className="text-xs text-gray-300 mb-4">
        Analyze historical performance of your selected Keno numbers.
      </p>

      {/* Location */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <label className="text-sm font-medium text-white">Location:</label>
        <select
          className="bg-[#3F3F3F] text-center w-full sm:w-28 py-2 rounded-lg text-xs text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="NSW">NSW</option>
          <option value="ACT">ACT</option>
          <option value="VIC">VIC</option>
          <option value="SA">SA</option>
        </select>
      </div>

      {/* Entries */}
      <div className="py-2">
        <h4 className="text-base font-medium text-white mb-2">
          Select your entries
        </h4>

        <Entries count={size} onEntriesChange={handleEntriesChange} />

        {!allSelected && rows.length > 0 && (
          <p className="text-yellow-400 text-xs mt-2">
            Please select one number in each position
          </p>
        )}

        <button
          onClick={handleFetch}
          disabled={!allSelected || loading}
          className="bg-blue-600 text-white text-xs mt-3 px-4 py-2 rounded-lg 
                     hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        <h4 className="text-base sm:text-xl font-semibold text-white mb-4">
          Results
        </h4>

        <div className="bg-[#0E0E0E] p-4 rounded-lg space-y-2 text-white border border-gray-700">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading &&
            !error &&
            resultItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1"
              >
                <span
                  className={
                    item.label === "Your Combination"
                      ? "text-base font-semibold"
                      : "text-sm"
                  }
                >
                  {item.label}:
                </span>
                <span
                  className={
                    item.label === "Your Combination"
                      ? "text-base font-semibold"
                      : "text-sm font-medium text-gray-300"
                  }
                >
                  {item.value}
                </span>
              </div>
            ))}

          {!loading && !error && resultItems.length === 0 && (
            <p className="text-gray-400 text-sm text-center">
              No data yet. Select entries and fetch.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalFrequency;
