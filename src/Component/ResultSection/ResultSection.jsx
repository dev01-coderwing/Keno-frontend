// import React, { useState, useEffect } from "react";
// import ResultInput from "./ResultInput";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../CustomDatePicker.css";
// import { PiCalendarDotsBold } from "react-icons/pi";
// import ResultExpandable from "./ResultExpandable";
// import api from "../../api";

// const ResultSection = () => {
//   const [date, setDate] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [resultData, setResultData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/nsw-keno/keno-results");

//         // Map API data into the structure your component expects
//         const mappedData = response.data.results.map((item) => ({
//           id: item._id,
//           date: item.date,
//           game: item.draw, // using draw as "game"
//           entries: item.numbers, // numbers become entries
//           positions: [], // no positions in API yet
//           win: null,
//           place: [],
//           exotic: {},
//           dividends: {},
//         }));

//         setResultData(mappedData);
//       } catch (error) {
//         console.error(
//           "Error fetching Keno data:",
//           error.response?.data || error.message
//         );
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchFilteredData = async (filters = {}) => {
//     try {
//       // Build query params
//       const params = new URLSearchParams({
//         page: 1,
//         limit: 10,
//         ...filters, // { fromGame, toGame, date, combination }
//       });

//       const response = await api.get(
//         `/nsw-keno/applyfilters?${params.toString()}`
//       );

//       if (response.data.success) {
//         const mappedData = response.data.results.map((item) => ({
//           id: item._id,
//           date: item.date,
//           game: item.draw,
//           entries: item.numbers,
//           positions: [],
//           win: null,
//           place: [],
//           exotic: {},
//           dividends: {},
//         }));

//         setResultData(mappedData);
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching filtered Keno data:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col bg-[#262626] px-4 sm:px-8 py-4 my-4 rounded font-poppins w-full">
//       <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
//         <h3 className="text-xl font-semibold text-white">Results:</h3>
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
//   );
// };

// export default ResultSection;
import React, { useState, useEffect } from "react";
import ResultInput from "./ResultInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CustomDatePicker.css";   
import { PiCalendarDotsBold } from "react-icons/pi";
import ResultExpandable from "./ResultExpandable";
import { useDispatch, useSelector } from "react-redux";
import { fetchKenoResults, fetchFilteredResults } from "../../redux/kenoSlice";
// import { fetchTracksideResults } from "../../redux/tracksideSlice";

const ResultSection = () => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("NSW");

  // NEW STATE — Keno / Trackside switch
  const [selectedGame, setSelectedGame] = useState("keno");

  //  Store last used filters so pagination also works for VIC/SA/ACT
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    location: "NSW",
    combination: "",
    fromGame: "",
    toGame: "",
    date: "",
  });

  const dispatch = useDispatch();

  const kenoState = useSelector((state) => state.keno);
  const tracksideState = useSelector((state) => state.trackside);

  const loading = selectedGame === "keno" ? kenoState.loading : tracksideState.loading;
  const error = selectedGame === "keno" ? kenoState.error : tracksideState.error;
  const results = selectedGame === "keno" ? kenoState.results : tracksideState.results;

  // ⭐ Correct pagination state for ALL LOCATIONS (NSW, VIC, SA, ACT)
  const paginationState = selectedGame === "keno" ? kenoState : tracksideState;
  const { page, limit, total } = paginationState;
  const totalPages = Math.ceil(total / limit);

  // Load initial data when game changes
  useEffect(() => {
    if (selectedGame === "keno") {
      dispatch(fetchKenoResults());
    } else {
      dispatch(fetchTracksideResults());
    }
  }, [selectedGame, dispatch]);

  // ⭐ PAGE CHANGE FIX — Works for VIC, SA, ACT, NSW
  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    dispatch(fetchFilteredResults(updated));
  };

  // Normalized data mapping for UI
  const resultData = results.map((item) => ({
    id: item._id,
    date: item.date,
    game: selectedGame === "keno" ? item.draw : item.raceNumber,
    entries: selectedGame === "keno" ? item.numbers : item.horses,
    positions: item.positions || [],
    win: item.win || null,
    place: item.place || [],
    exotic: item.exotic || {},
    dividends: item.dividends || {},
  }));

  // ⭐ SEARCH FIX — Stores filters so pagination works
  const handleSearch = () => {
  const firstGame = document.querySelector('input[name="fromGame"]')?.value ?? "";
  const lastGame = document.querySelector('input[name="toGame"]')?.value ?? "";
  const combo = document.querySelector('input[name="combination"]')?.value ?? "";

  const newFilters = {
    page: 1,
    limit: 10,
    location,
    fromGame: firstGame,
    toGame: lastGame,
    combination: combo,
    date: date ? date.toISOString().split("T")[0] : "",
  };

  setFilters(newFilters);
  dispatch(fetchFilteredResults(newFilters));
};


  return (
    <div className="flex flex-col bg-[#262626] px-4 sm:px-8 py-4 my-4 rounded font-poppins w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
        <h3 className="text-xl font-semibold text-white">
          {selectedGame === "keno" ? "Keno Results:" : "Trackside Results:"}
        </h3>

        <div className="flex flex-wrap gap-3 items-center">
          {selectedGame === "keno" && (
            <>
              <ResultInput placeholder={"First Game No."} width="w-[130px]" />
              <ResultInput placeholder={"Last Game No."} width="w-[130px]" />
            </>
          )}

          <ResultInput
            placeholder={
              selectedGame === "keno"
                ? "Search by combinations"
                : "Search horse / race"
            }
            width="w-[220px]"
            showSearchIcon={true}
          />

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
                  onChange={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>

          <button
            className="bg-white text-black px-4 py-3 text-sm rounded-xl"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Show All + Location Selector */}
      <div className="flex items-center gap-4 ml-auto mt-5">
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);

            const updated = {
              ...filters,
              location: e.target.value,
              page: 1,
            };

            setFilters(updated);
            dispatch(fetchFilteredResults(updated));
          }}
          className="bg-[#464646] text-white text-sm px-3 py-2 rounded-lg focus:outline-none"
        >
          <option value="VIC">VIC</option>
          <option value="ACT">ACT</option>
          <option value="SA">SA</option>
          <option value="NSW">NSW</option>
        </select>
      </div>

      {/* LOADING / ERROR */}
      {loading && <p className="text-gray-400 mt-4">Loading...</p>}
      {error && <p className="text-red-400 mt-4">Error fetching results: {error}</p>}

      {!loading && !error && (
        <>
          <div className="mt-4 rounded overflow-x-auto">
            <ResultExpandable
              resultData={Array.isArray(resultData) ? resultData : [resultData]}
            />
          </div>

          {/* ⭐ PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6 text-white">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`px-3 py-1 rounded ${
                  page === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-white text-black"
                }`}
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded ${
                  page === totalPages
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-white text-black"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultSection;
