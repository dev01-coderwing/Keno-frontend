// 1
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverdueCombos, } from "../../redux/overdueSlice";

import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";
import TracksideStatsCard from "./TracksideStatsCard";
import DrawCard from "../../Component/Cards/DrawCard";
import Comparison from "../../Component/Cards/Comparison";
import RaceCard from "../../Component/Cards/RaceCard";
import TrackSideChoiceSelector from "./TrackSideChoiceSelector";
import TracksideTop10 from "./TracksideTop10";
import SubscriptionGuard from "../../Component/SubscriptionGuard";


const columns = ["Bet Type", "", "Win %", "Avg.", "Last Appeared", "Entries"];

function TrackSideAnalyticsSection() {
  const [showChoices, setShowChoices] = useState(false);


  const dispatch = useDispatch();
  const {
    combos,
    loading,
    error,
  } = useSelector((state) => state.overdue);


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





 




  //  const getTopFeaturedRows = () => {
  //   if (!tracksideTopFeatured || Object.keys(tracksideTopFeatured).length === 0)
  //     return [];

  //   return Object.keys(tracksideTopFeatured).map((betType) => {
  //     const best = [...tracksideTopFeatured[betType]].sort(
  //       (a, b) => b.winPercentage - a.winPercentage
  //     )[0];

  //     return [
  //       betType,
  //       "",
  //       `${best.winPercentage}%`,
  //       best.avg,
  //       best.lastAppeared,
  //       <div className="flex gap-1 justify-center">
  //         {best.entries.map((n, i) => (
  //           <span
  //             key={i}
  //             className="px-2 py-1 bg-orange-500 text-xs font-semibold"
  //           >
  //             {n}
  //           </span>
  //         ))}
  //       </div>,
  //     ];
  //   });
  // };

  // const getLeastFeaturedRows = () => {
  //   if (
  //     !tracksideLeastFeatured ||
  //     Object.keys(tracksideLeastFeatured).length === 0
  //   )
  //     return [];

  //   return Object.keys(tracksideLeastFeatured).map((betType) => {
  //     const worst = [...tracksideLeastFeatured[betType]].sort(
  //       (a, b) => a.winPercentage - b.winPercentage
  //     )[0];

  //     return [
  //       betType,
  //       "",
  //       `${worst.winPercentage}%`,
  //       worst.avg,
  //       worst.lastAppeared,
  //       <div className="flex gap-1 justify-center">
  //         {worst.entries.map((n, i) => (
  //           <span
  //             key={i}
  //             className="px-2 py-1 bg-orange-500 text-xs font-semibold"
  //           >
  //             {n}
  //           </span>
  //         ))}
  //       </div>,
  //     ];
  //   });
  // };


  return (
    <>
      <TrackSideLayout>
      <SubscriptionGuard>
        <div className="flex flex-col bg-[#262626] my-4 py-4 px-4 sm:px-6 md:px-8 gap-4 rounded-lg font-poppins">

          {/* TOP CARDS SECTION */}
          <div className="rounded my-4 flex flex-col lg:flex-row gap-8 justify-center">
            {/* <div className="bg-[#090909] rounded-xl p-4 w-full lg:w-[40%]">
              <h3 className="text-white font-semibold text-lg mb-2">Quick Stats</h3>
              <TracksideStatsCard />
            </div> */}
{/* 
            <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[26%]">
              <h3 className="text-white font-semibold text-lg mb-2">Up coming Draw</h3>
              <DrawCard />
              <div className="flex justify-center mt-5 items-center">
                <button className="hover:underline hover:font-semibold">View All</button>
              </div>
            </div> */}

            {/* <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[30%]">
              <h3 className="text-white font-semibold text-lg mb-2">Bet Comparison</h3>
              <Comparison />
              <div className="flex justify-center gap-8">
                <div className="flex flex-col">
                  <span>Standard Bet</span>
                  <span className="text-[#8884d8]">$3,004</span>
                </div>
                <div className="flex flex-col">
                  <span>Exotic Bet</span>
                  <span className="text-[#00FF7F]">$34,504</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* FAVORITE NUMBER SECTION */}
         {/* FAVORITE NUMBER SECTION */}
<div className="bg-[#262626] mt-6 rounded-md relative">
  {/* <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-[#1D1D1D] p-4 rounded-t-xl gap-2">
    <h2 className="text-lg sm:text-xl font-semibold">
      Favorite Number
    </h2>

    <button
      onClick={() => setShowChoices(!showChoices)}
      className="px-3 py-1.5 border border-[#D3D3D3] rounded-lg text-sm hover:bg-[#333] transition"
    >
      {showChoices ? "Hide" : "Show More"}
    </button>
  </div> */}

  {/* {showChoices && (
    <div className="absolute right-4 top-[72px] w-full max-w-md z-[9999]">
      <TrackSideChoiceSelector />
    </div>
  )} */}



            {/* --------------------------- */}
            {/* 🔥 OVERDUE API DATA RENDER */}
            {/* --------------------------- */}
            <div className="p-4 bg-[#1D1D1D] rounded-b-xl">
              {/* {loading && (
                <p className="text-gray-300 text-sm">Loading overdue combos...</p>
              )} */}

              {/* {error && <p className="text-red-400 text-sm">Error: {error}</p>} */}

              {/* {!loading && combos?.data?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                  {combos.data.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-700"
                    >
                      <p className="text-white text-lg font-semibold">
                        {item.combination}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Occurrences: {item.occurrences}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Last Seen: {item.lastSeenRacesAgo} races ago
                      </p>
                    </div>
                  ))}
                </div>
              )} */}

              {/* RACE CARDS SCROLLER */}
              <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
                <button
                  onClick={() => {
                    document
                      .getElementById("racecard-scroll")
                      .scrollBy({ left: -300, behavior: "smooth" });
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
                >
                  &#10094;
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("racecard-scroll")
                      .scrollBy({ left: 300, behavior: "smooth" });
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
                >
                  &#10095;
                </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
  {combos?.data?.map((item, idx) => (
    <RaceCard
      key={idx}
      combination={item.combination}
      summary={`${item.occurrences}% since last 20 races`}
      stats={[
        {
          label: "Avg. every",
          value: `${item.avgEvery} races`,
        },
        {
          label: "Last seen",
          value: `${item.lastSeenRacesAgo} races`,
        },
      ]}
      userId={user?.id}
      gameType="KENO"
      numbers={item.combination.split("-").map(Number)}
    />
  ))}
</div>

          

                <TracksideTop10 />

              </div>
            </div>
          </div>
          <div></div>


        </div>
        </SubscriptionGuard>
      </TrackSideLayout>
    </>
  )
}

export default TrackSideAnalyticsSection






// 2


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOverdueCombos,
//   fetchTopFeatured,
//   fetchLeastFeatured,
// } from "../../redux/overdueSlice";
// import { fetchUserFavorites } from "../../redux/favoriteSlice";

// import StatsCard from "../../Component/Cards/StatsCard";
// import DrawCard from "../../Component/Cards/DrawCard";
// import Comparison from "../../Component/Cards/Comparison";
// import RaceCard from "../../Component/Cards/RaceCard";
// import StatsSection from "../../Component/StateTable/StatsSection";
// import ChoiceSelector from "../../Component/Cards/ChoiceSelector";
// import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";
// /* ================= STATIC OLD DATA (NOT REMOVED, BUT NOT USED) ================= */

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
//   ["Quinella", "", "40%", "112", "16", "—"],
//   ["Trifecta", "", "36.8%", "100", "20", "—"],
//   ["First Four", "", "28%", "814", "35", "—"],
// ];

// const repeatCount = 4;

// /* ================= COMPONENT ================= */

// const TrackSideAnalyticsSection = () => {
//   const [showChoices, setShowChoices] = useState(false);
//   const dispatch = useDispatch();
//   const [showAllFavorites, setShowAllFavorites] = useState(false);

//   const {
//     combos,
//     loading,
//     error,
//     topFeatured,
//     featuredLoading,
//     leastFeatured,
//     leastLoading,
//   } = useSelector((state) => state.overdue);
//   const { favoritesList } = useSelector((state) => state.favorite);
//   const { user } = useSelector((state) => state.auth);

//   if (user?.id) {
//     dispatch(fetchUserFavorites(user.id));
//   }
//   const kenoFavorites = favoritesList?.filter(
//     (f) => f.gameType === "KENO"
//   ) || [];

//   const visibleFavorites = showAllFavorites
//     ? kenoFavorites
//     : kenoFavorites.slice(0, 4);


//   /* ================= AUTO REFRESH ================= */
//   useEffect(() => {
//     dispatch(fetchOverdueCombos());
//     dispatch(fetchTopFeatured());
//     dispatch(fetchLeastFeatured());

//     const interval = setInterval(() => {
//       dispatch(fetchOverdueCombos());
//       dispatch(fetchTopFeatured());
//       dispatch(fetchLeastFeatured());
//     }, 30000);

//     const onFocus = () => {
//       dispatch(fetchTopFeatured());
//       dispatch(fetchLeastFeatured());
//     };

//     window.addEventListener("focus", onFocus);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("focus", onFocus);
//     };
//   }, [dispatch]);

//   /* ================= TOP FEATURED (API ONLY) ================= */
//   const getTopFeaturedRows = () => {
//     if (!topFeatured) return [];

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

//   /* ================= LEAST FEATURED (API ONLY) ================= */
//   const getLeastFeaturedRows = () => {
//     if (!leastFeatured) return [];

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
//       <TrackSideLayout >
//         {/* ================= TOP CARDS ================= */}
//         <div className="rounded my-4 flex flex-col lg:flex-row gap-8 justify-center">
//           <div className="bg-[#090909] rounded-xl p-4 w-full lg:w-[40%]">
//             <h3 className="text-white font-semibold text-lg mb-2">Quick Stats</h3>
//             <StatsCard />
//           </div>

//           <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[26%]">
//             <h3 className="text-white font-semibold text-lg mb-2">Up coming Draw</h3>
//             <DrawCard />
//           </div>

//           <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[30%]">
//             <h3 className="text-white font-semibold text-lg mb-2">
//               Bet Comparison
//             </h3>
//             <Comparison />
//           </div>
//         </div>

//         {/* ================= FAVORITE NUMBER ================= */}
//         <div className="bg-[#262626] mt-6 rounded-md">
//           <div className="flex justify-between items-center bg-[#1D1D1D] p-4 rounded-t-xl">
//             <h2 className="text-lg font-semibold">Favorite Number</h2>
//             <button
//               onClick={() => setShowChoices(!showChoices)}
//               className="px-3 py-1.5 border rounded-lg text-sm"
//             >
//               {showChoices ? "Hide" : "Show More"}
//             </button>
//           </div>

//           {showChoices && (
//             <div className="absolute right-12 z-50">
//               <ChoiceSelector />
//             </div>
//           )}

//           <div className="p-4 bg-[#1D1D1D] rounded-b-xl">
//             {loading && <p className="text-gray-300">Loading overdue combos...</p>}
//             {error && <p className="text-red-400">{error}</p>}

//             {!loading && combos?.data?.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {combos.data.map((item, idx) => (
//                   <div key={idx} className="bg-black p-3 rounded-xl">
//                     <p className="text-white font-semibold">
//                       {item.combination}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Occurrences: {item.occurrences}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               {visibleFavorites.map((fav) => {
//                 const combo = fav.numbers.join("-");
//                 const statsData = combos?.find((c) => c.combo === combo);

//                 return (
//                   <RaceCard
//                     key={fav._id}
//                     combination={combo}
//                     summary={
//                       statsData
//                         ? `${statsData.frequency}% since last 20 races`
//                         : "—"
//                     }
//                     stats={[
//                       {
//                         label: "Avg. every",
//                         value: statsData ? `${statsData.avgEvery} races` : "—",
//                       },
//                       {
//                         label: "Last seen",
//                         value: statsData ? `${statsData.lastSeen} races` : "—",
//                       },
//                     ]}
//                     userId={user.id}
//                     gameType="KENO"
//                     resultId={fav.resultId}
//                     numbers={fav.numbers}
//                   />
//                 );
//               })}
//             </div>
//             {kenoFavorites.length > 4 && (
//               <div className="text-center mt-4">
//                 <button
//                   onClick={() => setShowAllFavorites(!showAllFavorites)}
//                   className="px-4 py-2 bg-white text-black rounded-lg text-sm"
//                 >
//                   {showAllFavorites ? "Show Less" : "Show More"}
//                 </button>
//               </div>
//             )}



//           </div>
//         </div>

//         {/* ================= TOP FEATURED ================= */}
//         <div className="bg-[#1D1D1D] rounded-xl">
//           <h3 className="text-lg font-semibold px-5 py-4">
//             Top 3 <span className="uppercase border-b">Most</span> Featured Entries
//           </h3>

//           {featuredLoading && (
//             <p className="px-5 pb-3 text-gray-400">Loading...</p>
//           )}

//           <StatsSection columns={columns} data={getTopFeaturedRows()} />
//         </div>

//         {/* ================= LEAST FEATURED ================= */}
//         <div className="bg-[#1D1D1D] rounded-xl">
//           <h3 className="text-lg font-semibold px-5 py-4">
//             Top 3 <span className="uppercase border-b">Least</span> Featured Entries
//           </h3>

//           {leastLoading && (
//             <p className="px-5 pb-3 text-gray-400">Loading...</p>
//           )}

//           <StatsSection columns={columns} data={getLeastFeaturedRows()} />
//         </div>
//       </TrackSideLayout>
//     </div>
//   );
// };

// export default TrackSideAnalyticsSection;




// // 1
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOverdueCombos } from "../../redux/overdueSlice";
// import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";

// import StatsCard from "../../Component/Cards/StatsCard";
// import DrawCard from "../../Component/Cards/DrawCard";
// import Comparison from "../../Component/Cards/Comparison";
// import RaceCard from "../../Component/Cards/RaceCard";
// import StatsSection from "../../Component/StateTable/StatsSection";
// import ChoiceSelector from "../../Component/Cards/ChoiceSelector";

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
//     "Trifectra",
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
// function TrackSideAnalyticsSection() {
//       const [showChoices, setShowChoices] = useState(false);

//   // ---------------------------
//   // 🔥 REDUX: OVERDUE API DATA
//   // ---------------------------
//   const dispatch = useDispatch();
//   const { combos, loading, error } = useSelector((state) => state.overdue);

//   useEffect(() => {
//     dispatch(fetchOverdueCombos());
//   }, [dispatch]);
//   return (
//     <>
//     <TrackSideLayout>
//         <div className="flex flex-col bg-[#262626] my-4 py-4 px-4 sm:px-6 md:px-8 gap-4 rounded-lg font-poppins">

//       {/* TOP CARDS SECTION */}
//       <div className="rounded my-4 flex flex-col lg:flex-row gap-8 justify-center">
//         <div className="bg-[#090909] rounded-xl p-4 w-full lg:w-[40%]">
//           <h3 className="text-white font-semibold text-lg mb-2">Quick Stats</h3>
//           <StatsCard />
//         </div>

//         <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[26%]">
//           <h3 className="text-white font-semibold text-lg mb-2">Up coming Draw</h3>
//           <DrawCard />
//           <div className="flex justify-center mt-5 items-center">
//             <button className="hover:underline hover:font-semibold">View All</button>
//           </div>
//         </div>

//         <div className="bg-[#131313] rounded-xl p-4 w-full lg:w-[30%]">
//           <h3 className="text-white font-semibold text-lg mb-2">Bet Comparison</h3>
//           <Comparison />
//           <div className="flex justify-center gap-8">
//             <div className="flex flex-col">
//               <span>Standard Bet</span>
//               <span className="text-[#8884d8]">$3,004</span>
//             </div>
//             <div className="flex flex-col">
//               <span>Exotic Bet</span>
//               <span className="text-[#00FF7F]">$34,504</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAVORITE NUMBER SECTION */}
//       <div className="bg-[#262626] mt-6 rounded-md">
//         <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-[#1D1D1D] p-4 rounded-t-xl gap-2">
//           <h2 className="text-lg sm:text-xl font-semibold">Favorite Number</h2>
//           <button
//             onClick={() => setShowChoices(!showChoices)}
//             className="px-3 py-1.5 border border-[#D3D3D3] rounded-lg text-sm hover:bg-[#333] transition"
//           >
//             {showChoices ? "Hides" : "Show More"}
//           </button>
//         </div>

//         {/* CHOICES DROPDOWN */}
//         {showChoices && (
//           <div className="absolute right-12 w-full max-w-xs z-50 rounded-l-xl shadow-lg">
//             <div className="flex justify-between items-center mb-4"></div>
//             <ChoiceSelector />
//           </div>
//         )}

//         {/* --------------------------- */}
//         {/* 🔥 OVERDUE API DATA RENDER */}
//         {/* --------------------------- */}
//         <div className="p-4 bg-[#1D1D1D] rounded-b-xl">
//           {loading && (
//             <p className="text-gray-300 text-sm">Loading overdue combos...</p>
//           )}

//           {error && <p className="text-red-400 text-sm">Error: {error}</p>}

//           {!loading && combos?.data?.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
//               {combos.data.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-700"
//                 >
//                   <p className="text-white text-lg font-semibold">
//                     {item.combination}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     Occurrences: {item.occurrences}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     Last Seen: {item.lastSeenRacesAgo} races ago
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* RACE CARDS SCROLLER */}
//           <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
//             <button
//               onClick={() => {
//                 document
//                   .getElementById("racecard-scroll")
//                   .scrollBy({ left: -300, behavior: "smooth" });
//               }}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
//             >
//               &#10094;
//             </button>

//             <button
//               onClick={() => {
//                 document
//                   .getElementById("racecard-scroll")
//                   .scrollBy({ left: 300, behavior: "smooth" });
//               }}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
//             >
//               &#10095;
//             </button>

//             <div
//               id="racecard-scroll"
//               className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
//             >
//               {[...Array(repeatCount)].map((_, index) => (
//                 <div key={index} className="flex-shrink-0 w-72 sm:w-full">
//                   <RaceCard stats={cards[0].stats} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM TABLES */}
//       <div className="bg-[#1D1D1D] rounded-xl">
//         <h3 className="text-lg font-semibold px-5 py-4">
//           Top 3 <span className="uppercase border-b">Most</span> Featured Entries
//         </h3>
//         <StatsSection columns={columns} data={data} />
//       </div>

//       <div className="bg-[#1D1D1D] rounded-xl">
//         <h3 className="text-lg font-semibold px-5 py-4">
//           Top 3 <span className="uppercase border-b">least</span> Featured Entries
//         </h3>
//         <StatsSection columns={columns} data={data} />
//       </div>
//     </div>
//     </TrackSideLayout>
//     </>
//   )
// }

// export default TrackSideAnalyticsSection
