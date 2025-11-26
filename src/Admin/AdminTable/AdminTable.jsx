import React from "react";

const AdminTable = ({ title, columns, data }) => {
  return (
    <div className="rounded-lg overflow-x-auto p-4">
      {title && (
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
      )}
      <table className="w-full min-w-max text-sm text-left">
        <thead className="text-xs border-b text-center border-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-800 hover:bg-[#2a2a2a] text-center transition-colors"
            >
              {columns.map((col, colIndex) => {
                const cell = row[col.accessor];
                let textColor = '';
                if (cell === 'Success') textColor = 'text-green-400 font-medium';
                else if (cell === 'Error') textColor = 'text-red-400 font-medium';
                return (
                  <td key={colIndex} className="py-2 px-4">
                    {col.accessor === "number" ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {cell.split("-").map((num, i) => (
                          <span
                            key={i}
                            className="bg-white text-black text-sm px-2 py-0.5 rounded-md"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={textColor}>{cell}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
