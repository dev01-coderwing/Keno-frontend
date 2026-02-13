import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverdueCombos } from "../../redux/overdueSlice";
import TrackSideRaceCard from "./TrackSideRaceCard";

const TrackSideWinningCombos = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { combos, loading, error } = useSelector(
    (state) => state.overdue
  );
  const { user } = useSelector((state) => state.auth);

  const [showAll, setShowAll] = useState(false);

  const visibleCombos = showAll ? combos : combos.slice(0, 4);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchOverdueCombos());
  }, [dispatch]);

  return (
    <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
        Overdue Winning Combos
      </h3>
      <p className="text-xs sm:text-sm font-extralight text-gray-300 mb-4">
        These popular combos usually hit often, but they haven’t in a while.
      </p>

      {loading && (
        <p className="text-gray-400 text-sm">Loading combos...</p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
        {/* Mobile Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
        >
          &#10094;
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
        >
          &#10095;
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
        >
          {visibleCombos.length > 0 &&
            visibleCombos.map((combo) => {
              // ✅ SAFE NORMALIZATION
              const comboString = combo.combo; // "6-12"
              const comboNumbers =
                typeof comboString === "string"
                  ? comboString.split("-").map(Number)
                  : [];

              return (
                <div
                  key={comboString}
                  className="flex-shrink-0 w-72 sm:w-full"
                >
                  <TrackSideRaceCard
  combination={comboString}
  summary={
    combo.frequency
      ? `${combo.frequency}% since last 20 races`
      : "-"
  }
  stats={[
    {
      label: "Avg. every",
      value: combo.avgEvery
        ? `${combo.avgEvery} races`
        : "—",
    },
    {
      label: "Last seen",
      value: combo.lastSeen
        ? `${combo.lastSeen} races`
        : "—",
    },
  ]}
  numbers={comboNumbers}
  userId={user?._id}
/>

                </div>
              );
            })}

          {!loading && visibleCombos.length === 0 && (
            <p className="text-gray-400 text-sm">
              No combos found.
            </p>
          )}
        </div>
      </div>

      {combos.length > 4 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackSideWinningCombos;


// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOverdueCombos } from "../../redux/overdueSlice";
// import TrackSideRaceCard from "./TrackSideRaceCard";

// const TrackSideWinningCombos = () => {
//   const dispatch = useDispatch();
//   const scrollRef = useRef(null);

//   const { combos, loading, error } = useSelector(
//     (state) => state.overdue
//   );
//   const { user } = useSelector((state) => state.auth);

//   const [showAll, setShowAll] = useState(false);

//   const visibleCombos = showAll ? combos : combos.slice(0, 4);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   useEffect(() => {
//     dispatch(fetchOverdueCombos());
//   }, [dispatch]);

//   return (
//     <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
//       <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//         Overdue Winning Combos
//       </h3>
//       <p className="text-xs sm:text-sm font-extralight text-gray-300 mb-4">
//         These popular combos usually hit often, but they haven’t in a while.
//       </p>

//       {loading && (
//         <p className="text-gray-400 text-sm">Loading combos...</p>
//       )}
//       {error && (
//         <p className="text-red-500 text-sm">{error}</p>
//       )}

//       <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
//         {/* Mobile Scroll Buttons */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
//         >
//           &#10094;
//         </button>

//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
//         >
//           &#10095;
//         </button>

//        <div
//   ref={scrollRef}
//   className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
// >
//   {visibleCombos.length > 0 &&
//     visibleCombos.map((combo) => (
//       <div
//         key={combo.combo.join("-")}
//         className="flex-shrink-0 w-72 sm:w-full"
//       >
//         <TrackSideRaceCard
//           combination={combo.combo.join("-")}
//           summary={
//             combo.frequency
//               ? `${combo.frequency}% since last 20 races`
//               : "-"
//           }
//           stats={[
//             {
//               label: "Avg. every",
//               value: combo.avgEvery
//                 ? `${combo.avgEvery} races`
//                 : "—",
//             },
//             {
//               label: "Last seen",
//               value: combo.lastSeen
//                 ? `${combo.lastSeen} races`
//                 : "—",
//             },
//           ]}
//           numbers={combo.combo}
//           userId={user?.id}
//         />
//       </div>
//     ))}

//   {!loading && visibleCombos.length === 0 && (
//     <p className="text-gray-400 text-sm">
//       No combos found.
//     </p>
//   )}
// </div>

//       </div>

//       {combos.length > 4 && (
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             {showAll ? "Show Less" : "Show More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrackSideWinningCombos;
