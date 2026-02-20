import React from "react";

// 🔢 Generate Keno numbers dynamically (1–80)
const generateNumbers = (max = 80) =>
  Array.from({ length: max }, (_, i) => i + 1);

const Entries = ({
  count,
  onEntriesChange,
  maxNumber = 80, // 🔥 configurable
}) => {
  // rows = [{ position: 1, number: null }, ...]
const [rows, setRows] = React.useState(() =>
  Array.from({ length: count }, (_, i) => ({
    position: i + 1,
    numbers: [], // ✅ array
  }))
);

  // 🔁 Reset rows when count changes
React.useEffect(() => {
  setRows(
    Array.from({ length: count }, (_, i) => ({
      position: i + 1,
      numbers: [],
    }))
  );
}, [count]);


  // 🔁 Notify parent
  React.useEffect(() => {
    onEntriesChange?.(rows);
  }, [rows, onEntriesChange]);

  // ❌ Prevent duplicates
  const isDisabled = (num, currentRow) =>
    rows.some((r) => r.position !== currentRow && r.number === num);

  const selectNumber = (position, num) => {
  setRows((prev) =>
    prev.map((r) =>
      r.position === position
        ? { ...r, numbers: [num] } // ✅ array format
        : r
    )
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

<div
  className="grid gap-1 sm:gap-2 text-[10px] sm:text-sm"
  style={{
    gridTemplateColumns: "repeat(20, minmax(0, 1fr))", // 10 columns = clean symmetry
  }}
>
            {numbers.map((num) => {
              const disabled = isDisabled(num, row.position);
          const selected =
  Array.isArray(row.numbers) && row.numbers.includes(num);


              return (
            <button
  key={num}
  type="button"
  disabled={disabled}
  onClick={() => selectNumber(row.position, num)}
  style={{
    backgroundColor: selected
      ? num <= 40
        ? "rgb(185, 28, 28)"   // dark red (selected)
        : "rgb(37, 99, 235)"  // dark blue (selected)
      : num <= 40
      ? "rgb(239, 68, 68)"   // red
      : "rgb(96, 165, 250)", // blue
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  }}
  className={`px-2 py-1 rounded text-white transition
    ${selected ? "ring-2 ring-white scale-105" : ""}
  `}
>
  {num}
</button>

              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Entries;
