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

const StatsCard = () => {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="flex items-end sm:items-start">
        <div className="flex flex-col gap-6 sm:gap-3 text-right text-[10px] sm:text-sm leading-none sm:leading-normal">
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        <div className="border w-full h-40 ml-2 sm:ml-4 rounded-2xl sm:rounded-3xl">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="Net" dot={false} stroke="#101FA1" strokeWidth={3} />
              <Line type="monotone" dataKey="Loss" dot={false} stroke="#EF4000" strokeWidth={3} />
              <Line type="monotone" dataKey="Wins" dot={false} stroke="#3CD856" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap gap-2  sm:gap-1 justify-center text-[10px] sm:text-sm mt-2 sm:ml-10">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sept</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>

      <div className="flex flex-wrap gap-6 sm:gap-20 mt-4 justify-center sm:justify-start sm:ml-10 text-[10px] sm:text-base">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#101FA1]"></span>
          Net
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#EF4000]"></span>
          Loss
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 sm:w-4 sm:h-4 inline-block bg-[#3CD856]"></span>
          Wins
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
