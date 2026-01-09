import React from "react";

const TicketsTableCard = ({ data = [] }) => {
  return (
    <div className="bg-[#131313] p-4 rounded-lg text-white w-full">
      <div className="flex justify-between">
        <p>Average Tickets Per Agent</p>
      </div>

      <p className="text-lg font-bold my-2">
        {data.length} Agents{" "}
        <span className="text-gray-400 text-xs">/ This Week</span>
      </p>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-700">
            <th></th>
            <th>Name</th>
            <th className="text-center">Department</th>
            <th className="text-center">Total Tickets</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No agents found
              </td>
            </tr>
          ) : (
            data.map((agent, i) => (
              <tr key={i} className="text-sm">
                <td className="py-2">{i + 1}</td>
                <td className="flex items-center gap-2 py-2">
                  <img
                    src={agent.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  {agent.name}
                </td>
                <td className="text-center">{agent.department || "-"}</td>
                <td className="text-center">{agent.totalTickets ?? 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsTableCard;
