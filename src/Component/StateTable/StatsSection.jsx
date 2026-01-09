import React from "react";

const StatsSection = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-b-2xl bg-[#1D1D1D]">
      <div className="min-w-[700px] md:min-w-full">
        <table className="w-full text-center text-sm">
          <thead className="bg-[#0A0A0A]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`py-3 font-opensans font-semibold text-white whitespace-nowrap ${
                    col === "" ? "min-w-[250px] px-4" : "px-6"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#1D1D1D]">
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-950">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`py-3 whitespace-nowrap text-white ${
                      columns[cellIdx] === "" ? "min-w-[250px] px-4" : "px-6"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsSection;
