import React, { useState } from "react";

const ResultExpandable = ({ resultData }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!Array.isArray(resultData) || resultData.length === 0) {
    return <p className="text-gray-400 p-4">No results available</p>;
  }


const getColorByNumber = (num) => {
  if (num >= 1 && num <= 40) return "#EF4444";   // 🔴 Red
  if (num >= 41 && num <= 80) return "#60A5FA";  // 🔵 Blue
  return "#4B5563"; // fallback gray
};


  return (
    <div className="w-full px-4">
      <table className="w-full border-collapse text-sm text-white">
        <thead>
          <tr className="bg-gray-900 text-left text-sm">
            <th className="p-3">Date</th>
            <th className="p-3">Game</th>
            <th className="p-3">Entries</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((item, idx) => (
            <React.Fragment key={item.id || idx}>
              <tr
                onClick={() => toggleExpand(item.id)}
                className="cursor-pointer bg-[#1C1C1C] hover:bg-[#333] border-b border-gray-800"
              >
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.game}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {item.entries?.map((num) => (
                      <span
                        key={`${item.id}-entry-${num}`}
                        className="px-2 py-1 rounded text-sm font-semibold text-white"
                        style={{
                          backgroundColor: getColorByNumber(num),
                        }}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>

              {expandedId === item.id && (
                <tr className="bg-[#212121] border border-gray-500">
                  <td colSpan={3}>
                    <div className="p-4 space-y-4">
                      {/* Position, Win, Place Section */}
                      <table className="w-full border-b border-gray-700 pb-4 table-fixed">
                        <thead>
                          <tr className="text-sm text-gray-300">
                            <th className="text-left w-1/3">Position</th>
                            <th className="text-right w-1/3">Win</th>
                            <th className="text-right w-1/3">Place</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="align-top pt-2">
                              <div className="space-y-2">
                                {item.positions?.map((pos, posIdx) => (
                                  <div
                                    key={`${item.id}-pos-${pos.label}-${posIdx}`}
                                    className="flex items-center gap-8"
                                  >
                                    <span className="w-10 text-gray-400">
                                      {pos.label}
                                    </span>
                                    <span
                                      className="px-2 py-1 rounded font-semibold text-white"
                                      style={{
                                        backgroundColor:
                                          pos.label === "1st"
                                            ? "#60A5FA"
                                            : pos.label === "2nd"
                                            ? "#047857"
                                            : pos.label === "3rd"
                                            ? "#84CC16"
                                            : "#4B5563",
                                      }}
                                    >
                                      {pos.number}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td className="align-top pt-2 text-right text-white">
                              {item.win}
                            </td>

                            <td className="align-top pt-2 text-right text-white">
                              <div className="space-y-1">
                                {item.place?.map((p, placeIdx) => (
                                  <div key={`${item.id}-place-${placeIdx}`}>
                                    {p}
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

{item.headsTails && (
  <div className="flex items-center justify-between bg-[#1E40AF] px-4 py-2 rounded-lg">
    <div className="flex items-center gap-2">
      <span className="text-white font-semibold">
        {item.headsTails.result}
      </span>
    </div>

    <div className="bg-green-600 text-white font-bold px-3 py-1 rounded-md">
      {item.headsTails.multiplier}
    </div>
  </div>
)}

                      <div className="flex justify-between bg-[#363636] px-2 py-2 border-b border-gray-600 text-sm text-gray-100 font-medium">
                        <span>Drought Results</span>
                        <span>Dividend</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        {item.exotic &&
                          Object.keys(item.exotic).map((exoticKey) => (
                            <div
                              key={`${item.id}-exotic-${exoticKey}`}
                              className="flex justify-between items-center border-b border-gray-700 py-1"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-24 text-gray-300">
                                  {exoticKey}
                                </span>
                                {item.exotic[exoticKey].map((n, exIdx) => (
                                  <span
                                    key={`${item.id}-${exoticKey}-${n}-${exIdx}`}
                                    className="px-2 py-1 rounded font-semibold text-white"
                                    style={{
                                      backgroundColor:
                                        exIdx === 0
                                          ? "#60A5FA"
                                          : exIdx === 1
                                          ? "#047857"
                                          : exIdx === 2
                                          ? "#84CC16"
                                          : "#4B5563",
                                    }}
                                  >
                                    {n}
                                  </span>
                                ))}
                              </div>
                              <span className="text-white">
                                {item.dividends?.[exoticKey]}
                              </span>
                            </div>
                          ))}
                      </div>
                      
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

export default ResultExpandable;
