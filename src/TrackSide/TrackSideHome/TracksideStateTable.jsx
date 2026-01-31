import React, { useState } from "react";

const TracksideStateTable = ({ columns, data }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="w-full bg-[#1D1D1D] rounded-b-2xl overflow-x-auto">
      <table className="w-full text-sm text-center table-auto min-w-full">
        <thead className="bg-[#0A0A0A]">
          <tr>
            <th className="w-12"></th>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="text-white py-3 px-2 sm:px-4 font-semibold font-opensans"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              <tr
                className="border-b border-[#2C2C2C] hover:bg-[#2e2e2e] cursor-pointer"
                onClick={() => toggleRow(rowIdx)}
              >
                <td className="text-white font-bold text-xl px-2 sm:px-4 py-3">
                  {expandedRow === rowIdx ? "−" : "+"}
                </td>
                {row.rowData.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="text-white py-3 px-2 sm:px-4 text-center"
                  >
                    {cell}
                  </td>
                ))}
              </tr>

         {expandedRow === rowIdx && (
  <tr className="bg-[#101010] border-b border-[#333]">
    <td colSpan={columns.length + 1}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs border border-[#333]">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Race No</th>
              <th className="p-2">Type</th>
              <th className="p-2">Position</th>
              <th className="p-2">Drought</th>
            </tr>
          </thead>
          <tbody>
            {row.expandedData.map((r, i) => (
              <tr key={i} className="border-t border-[#333] text-white">
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.raceNumber}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.position}</td>
                <td className="p-2">{r.drought}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </td>
  </tr>
)}

            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TracksideStateTable;
