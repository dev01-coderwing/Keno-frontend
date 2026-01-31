// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOverdueCombos,
//   fetchTopFeatured,
//   fetchLeastFeatured,
// } from "../../redux/overdueSlice";

// import StatsCard from "../Cards/StatsCard";
// import DrawCard from "../Cards/DrawCard";
// import Comparison from "../Cards/Comparison";
// import RaceCard from "../Cards/RaceCard";
// import StatsSection from "../StateTable/StatsSection";
// import ChoiceSelector from "../Cards/ChoiceSelector"; 

// /* ================= STATIC OLD DATA (NOT REMOVED) ================= */

// const cards = [
//   {
//     stats: [
//       { label: "Win", value: 6 },
//       { label: "Quinella", value: 4 },
//       { label: "Trifecta", value: 9 },
//     ],
//   },
// ];

// const columns = ["Bet Type", "", "Win %", "Avg.", "Last Appeared", "Entries"];

// const data = [
//   [
//     "Quinella",
//     "",
//     "40%",
//     "112",
//     "16",
//     <div className="flex gap-1 justify-center">
//       <span className="px-2 py-1 bg-orange-500 text-xs font-semibold">11</span>
//       <span className="px-2 py-1 bg-blue-500 text-xs font-semibold">1</span>
//       <span className="px-2 py-1 bg-pink-500 text-xs font-semibold">8</span>
//     </div>,
//   ],
//   [
//     "Trifecta",
//     "",
//     "36.8%",
//     "100",
//     "20",
//     <div className="flex gap-1 justify-center">
//       <span className="px-2 py-1 bg-orange-500 text-xs font-semibold">3</span>
//       <span className="px-2 py-1 bg-blue-500 text-xs font-semibold">10</span>
//       <span className="px-2 py-1 bg-pink-500 text-xs font-semibold">5</span>
//     </div>,
//   ],
//   [
//     "First Four",
//     "",
//     "28%",
//     "814",
//     "35",
//     <div className="flex gap-1 justify-center">
//       <span className="px-2 py-1 bg-orange-500 text-xs font-semibold">6</span>
//       <span className="px-2 py-1 bg-blue-500 text-xs font-semibold">2</span>
//       <span className="px-2 py-1 bg-pink-500 text-xs font-semibold">12</span>
//     </div>,
//   ],
// ];

// const repeatCount = 4;

// /* ================= COMPONENT ================= */

// const AnalyticsSection = () => {
//   const [showChoices, setShowChoices] = useState(false);
//   const dispatch = useDispatch();

//   const {
//     combos,
//     loading,
//     error,
//     topFeatured,
//     featuredLoading,
//     leastFeatured,
//     leastLoading,
//   } = useSelector((state) => state.overdue);

// useEffect(() => {
//   // 🔹 initial load
//   dispatch(fetchOverdueCombos());
//   dispatch(fetchTopFeatured());
//   dispatch(fetchLeastFeatured());

//   const interval = setInterval(() => {
//     dispatch(fetchOverdueCombos());
//     dispatch(fetchTopFeatured());
//     dispatch(fetchLeastFeatured());
//   }, 30000); 

//   const onFocus = () => {
//     dispatch(fetchTopFeatured());
//     dispatch(fetchLeastFeatured());
//   };

//   window.addEventListener("focus", onFocus);


//   return () => {
//     clearInterval(interval);
//     window.removeEventListener("focus", onFocus);
//   };
// }, [dispatch]);


//   /* ================= TOP FEATURED ================= */
//   const getTopFeaturedRows = () => {
//     if (!topFeatured) return data;

//     return Object.keys(topFeatured).map((betType) => {
//       const bestItem = [...topFeatured[betType]]
//         .sort((a, b) => b.winPercentage - a.winPercentage)[0];

//       return [
//         betType,
//         "",
//         `${bestItem.winPercentage}%`,
//         bestItem.avg,
//         bestItem.lastAppeared,
//         <div className="flex gap-1 justify-center">
//           {bestItem.entries.map((num, i) => (
//             <span
//               key={i}
//               className="px-2 py-1 bg-orange-500 text-xs font-semibold"
//             >
//               {num}
//             </span>
//           ))}
//         </div>,
//       ];
//     });
//   };

//   /* ================= LEAST FEATURED ================= */
//   const getLeastFeaturedRows = () => {
//     if (!leastFeatured) return data;

//     return Object.keys(leastFeatured).map((betType) => {
//       const worstItem = [...leastFeatured[betType]]
//         .sort((a, b) => a.winPercentage - b.winPercentage)[0];

//       return [
//         betType,
//         "",
//         `${worstItem.winPercentage}%`,
//         worstItem.avg,
//         worstItem.lastAppeared,
//         <div className="flex gap-1 justify-center">
//           {worstItem.entries.map((num, i) => (
//             <span
//               key={i}
//               className="px-2 py-1 bg-orange-500 text-xs font-semibold"
//             >
//               {num}
//             </span>
//           ))}
//         </div>,
//       ];
//     });
//   };

//   return (
//     <div className="flex flex-col bg-[#262626] my-4 py-4 px-4 sm:px-6 md:px-8 gap-4 rounded-lg font-poppins">

//       {/* ================= TOP CARDS ================= */}
//       <div className="rounded my-4 flex flex-col lg:flex-row gap-8 justify-center">
//         <div className="bg-[#090909] rounded-xl p-4 w-full lg:w-[40%]">
//           <h3 className="text-white font-semibold text-lg mb-2">Quick Stats</h3>
//           <StatsCard />
//         </div>

//         <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[26%]">
//           <h3 className="text-white font-semibold text-lg mb-2">Up coming Draw</h3>
//           <DrawCard />
//           <div className="flex justify-center mt-5 items-center">
//             <button className="hover:underline hover:font-semibold">
//               View All
//             </button>
//           </div>
//         </div>

//         <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[30%]">
//           <h3 className="text-white font-semibold text-lg mb-2">
//             Bet Comparison
//           </h3>
//           <Comparison />
//         </div>
//       </div>

//       {/* ================= FAVORITE NUMBER ================= */}
//       <div className="bg-[#262626] mt-6 rounded-md">
//         <div className="flex justify-between items-center bg-[#1D1D1D] p-4 rounded-t-xl">
//           <h2 className="text-lg font-semibold">Favorite Number</h2>
//           <button
//             onClick={() => setShowChoices(!showChoices)}
//             className="px-3 py-1.5 border rounded-lg text-sm"
//           >
//             {showChoices ? "Hide" : "Show More"}
//           </button>
//         </div>

//         {showChoices && (
//           <div className="absolute right-12 z-50">
//             <ChoiceSelector />
//           </div>
//         )}

//         <div className="p-4 bg-[#1D1D1D] rounded-b-xl">
//           {loading && <p className="text-gray-300">Loading overdue combos...</p>}
//           {error && <p className="text-red-400">{error}</p>}

//           {!loading && combos?.data?.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//               {combos.data.map((item, idx) => (
//                 <div key={idx} className="bg-black p-3 rounded-xl">
//                   <p className="text-white font-semibold">
//                     {item.combination}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     Occurrences: {item.occurrences}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div
//             id="racecard-scroll"
//             className="flex gap-4 overflow-x-auto mt-4"
//           >
//             {[...Array(repeatCount)].map((_, i) => (
//               <div key={i} className="w-72">
//                 <RaceCard stats={cards[0].stats} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#1D1D1D] rounded-xl">
//         <h3 className="text-lg font-semibold px-5 py-4">
//           Top 3 <span className="uppercase border-b">Most</span> Featured Entries
//         </h3>
//         <StatsSection
//           columns={columns}
//           data={featuredLoading ? data : getTopFeaturedRows()}
//         />
//       </div>

//       <div className="bg-[#1D1D1D] rounded-xl">
//         <h3 className="text-lg font-semibold px-5 py-4">
//           Top 3 <span className="uppercase border-b">Least</span> Featured Entries
//         </h3>
//         <StatsSection
//           columns={columns}
//           data={leastLoading ? data : getLeastFeaturedRows()}
//         />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsSection;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverdueCombos,

} from "../../redux/overdueSlice";
import { fetchUserFavorites } from "../../redux/favoriteSlice";
import KenoTop10 from "./KenoTop10";
import StatsCard from "../Cards/StatsCard";
import DrawCard from "../Cards/DrawCard";
import Comparison from "../Cards/Comparison";
import RaceCard from "../Cards/RaceCard";
import StatsSection from "../StateTable/StatsSection";
import ChoiceSelector from "../Cards/ChoiceSelector";

/* ================= STATIC OLD DATA (NOT REMOVED, BUT NOT USED) ================= */

const cards = [
  {
    stats: [
      { label: "Win", value: 6 },
      { label: "Quinella", value: 4 },
      { label: "Trifecta", value: 9 },
    ],
  },
];

const columns = ["Bet Type", "", "Win %", "Avg.", "Last Appeared", "Entries"];

const data = [
  ["Quinella", "", "40%", "112", "16", "—"],
  ["Trifecta", "", "36.8%", "100", "20", "—"],
  ["First Four", "", "28%", "814", "35", "—"],
];

const repeatCount = 4;

/* ================= COMPONENT ================= */

const AnalyticsSection = () => {
  const [showChoices, setShowChoices] = useState(false);


  const dispatch = useDispatch();
  const {
    combos,
    loading,
    error,
  } = useSelector((state) => state.overdue);


  const { favoritesList } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOverdueCombos());


    const interval = setInterval(() => {
      dispatch(fetchOverdueCombos());

    }, 30000);




    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user?.id]);


  const [showAllFavorites, setShowAllFavorites] = useState(false);

  const kenoFavorites =
    favoritesList?.filter((f) => f.gameType === "KENO") || [];

  const visibleFavorites = showAllFavorites
    ? kenoFavorites
    : kenoFavorites.slice(0, 4);

  return (
    <div className="flex flex-col bg-[#262626] my-4 py-4 px-4 sm:px-6 md:px-8 gap-4 rounded-lg font-poppins">

      {/* ================= TOP CARDS ================= */}
      <div className="rounded my-4 flex flex-col lg:flex-row gap-8 justify-center">
        <div className="bg-[#090909] rounded-xl p-4 w-full lg:w-[40%]">
          <h3 className="text-white font-semibold text-lg mb-2">Quick Stats</h3>
          <StatsCard />
        </div>

        <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[26%]">
          <h3 className="text-white font-semibold text-lg mb-2">Up coming Draw</h3>
          <DrawCard />
        </div>

        <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[30%]">
          <h3 className="text-white font-semibold text-lg mb-2">
            Bet Comparison
          </h3>
          <Comparison />
        </div>
      </div>

     
       

        

        <KenoTop10 />
    


    </div>
  );
};

export default AnalyticsSection;
