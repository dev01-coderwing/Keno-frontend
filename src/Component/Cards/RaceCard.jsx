import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverdueCombos,
  fetchOverdueCombosPagination,
} from "../../redux/KenooverdueSlice";
import { createKenoAlert } from "../../redux/KenoAlertSlice";
import { AiOutlineBell, AiFillBell } from "react-icons/ai";

const RaceCard = () => {
  const dispatch = useDispatch();

  const { combos = [] } = useSelector(
    (state) => state.Kenooverdue
  );

  const { user } = useSelector((state) => state.auth);

  const [visibleCount, setVisibleCount] = useState(4);
  const [page, setPage] = useState(1);

  // 🔔 per-card alert state
  const [alertMap, setAlertMap] = useState({});

  useEffect(() => {
    dispatch(fetchOverdueCombos());
  }, [dispatch]);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchOverdueCombosPagination({ page: nextPage, limit: 4 }));
    setVisibleCount((prev) => prev + 4);
  };

const handleBellClick = (combo) => {
  console.log("🔔 Bell clicked");
  console.log("👤 USER OBJECT 👉", user);
  console.log("🆔 USER ID 👉", user?._id);
  console.log("🎯 COMBO 👉", combo);

  dispatch(
    createKenoAlert({
      userId: user?.id,
      gameType: "KENO",
      alertType: `Number ${combo.comboKey} Drought`,
      targetValue: combo.avgEvery,
    })
  ).then((res) => {
    console.log("📡 API RESPONSE 👉", res);

    if (!res.error) {
      const key = combo._id ?? combo.comboKey;
      setAlertMap((prev) => ({
        ...prev,
        [key]: true,
      }));
    }
  });
};


  return (
    <div className="bg-[#0f0f0f] p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-semibold">
          Overdue Combos
        </h2>

        {combos.length > visibleCount && (
          <button
            onClick={handleShowMore}
            className="text-xs text-gray-300 border border-gray-600 px-3 py-1 rounded-md hover:bg-gray-800"
          >
            Show More
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {combos.slice(0, visibleCount).map((combo, index) => {
          const cardKey = combo._id ?? combo.comboKey ?? index;

          return (
            <div
              key={cardKey}
              className="bg-[#151515] rounded-xl p-4 relative"
            >
              {/* 🔔 Bell */}
              <div
                className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => handleBellClick(combo)}
              >
                {alertMap[cardKey] ? (
                  <AiFillBell size={18} className="text-blue-500" />
                ) : (
                  <AiOutlineBell size={18} />
                )}
              </div>

              <h3 className="text-white font-bold text-lg mb-1 text-center">
                {combo.comboKey}
              </h3>

              <p className="text-xs text-gray-400 mb-3 text-center">
                Avg every {combo.avgEvery} races
              </p>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Avg Every</span>
                  <span>{combo.avgEvery} races</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Last Seen</span>
                  <span>{combo.lastSeen} races</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RaceCard;

// import React, { useState } from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// const RaceCard = ({
//   combination,
//   stats,
//   summary,
// }) => {
//   const [liked, setLiked] = useState(false);

//   return (
//     <div className="relative bg-[#0E0E0E] text-white p-8 rounded-lg w-full max-w-xs flex flex-col gap-2 shrink-0">
//       <div
//         className="absolute top-3 right-3 cursor-pointer text-white text-lg bg-white/15 rounded-lg p-1"
//         onClick={() => setLiked(!liked)}
//       >
//         {liked ? <AiFillHeart /> : <AiOutlineHeart />}
//       </div>

//       <div className="border-b pb-2 text-center">
//         <h2 className="text-3xl font-semibold tracking-wide">
//           {combination}
//         </h2>
//         <p className="text-sm font-semibold font-opensans">
//           {summary}
//         </p>
//       </div>

//       <div className="flex flex-col gap-1 text-xs font-opensans font-semibold mt-2">
//         {stats.map((item, index) => (
//           <div key={index} className="flex justify-between pb-1">
//             <span>{item.label}</span>
//             <span>{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RaceCard;


// import React from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavorite, unlikeFavorite } from "../../redux/favoriteSlice";

// const RaceCard = ({
//   combination,
//   stats,
//   summary,
//   userId,
//   gameType,
//   resultId,
//   numbers,
// }) => {
//   const dispatch = useDispatch();

//   const { likedResults, loading } = useSelector((state) => state.favorite);

//   const favoriteId = likedResults[resultId];  
//   const liked = Boolean(favoriteId);

//   const handleLike = () => {
//     if (loading) return;

//     if (liked && favoriteId !== "ALREADY") {

//       dispatch(unlikeFavorite(favoriteId));
//     } else {

//       dispatch(
//         toggleFavorite({
//           userId,
//           gameType,
//           resultId,
//           numbers,
//         })
//       );
//     }
//   };

//   return (
//     <div className="relative bg-[#0E0E0E] text-white p-8 rounded-lg w-full max-w-xs flex flex-col gap-2 shrink-0">
//       <div
//         className={`absolute top-3 right-3 cursor-pointer text-white text-lg bg-white/15 rounded-lg p-1 transition ${
//           liked ? "scale-110" : ""
//         }`}
//         onClick={handleLike}
//       >
//         {liked ? (
//           <AiFillHeart className="text-red-500" />
//         ) : (
//           <AiOutlineHeart />
//         )}
//       </div>

//       <div className="border-b pb-2 text-center">
//         <h2 className="text-3xl font-semibold tracking-wide">
//           {combination}
//         </h2>
//         <p className="text-sm font-semibold font-opensans">
//           {summary}
//         </p>
//       </div>

//       <div className="flex flex-col gap-1 text-xs font-opensans font-semibold mt-2">
//         {stats.map((item, index) => (
//           <div key={index} className="flex justify-between pb-1">
//             <span>{item.label}</span>
//             <span>{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RaceCard;





// import React from "react";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavorite, unlikeFavorite } from "../../redux/favoriteSlice";

// const RaceCard = ({
//   combination,
//   stats,
//   summary,
//   userId,
//   gameType,
//   resultId,
//   numbers,
// }) => {
//   const dispatch = useDispatch();

//   const { likedResults, loading } = useSelector((state) => state.favorite);

//   const favoriteId = likedResults[resultId];
//   const liked = Boolean(favoriteId);

//   const safeNumbers = Array.isArray(numbers)
//     ? numbers
//     : typeof numbers === "string"
//       ? numbers.split("-").map(Number)
//       : [];

//   const handleLike = () => {
//     if (loading) return;

//     if (liked && favoriteId !== "ALREADY") {
//       dispatch(unlikeFavorite(favoriteId));
//     } else {
//       dispatch(
//         toggleFavorite({
//           userId,
//           gameType,
//           resultId,
//           numbers: safeNumbers,   // 🔥 use safe version
//         })
//       );
//     }
//   };

//   return (
//     <div className="relative bg-[#0E0E0E] text-white p-8 rounded-lg w-full max-w-xs flex flex-col gap-2 shrink-0">
//       <div
//         className={`absolute top-3 right-3 cursor-pointer text-white text-lg bg-white/15 rounded-lg p-1 transition ${liked ? "scale-110" : ""
//           }`}
//         onClick={handleLike}
//       >
//         {liked ? (
//           <AiFillHeart className="text-red-500" />
//         ) : (
//           <AiOutlineHeart />
//         )}
//       </div>

//       <div className="border-b pb-2 text-center">
//         <h2 className="text-3xl font-semibold tracking-wide">
//           {combination}
//         </h2>
//         <p className="text-sm font-semibold font-opensans">
//           {summary}
//         </p>
//       </div>

//       <div className="flex flex-col gap-1 text-xs font-opensans font-semibold mt-2">
//         {stats.map((item, index) => (
//           <div key={index} className="flex justify-between pb-1">
//             <span>{item.label}</span>
//             <span>{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RaceCard;
