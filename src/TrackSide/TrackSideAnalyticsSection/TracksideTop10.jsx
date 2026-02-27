// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTracksideTop10 } from "../../redux/tracksideAnalyticsSlice";

// const ALLOWED_BET_TYPES = ["Quinella", "Exacta", "Trifecta", "First Four"];

// function TracksideTop10() {
//   const dispatch = useDispatch();

//   const { tracksideTop10, loading, error } = useSelector(
//     (state) => state.tracksideAnalytics
//   );

//   useEffect(() => {
//     dispatch(fetchTracksideTop10());
//   }, [dispatch]);

//   if (loading || !tracksideTop10) {
//     return <p className="text-gray-400">Loading Top 10...</p>;
//   }

//   if (error) {
//     return <p className="text-red-400">Error: {error}</p>;
//   }

//   return (
//     <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
//       <h3 className="text-lg font-semibold mb-3">
//         Trackside Top Analytics (Top 10)
//       </h3>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700 rounded-lg">
//           <thead className="bg-[#090909]">
//             <tr>
//               <th className="p-3 text-left">Bet Type</th>
//               <th className="p-3 text-left">Win %</th>
//               <th className="p-3 text-left">Avg Drought</th>
//               <th className="p-3 text-left">Current Drought</th>
//               <th className="p-3 text-left">Max Drought</th>
//               <th className="p-3 text-left">Odds</th>
//               <th className="p-3 text-left">Last Appeared</th>
//               <th className="p-3 text-left">Entries</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ALLOWED_BET_TYPES.map((betType) => {
//               const rows = Array.isArray(tracksideTop10?.[betType])
//                 ? tracksideTop10[betType]
//                 : [];

//               if (rows.length === 0) {
//                 return (
//                   <tr key={betType} className="border-t border-gray-700">
//                     <td colSpan="8" className="p-3 text-center text-gray-500">
//                       No data available for {betType}
//                     </td>
//                   </tr>
//                 );
//               }

//               return rows.map((item, idx) => (
//                <tr key={`${betType}-${idx}`} className="border-t border-gray-700">
//   <td className="p-3">{betType}</td>

//   {/* Win % */}
//   <td className="p-3">
//     {item.winPercentage}%
//   </td>

//   {/* Avg Drought */}
//   <td className="p-3">
//     {item.avgDrought}
//   </td>

//   {/* Current Drought */}
//   <td className="p-3">
//     {item.currentDrought}
//   </td>

//   {/* Max Drought (backend key = longestDrought) */}
//   <td className="p-3">
//     {item.longestDrought}
//   </td>

//   {/* Odds (backend me nahi hai) */}
//   <td className="p-3">
//     N/A
//   </td>

//   {/* Last Appeared */}
//   <td className="p-3">
//     {item.lastAppeared}
//   </td>

//   {/* Entries */}
//   <td className="p-3">
//     <div className="flex gap-2 flex-wrap">
//       {Array.isArray(item.entries) &&
//         item.entries.map((n, i) => (
//           <img
//             key={i}
//             src={`/image/${n}.jpeg`}
//             alt={`Entry ${n}`}
//             className="w-8 h-8 rounded"
//             onError={(e) => {
//               e.target.src = "/images/default.png";
//             }}
//           />
//         ))}
//     </div>
//   </td>
// </tr>

//               ));
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TracksideTop10;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracksideTop10 } from "../../redux/tracksideAnalyticsSlice";

const BetTypeTable = ({ title, rows, selectedLocation }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
        <h3 className="text-lg font-semibold mb-3">
          Top 10 {title} Combinations
        </h3>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  const isNSW = selectedLocation === "NSW";
  const isVIC = selectedLocation === "VIC-ACT";

  const getDescription = () => {
    if (title === "Quinella") {
      if (isNSW)
        return "99.82% chance of at least one combination hitting in every 10 games (2025 NSW Trackside Data)";
      if (isVIC)
        return "99.73% chance of at least one combination hitting in every 10 games (2025 VIC/ACT Trackside Data)";
    }

    if (title === "Exacta") {
      if (isNSW)
        return "97% chance of at least one combination hitting in every 10 games (2025 NSW Trackside Data)";
      // future ready:
      if (isVIC) return "96% chance of at least one combination hitting in every 10 games (2025 VIC/ACT Trackside Data)";
    }

    if (title === "Trifecta") {
      if (isNSW)
        return "87% chance of at least one combination hitting in every 25 games (2025 NSW Trackside Data)";
      // future ready:
      if (isVIC) return "83% chance of at least one combination hitting in every 25 games (2025 VIC/ACT Trackside Data)";
    }
    if (title === "First Four") {
      if (isNSW)
        return "76% chance of at least one combination hitting in every 75 games (2025 NSW Trackside Data)";
      // future ready:
      if (isVIC) return "68% chance of at least one combination hitting in every 75 games (2025 NSW Trackside Data)";
    }
    return null;
  };

  return (
    <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
      <h3 className="text-lg font-semibold mb-1">
        Top 10 {title} Combinations
      </h3>

      {getDescription() && (
        <p className="text-xs text-gray-300 mb-3">{getDescription()}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg text-sm">
          <thead className="bg-[#090909]">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Hits</th>
              <th className="p-3 text-left">Hits (24Hr)</th>
              {/* <th className="p-3 text-left">Avg (24Hr)</th> */}
              <th className="p-3 text-left">Win %</th>
              <th className="p-3 text-left">Avg Drought</th>
              <th className="p-3 text-left">Current Drought</th>
              <th className="p-3 text-left">Longest Drought</th>
              {/* <th className="p-3 text-left">Last Appeared</th> */}
              <th className="p-3 text-left">Dividend</th>
              <th className="p-3 text-left">Entries</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700 text-center">
                <td className="p-3">{item.rank || item.Rank || item.RNK}</td>
                <td className="p-3">{item.hits}</td>
                <td className="p-3">{item.hits360}</td>
                {/* <td className="p-3">{item.avg360}</td> */}
                <td className="p-3">{item.winPercentage}%</td>
                <td className="p-3">{item.avgDrought}</td>
                <td className="p-3">{item.currentDrought}</td>
                <td className="p-3">{item.longestDrought}</td>
                {/* <td className="p-3">{item.lastAppeared}</td> */}
                <td className="p-3">{item.dividend}</td>

                <td className="p-3">
                  <div className="flex gap-2 flex-wrap">
                    {Array.isArray(item.Entries) &&
                      item.Entries.map((n, i) => (
                        <img
                          key={i}
                          src={`/image/${n}.jpeg`}
                          alt={`Entry ${n}`}
                          className="w-8 h-8 rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/images/default.png";
                          }}
                        />
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function TracksideTop10() {
  const dispatch = useDispatch();
  const { tracksideTop10, loading, error } = useSelector(
    (state) => state.tracksideAnalytics
  );
  const selectedLocation = useSelector((state) => state.location.state);

  const mapTracksideLocation = (uiValue) => {
    if (uiValue === "VIC+ACT") return "ACT"; // backend expects ACT
    return uiValue; // NSW
  };
  // useEffect(() => {
  //   dispatch(fetchTracksideTop10());
  // }, [dispatch]);

  useEffect(() => {
    const apiLocation = mapTracksideLocation(selectedLocation);
    dispatch(fetchTracksideTop10({ location: apiLocation }));
  }, [dispatch, selectedLocation]);

  if (loading) {
    return <p className="text-gray-400">Loading Top 10...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  if (!tracksideTop10) {
    return <p className="text-gray-500">No Top 10 data</p>;
  }

  return (
    <div className="space-y-6">
      <BetTypeTable
        title="Quinella"
        rows={tracksideTop10?.Quinella}
        selectedLocation={selectedLocation}
      />

      <BetTypeTable
        title="Exacta"
        rows={tracksideTop10?.Exacta}
        selectedLocation={selectedLocation}
      />

      <BetTypeTable
        title="Trifecta"
        rows={tracksideTop10?.Trifecta}
        selectedLocation={selectedLocation}
      />

      <BetTypeTable
        title="First Four"
        rows={tracksideTop10?.["First Four"]}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}

export default TracksideTop10;
