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

const BetTypeTable = ({ title, rows }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
        <h3 className="text-lg font-semibold mb-3">{title} (TOP 10)</h3>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
      <h3 className="text-lg font-semibold mb-3">
        {title} (TOP 10 Combos – Last 360 Games)
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg text-sm">
          <thead className="bg-[#090909]">
            <tr>
              <th className="p-3 text-left">Rank</th>
              {/* <th className="p-3 text-left">Combination</th> */}
              <th className="p-3 text-left">Hits</th>
              <th className="p-3 text-left">Hits (24Hr)</th>
              <th className="p-3 text-left">Avg (24Hr)</th>
              <th className="p-3 text-left">Win %</th>
              <th className="p-3 text-left">Avg Drought</th>
              <th className="p-3 text-left">Current Drought</th>
              <th className="p-3 text-left">Longest Drought</th>
              <th className="p-3 text-left">Last Appeared</th>
              {/* <th className="p-3 text-left">Last Date</th> */}
              <th className="p-3 text-left">Dividend</th>
              <th className="p-3 text-left">Entries</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="p-3">{item.rank || item.Rank || item.RNK}</td>
                {/* <td className="p-3 font-semibold">{item.combination}</td> */}
                <td className="p-3">{item.hits}</td>
                <td className="p-3">{item.hits360}</td>
                <td className="p-3">{item.avg360}</td>
                <td className="p-3">{item.winPercentage}%</td>
                <td className="p-3">{item.avgDrought}</td>
                <td className="p-3">{item.currentDrought}</td>
                <td className="p-3">{item.longestDrought}</td>
                <td className="p-3">{item.lastAppeared}</td>
                {/* <td className="p-3">{item.lastAppearedDate}</td> */}
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

  useEffect(() => {
    dispatch(fetchTracksideTop10());
  }, [dispatch]);

  if (loading || !tracksideTop10) {
    return <p className="text-gray-400">Loading Top 10...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <BetTypeTable title="Quinella" rows={tracksideTop10?.Quinella} />
      <BetTypeTable title="Exacta" rows={tracksideTop10?.Exacta} />
      <BetTypeTable title="Trifecta" rows={tracksideTop10?.Trifecta} />
      <BetTypeTable title="First Four" rows={tracksideTop10?.["First Four"]} />
    </div>
  );
}

export default TracksideTop10;
