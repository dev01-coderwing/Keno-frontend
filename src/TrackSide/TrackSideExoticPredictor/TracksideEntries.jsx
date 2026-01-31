
import React from "react";

//  Generate Keno numbers dynamically (1–80)
const generateNumbers = (max = 80) =>
  Array.from({ length: max }, (_, i) => i + 1);

const TracksideEntries = ({
  count,
  onEntriesChange,
  maxNumber = 80, // 🔥 configurable
}) => {
  // rows = [{ position: 1, number: null }, ...]
  const [rows, setRows] = React.useState(() =>
    Array.from({ length: count }, (_, i) => ({
      position: i + 1,
      number: null,
    }))
  );

  // 🔁 Reset rows when count changes
  React.useEffect(() => {
    setRows(
      Array.from({ length: count }, (_, i) => ({
        position: i + 1,
        number: null,
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
        r.position === position ? { ...r, number: num } : r
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

          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-[10px] sm:text-sm">
            {numbers.map((num) => {
              const disabled = isDisabled(num, row.position);
              const selected = row.number === num;

              return (
      <button
  key={num}
  type="button"
  disabled={disabled}
  onClick={() => selectNumber(row.position, num)}
  className={`w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden transition
    ${selected ? "ring-2 ring-green-500 scale-105" : ""}
    ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
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
