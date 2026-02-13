import React, { useState } from "react";

const StateTable = ({ columns, data }) => {
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
{/* 
              {expandedRow === rowIdx && (
                <tr className="bg-[#101010] border-b border-[#333]">
                  <td colSpan={columns.length + 1}>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-xs border border-[#333] min-w-[330px]">
                        <thead className="bg-black">
                          <tr className="text-white text-left">
                            <th className="p-2 border-r border-[#333]">Position</th>
                            <th className="p-2">1st</th>
                            <th className="p-2">2nd</th>
                            <th className="p-2">3rd</th>
                            <th className="p-2">4th</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t text-left border-[#333] text-white">
                            <td className="p-2 bg-[#151515] border-r border-[#333]">
                              Avg. (in races)
                            </td>
                            <td className="p-2">25</td>
                            <td className="p-2">28</td>
                            <td className="p-2">36</td>
                            <td className="p-2">49</td>
                          </tr>
                          <tr className="border-t text-left border-[#333] text-white">
                            <td className="p-2 bg-[#151515] border-r border-[#333]">
                              Since (Last races)
                            </td>
                            <td className="p-2">7</td>
                            <td className="p-2">12</td>
                            <td className="p-2">16</td>
                            <td className="p-2">8</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )} */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StateTable;
