import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const data = [
  { name: "Jan", Net: 320, Loss: 260, Wins: 300 },
  { name: "Feb", Net: 340, Loss: 240, Wins: 320 },
  { name: "Mar", Net: 330, Loss: 220, Wins: 310 },
  { name: "Apr", Net: 300, Loss: 200, Wins: 280 },
  { name: "May", Net: 280, Loss: 150, Wins: 250 },
  { name: "Jun", Net: 250, Loss: 220, Wins: 260 },
  { name: "Jul", Net: 310, Loss: 350, Wins: 300 },
  { name: "Aug", Net: 330, Loss: 370, Wins: 310 },
  { name: "Sept", Net: 300, Loss: 340, Wins: 320 },
  { name: "Oct", Net: 320, Loss: 310, Wins: 300 },
  { name: "Nov", Net: 300, Loss: 290, Wins: 280 },
  { name: "Dec", Net: 280, Loss: 250, Wins: 260 },
];

const TrendChart = () => {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="flex sm:flex-col gap-1 sm:gap-3 text-gray-400 text-[10px] sm:text-sm leading-none sm:leading-normal">
          <span className="hidden sm:inline">400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        <div className="border border-gray-400 w-full sm:h-40 h-36 ml-0 sm:ml-4 mt-2 sm:mt-0 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="Net" dot={false} stroke="#101FA1" strokeWidth={3} />
              <Line type="monotone" dataKey="Loss" dot={false} stroke="#EF4000" strokeWidth={3} />
              <Line type="monotone" dataKey="Wins" dot={false} stroke="#3CD856" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-2 justify-center text-gray-400 text-[10px] sm:text-sm mt-2">
        {data.map((item) => (
          <span key={item.name} className="w-[6%] text-center min-w-[20px]">
            {item.name}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-12 md:gap-20 mt-6 justify-center text-[10px] sm:text-base">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#101FA1] rounded-full"></span>
          Net
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#EF4000] rounded-full"></span>
          Loss
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#3CD856] rounded-full"></span>
          Wins
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
