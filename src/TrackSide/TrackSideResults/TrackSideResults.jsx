// import React, { useState, useEffect } from "react";
// import ResultInput from "./TrackSideResultInput";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../Component/CustomDatePicker.css";
// import { PiCalendarDotsBold } from "react-icons/pi";
// import ResultExpandable from "./TrackSideResultExpandable";
// import api from "../../api";
// import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";

// function TrackSideResults() {
//    const [date, setDate] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [resultData, setResultData] = useState([]);

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await api.get(
//         "https://keno-d2lu.onrender.com/api/v1/nsw-trackside/track-results"
//       );

//       const mappedData = response.data.results.map((item) => ({
//         id: item._id,
//         date: item.date,
//         game: item.game,
//         entries: item.entries,   
//         positions: item.positions || [],
//         win: item.win || null,
//         place: item.place || [],
//         exotic: item.exotic || {},
//         dividends: item.dividends || {},
//       }));

//       setResultData(mappedData);
//     } catch (error) {
//       console.error("Error fetching Trackside results:", error);
//     }
//   };

//   fetchData();
// }, []);


//     const fetchFilteredData = async (filters = {}) => {
//       try {
//         // Build query params
//         const params = new URLSearchParams({
//           page: 1,
//           limit: 10,
//           ...filters, // { fromGame, toGame, date, combination }
//         });

//         const response = await api.get(
//           `/nsw-keno/applyfilters?${params.toString()}`
//         );

//         if (response.data.success) {
//           const mappedData = response.data.results.map((item) => ({
//             id: item._id,
//             date: item.date,
//             game: item.draw,
//             entries: item.numbers,
//             positions: [],
//             win: null,
//             place: [],
//             exotic: {},
//             dividends: {},
//           }));

//           setResultData(mappedData);
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching filtered Keno data:",
//           error.response?.data || error.message
//         );
//       }
//     };
//   return (
//     <>
//     <TrackSideLayout>
//       <div className="flex flex-col bg-[#262626] px-4 sm:px-8 py-4 my-4 rounded font-poppins w-full">
//       <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
//         <h3 className="text-xl font-semibold text-white">TrackSide Results:</h3>
//         <div className="flex flex-wrap gap-3 items-center">
//           <ResultInput placeholder={"First Game No."} width="w-[130px]" />
//           <ResultInput placeholder={"Last Game No."} width="w-[130px]" />
//           <ResultInput
//             placeholder={"Search by combinations"}
//             width="w-[220px]"
//             showSearchIcon={true}
//           /> 
//           <div className="relative inline-block">
//             <button
//               onClick={() => setOpen(!open)}
//               className="bg-[#464646] text-[#c8c8c8] text-sm px-3 py-3 rounded-xl flex items-center gap-2"
//             >
//               <PiCalendarDotsBold />
//               {date ? date.toDateString() : "Date"}
//             </button>
//             {open && (
//               <div className="absolute top-full right-0 mt-2 z-50 shadow-lg max-w-[180px]">
//                 <DatePicker
//                   selected={date}
//                   onChange={(date) => {
//                     setDate(date);
//                     setOpen(false);
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>
//           <button
//             className="bg-white text-black px-4 py-3 text-sm rounded-xl"
//             onClick={() => {
//               const filters = {
//                 fromGame: document.querySelector(
//                   'input[placeholder="First Game No."]'
//                 ).value,
//                 toGame: document.querySelector(
//                   'input[placeholder="Last Game No."]'
//                 ).value,
//                 combination: document.querySelector(
//                   'input[placeholder="Search by combinations"]'
//                 ).value,
//                 date: date ? date.toISOString().split("T")[0] : undefined,
//               };

//               fetchFilteredData(filters);
//             }}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <label className="inline-flex items-center cursor-pointer font-light relative ml-auto mt-5 text-sm">
//         <input
//           type="checkbox"
//           className="peer appearance-none w-5 h-5 border border-white rounded bg-transparent checked:bg-transparent checked:border-white"
//         />
//         <span className="absolute left-[4px] text-white text-md hidden peer-checked:inline">
//           ✓
//         </span>
//         <span className="ml-3 text-white">
//           Show results from all races till date
//         </span>
//       </label>

//       <div className="mt-4 rounded overflow-x-auto">
//         <ResultExpandable
//           resultData={Array.isArray(resultData) ? resultData : [resultData]}
//         />
//       </div>
//     </div>
//      </TrackSideLayout>
//     </>
//   )
// }

// export default TrackSideResults

import React, { useEffect, useState } from "react";
import ResultInput from "./TrackSideResultInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Component/CustomDatePicker.css";
import { PiCalendarDotsBold } from "react-icons/pi";
import ResultExpandable from "./TrackSideResultExpandable";
import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";
import SubscriptionGuard from "../../Component/SubscriptionGuard";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTracksideResults,
  fetchPaginatedTracksideResults,
  fetchFilteredResultsByLocation,
} from "../../redux/tracksideResultsSlice";

function TrackSideResults() {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [firstGame, setFirstGame] = useState("");
  const [lastGame, setLastGame] = useState("");
  const [location, setLocation] = useState("NSW");
  const [limit] = useState(20);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const dispatch = useDispatch();

  const {
    loading,
    results,
    live,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.tracksideResults);


  /* ------------------------------ LOAD INITIAL PAGINATED DATA ------------------------------ */
  useEffect(() => {
    dispatch(fetchPaginatedTracksideResults({ location, limit, page: 1 }));
  }, [dispatch, location, limit]);

useEffect(() => {
  console.log("RESULTS FROM REDUX:", results);
}, [results]);

  /* ------------------------------ FORMAT TABLE DATA ------------------------------ */
  // 🔥 LIVE + OLD MERGED DATA (LIVE ALWAYS ON TOP)
  const resultData = [];

  // 1️⃣ LIVE DATA (SOCKET) — TOP PE
  const liveGame = live?.[location];

  if (liveGame?.gameNumber) {
    resultData.push({
      id: `live-${location}-${liveGame.gameNumber}`,
      date: new Date(liveGame.timestamp).toISOString().split("T")[0],
      game: liveGame.gameName,
      entries: liveGame.numbers,
      isLive: true,
      positions: [],
      win: null,
      place: [],
      exotic: {},
      dividends: {},
    });
  }

  // 2️⃣ OLD PAGINATED DATA — NICHE
  // 2️⃣ OLD RESULTS — SORT DESC (LATEST FIRST)
  const filteredResults = isSearchMode
    ? results // 🔍 search ke time direct results
    : results?.filter((item) => item.location === location); // 📄 normal mode

  filteredResults
    ?.filter(
      (item) =>
        String(item.gameNumber) !== String(liveGame?.gameNumber)
    )
    .sort((a, b) => b.gameNumber - a.gameNumber)
    .forEach((item) => {
      resultData.push({
        id: item._id,
        date: item.date,
        game: item.gameName,
        entries: item.numbers,
        positions: [],
        win: null,
        place: [],
        exotic: {},
        dividends: {},
      });
    });



  /* ------------------------------ HANDLE SEARCH ------------------------------ */
  const handleSearch = () => {
    if (!date) return alert("Please select a date");
    if (!firstGame || !lastGame) return alert("Please enter game range");
const formattedDate = date.toISOString().split("T")[0];
    const filters = {
      startDate: formattedDate,
      endDate: formattedDate,
      startGameNo: Number(firstGame),
      endGameNo: Number(lastGame),
    };
  setIsSearchMode(true); 

    dispatch(fetchFilteredResultsByLocation({ location, filters })).catch(
      (err) => console.log("FILTER ERROR:", err)
    );
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(
        fetchPaginatedTracksideResults({
          location,
          limit,
          page: currentPage + 1,
        })
      );
    }
  };

  const handlePrev = () => {
    if (isSearchMode) return;

    if (currentPage > 1) {
      dispatch(
        fetchPaginatedTracksideResults({
          location,
          limit,
          page: currentPage - 1,
        })
      );
    }
  };

  /* ------------------------------ RENDER ------------------------------ */
  return (
    <TrackSideLayout>
    <SubscriptionGuard>
      <div className="flex flex-col bg-[#262626] px-4 sm:px-8 py-4 my-4 rounded font-poppins w-full">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
          <h3 className="text-xl font-semibold text-white">TrackSide Results:</h3>

          <div className="flex flex-wrap gap-3 items-center">
            <ResultInput
              placeholder="First Game No."
              width="w-[130px]"
              value={firstGame}
              onChange={(e) => setFirstGame(e.target.value)}
            />

            <ResultInput
              placeholder="Last Game No."
              width="w-[130px]"
              value={lastGame}
              onChange={(e) => setLastGame(e.target.value)}
            />

            <ResultInput placeholder="Search by combinations" width="w-[220px]" showSearchIcon />

            {/* DATE PICKER */}
            <div className="relative inline-block">
              <button
                onClick={() => setOpen(!open)}
                className="bg-[#464646] text-[#c8c8c8] text-sm px-3 py-3 rounded-xl flex items-center gap-2"
              >
                <PiCalendarDotsBold />
                {date ? date.toDateString() : "Date"}
              </button>

              {open && (
                <div className="absolute top-full right-0 mt-2 z-50 shadow-lg max-w-[180px]">
                  <DatePicker
                    selected={date}
                    onChange={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-white text-black px-4 py-3 text-sm rounded-xl"
            >
              Search
            </button>
          </div>
        </div>

        {/* STATUS */}
        {loading && <p className="text-white mt-3">Loading...</p>}
        {error && <p className="text-red-400 mt-3">Error: {error}</p>}

        {/* FILTERS + LOCATION */}
        <div className="flex items-center gap-4 ml-auto mt-5">
          <label className="inline-flex items-center cursor-pointer font-light relative text-sm">
            <input
              type="checkbox"
              className="peer appearance-none w-5 h-5 border border-white rounded bg-transparent checked:bg-transparent checked:border-white"
            />
            <span className="absolute left-[4px] text-white text-md hidden peer-checked:inline">
              ✓
            </span>
            <span className="ml-3 text-white">
              Show results from all races till date
            </span>
          </label>

          <select
            value={location}
            onChange={(e) => {
              const loc = e.target.value;
              setLocation(loc);
              setIsSearchMode(false); // ✅ ADD

              // Load fresh data when location changes
              dispatch(fetchTracksideResults(loc));
              dispatch(
                fetchPaginatedTracksideResults({ location: loc, limit, page: 1 })
              );
            }}
            className="bg-[#464646] text-white text-sm px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="VIC">VIC-ACT</option>
            <option value="NSW">NSW</option>
          </select>
        </div>

        {/* RESULTS TABLE */}
        <div className="mt-4 rounded overflow-x-auto">
          <ResultExpandable
            key={live?.[location]?.gameNumber || "static"}
            resultData={resultData}
          />
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-white">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      </SubscriptionGuard>
    </TrackSideLayout>
  );
}

export default TrackSideResults;
