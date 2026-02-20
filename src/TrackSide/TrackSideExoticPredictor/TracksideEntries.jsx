// import React from "react";

// // Generate numbers dynamically (1–maxNumber)
// const generateNumbers = (max = 80) =>
//   Array.from({ length: max }, (_, i) => i + 1);

// const TracksideEntries = ({
//   count,
//   onEntriesChange,
//   maxNumber = 80, // 🔥 configurable
// }) => {
//   // rows = [{ position: 1, number: [] }, ...]
//   const [rows, setRows] = React.useState(() =>
//     Array.from({ length: count }, (_, i) => ({
//       position: i + 1,
//       number: [], // 🔥 now array for multi-select
//     }))
//   );

//   // 🔁 Reset rows when count changes
//   React.useEffect(() => {
//     setRows(
//       Array.from({ length: count }, (_, i) => ({
//         position: i + 1,
//         number: [],
//       }))
//     );
//   }, [count]);

//   // 🔁 Notify parent
//   React.useEffect(() => {
//     onEntriesChange?.(rows);
//   }, [rows, onEntriesChange]);

//   // ❌ Prevent duplicates across positions
//   const isDisabled = (num, currentPosition) =>
//     rows.some(
//       (r) => r.position !== currentPosition && r.number.includes(num)
//     );

//   // ✅ Toggle number (select / unselect)
//   const toggleNumber = (position, num) => {
//     setRows((prev) =>
//       prev.map((r) => {
//         if (r.position !== position) return r;

//         const exists = r.number.includes(num);

//         return {
//           ...r,
//           number: exists
//             ? r.number.filter((n) => n !== num)
//             : [...r.number, num],
//         };
//       })
//     );
//   };

//   const ordinal = (n) =>
//     n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";

//   const numbers = generateNumbers(maxNumber);

//   return (
//     <div className="flex flex-col gap-2 py-4">
//       {rows.map((row) => (
//         <div
//           key={row.position}
//           className="flex flex-col sm:flex-row sm:items-center bg-[#565656] p-2 w-full rounded"
//         >
//           <p className="text-white font-medium text-sm sm:text-base w-12 text-center">
//             {row.position}
//             {ordinal(row.position)}
//           </p>

//           <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm">
//             {numbers.map((num) => {
//               const disabled = isDisabled(num, row.position);
//               const selected = row.number.includes(num);

//               return (
//                 <button
//                   key={num}
//                   type="button"
//                   disabled={disabled}
//                   onClick={() => toggleNumber(row.position, num)}
//                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden transition
//                     ${selected ? "ring-2 ring-green-500 scale-105" : ""}
//                     ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
//                   `}
//                 >
//                   <img
//                     src={`/image/${num}.jpeg`}
//                     alt={`option-${num}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TracksideEntries;


import React from "react";

// Generate numbers dynamically (1–maxNumber)
const generateNumbers = (max = 80) =>
  Array.from({ length: max }, (_, i) => i + 1);

const TracksideEntries = ({
  count,
  onEntriesChange,
  maxNumber = 80, // 🔥 configurable
}) => {
  // rows = [{ position: 1, number: [] }, ...]
  const [rows, setRows] = React.useState(() =>
    Array.from({ length: count }, (_, i) => ({
      position: i + 1,
      number: [], // 🔥 multi-select array
    }))
  );

  // 🔁 Reset rows when count changes
  React.useEffect(() => {
    setRows(
      Array.from({ length: count }, (_, i) => ({
        position: i + 1,
        number: [],
      }))
    );
  }, [count]);

  // 🔁 Notify parent
  React.useEffect(() => {
    onEntriesChange?.(rows);
  }, [rows, onEntriesChange]);

  // ✅ Toggle number (select / unselect) – NO DISABLE LOGIC
  const toggleNumber = (position, num) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.position !== position) return r;

        const exists = r.number.includes(num);

        return {
          ...r,
          number: exists
            ? r.number.filter((n) => n !== num)
            : [...r.number, num],
        };
      })
    );
  };

  const ordinal = (n) =>
    n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";

  const numbers = generateNumbers(maxNumber);

  return (
    <div className="flex flex-col gap-2 py-4">
      {rows.map((row) => (
        <div
          key={row.position}
          className="flex flex-col sm:flex-row sm:items-center bg-[#565656] p-2 w-full rounded"
        >
          <p className="text-white font-medium text-sm sm:text-base w-12 text-center">
            {row.position}
            {ordinal(row.position)}
          </p>

          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm">
            {numbers.map((num) => {
              const selected = row.number.includes(num);

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => toggleNumber(row.position, num)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden transition
                    ${selected ? "ring-2 ring-green-500 scale-105" : ""}
                    hover:scale-105
                  `}
                >
                  <img
                    src={`/image/${num}.jpeg`}
                    alt={`option-${num}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TracksideEntries;
