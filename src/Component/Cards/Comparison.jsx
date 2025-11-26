import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Standard: 4000, Exotic: 2400 },
  { name: "Feb", Standard: 3000, Exotic: 1398 },
  { name: "Mar", Standard: 2000, Exotic: 9800 },
  { name: "Apr", Standard: 2780, Exotic: 3908 },
  { name: "May", Standard: 1890, Exotic: 4800 },
  { name: "Jun", Standard: 2390, Exotic: 3800 },
  { name: "Jul", Standard: 3490, Exotic: 4300 },
];

const Comparison = () => {
  return (
    <div className="bg-[#131313] py-4  border-b">
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <Tooltip />
          <Area type="monotone" dataKey="Standard" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
          <Area type="monotone" dataKey="Exotic" stroke="#00FF7F" fill="#00FF7F" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Comparison;
