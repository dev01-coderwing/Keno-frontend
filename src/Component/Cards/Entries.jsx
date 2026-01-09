import React from "react";

const numbersList = [
  { num: 1, color: "bg-red-700" },
  { num: 2, color: "bg-black" },
  { num: 3, color: "border border-white" },
  { num: 4, color: "bg-blue-800" },
  { num: 5, color: "bg-green-500" },
  { num: 6, color: "bg-green-900" },
  { num: 7, color: "bg-blue-400" },
  { num: 8, color: "bg-pink-400" },
  { num: 9, color: "bg-green-700" },
  { num: 10, color: "bg-red-500" },
  { num: 11, color: "bg-orange-500" },
  { num: 12, color: "bg-blue-300" },
];

const Entries = ({ count, onEntriesChange }) => {
  // rows = [{ position: 1, numbers: [] }, ...]
  const [rows, setRows] = React.useState(() =>
    Array.from({ length: count }, (_, i) => ({ position: i + 1, numbers: [] }))
  );

  // Reset rows when `count` changes (e.g., different bet type)
  React.useEffect(() => {
    setRows(Array.from({ length: count }, (_, i) => ({ position: i + 1, numbers: [] })));
  }, [count]);

  // Notify parent any time rows change
  React.useEffect(() => {
    onEntriesChange?.(rows);
  }, [rows, onEntriesChange]);

  const toggle = (position, num) => {
    setRows((prev) =>
      prev.map((r) =>
        r.position === position
          ? {
              ...r,
              numbers: r.numbers.includes(num)
                ? r.numbers.filter((n) => n !== num)
                : [...r.numbers, num],
            }
          : r
      )
    );
  };

  const ordinal = (n) => (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th");

  return (
    <div className="flex flex-col gap-1 py-4">
      {rows.map((row) => (
        <div
          key={row.position}
          className="flex flex-col sm:flex-row sm:justify-around sm:items-center bg-[#565656] p-2 w-full"
        >
          <p className="text-white font-medium text-sm sm:text-base text-center sm:text-left mb-2 sm:mb-0">
            {row.position}
            {ordinal(row.position)}
          </p>

          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm">
            {numbersList.map(({ num, color }) => (
              <button
                key={num}
                type="button"
                onClick={() => toggle(row.position, num)}
                className={`px-2 py-1 text-white ${color} rounded ${
                  row.numbers.includes(num) ? "ring-2 ring-green-500" : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Entries;
