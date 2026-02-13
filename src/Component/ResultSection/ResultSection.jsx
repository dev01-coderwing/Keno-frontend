// import React, { useState, useEffect } from "react";
// import ResultInput from "./ResultInput";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../CustomDatePicker.css";
// import { PiCalendarDotsBold } from "react-icons/pi";
// import ResultExpandable from "./ResultExpandable";
// import api from "../../api";
// import { useSelector } from "react-redux";

// const ResultSection = () => {
//   const [date, setDate] = useState(null);
//   const [open, setOpen] = useState(false);
//   // const [resultData, setResultData] = useState([]);

//     const liveKenoData = useSelector(
//     (state) => state.kenoResults.data
//   );

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await api.get("/nsw-keno/keno-results");

//   //       // Map API data into the structure your component expects
//   //       const mappedData = response.data.results.map((item) => ({
//   //         id: item._id,
//   //         date: item.date,
//   //         game: item.draw, // using draw as "game"
//   //         entries: item.numbers, // numbers become entries
//   //         positions: [], // no positions in API yet
//   //         win: null,
//   //         place: [],
//   //         exotic: {},
//   //         dividends: {},
//   //       }));

//   //       setResultData(mappedData);
//   //     } catch (error) {
//   //       console.error(
//   //         "Error fetching Keno data:",
//   //         error.response?.data || error.message
//   //       );
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);


//   const resultData = liveKenoData.map((item, idx) => ({
//   id: idx,
//   date: new Date().toLocaleDateString("en-GB"),
//   game: item.draw,
//   entries: item.numbers,
//   positions: [],
//   win: null,
//   place: [],
//   exotic: {},
//   dividends: {},
// }));


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
import { useDispatch, useSelector } from "react-redux";
import ResultExpandable from "./ResultExpandable";
import ResultInput from "./ResultInput";
import { PiCalendarDotsBold } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CustomDatePicker.css";
import { fetchKenoResults } from "../../redux/kenoSlice";

const ResultSection = () => {
  const dispatch = useDispatch();

  // 🔹 dropdown + pagination states
  const [location, setLocation] = useState("NSW");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  // 🔥 LIVE SOCKET DATA (latest only)
  const liveKeno = useSelector(
    (state) => state.kenoResults.data?.[location]
  );

  // 📄 PAGINATED OLD DATA
  const { results: oldResults, total } = useSelector(
    (state) => state.keno
  );

  // 🔁 pagination API call
  useEffect(() => {
    dispatch(fetchKenoResults({ location, page, limit }));
  }, [dispatch, location, page, limit]);

  // 🧠 MERGE: LIVE (top) + OLD (below)
  const resultData = [];

  // 1️⃣ LIVE RESULT (TOP)
  if (liveKeno) {
    resultData.push({
      id: `live-${location}-${liveKeno.draw}`,
      date: new Date().toLocaleDateString("en-GB"),
      game: liveKeno.draw,
      entries: liveKeno.numbers,
headsTails: liveKeno.coin_result
  ? {
      result: liveKeno.coin_result,
      multiplier: liveKeno.bonus_x || 1,
    }
  : null,


      isLive: true,
      positions: [],
      win: null,
      place: [],
      exotic: {},
      dividends: {},
    });
  }


 // 2️⃣ OLD RESULTS (PAGINATION) — LIVE DRAW REMOVE KARO
if (Array.isArray(oldResults)) {
  console.log("OLD RESULTS ITEM 👉", oldResults[0]);

  oldResults
    .filter(
      (item) =>
        String(item.draw) !== String(liveKeno?.draw)
    )
    .forEach((item) => {
      resultData.push({
        id: item._id,
        date: item.date,
        game: item.draw,
        entries: item.numbers,
         headsTails: item.result
  ? {
      result: item.result,   // "Tails "
      multiplier: item.bonus // "REG"
    }
  : null,

        positions: [],
        win: null,
        place: [],
        exotic: {},
        dividends: {},
      });
    });
}


  return (
    <div className="flex flex-col bg-[#262626] px-4 sm:px-8 py-4 my-4 rounded font-poppins w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full mb-4">
        <h3 className="text-xl font-semibold text-white">Results</h3>

        <div className="flex gap-3 items-center flex-wrap">
          {/* LOCATION DROPDOWN */}
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            className="bg-[#464646] text-white px-3 py-2 rounded-xl text-sm"
          >
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="ACT">ACT</option>
             <option value="SA">SA</option>
          </select>

          <ResultInput placeholder="First Game No." width="w-[130px]" />
          <ResultInput placeholder="Last Game No." width="w-[130px]" />
          <ResultInput
            placeholder="Search by combinations"
            width="w-[220px]"
            showSearchIcon
          />

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
        </div>
      </div>

      {/* RESULTS TABLE */}
      <div className="mt-4 rounded overflow-x-auto">
        <ResultExpandable resultData={resultData} />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-3 mt-4 text-white">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-[#464646] rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-2 py-1 text-sm">
          Page {page}
        </span>

        <button
          disabled={page * limit >= total}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-[#464646] rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultSection;
