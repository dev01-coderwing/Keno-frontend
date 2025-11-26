import React from "react";

const LiveRaceCard = () => {
  const label = "LIVE Race";
  const time = "11h";
  const numbers = [12, 15, 44, 19, 19, 12, 15, 44];

  return (
    <div className=" p-4 rounded-xl w-full max-w-2xl">
      <div className="flex gap-8 items-center mb-2 pb-2 border-b border-gray-500">
        <h3 className="text-lg font-semibold">{label}</h3>
            <span
              className="text-sm font-semibold px-2 py-1 text-black rounded bg-green-400 ">
                LIVE
            </span>
      </div>

   <div className="flex gap-20 max-w-sm">
      <div className="p-8 border-r border-gray-500 ">
         <div className="text-sm text-gray-400 mb-1 font-semibold">Time</div>
      <div className="text-white font-medium text-xl mb-3">{time}</div>
      </div>

     <div className="px-4 py-8">
       <div className="text-sm text-gray-400 mb-1 font-semibold">Numbers</div>
      <div className="flex flex-wrap gap-2">
        {numbers.map((num, index) => (
          <span
            key={index}
            className="bg-white text-black text-sm font-medium px-2 py-1 rounded-md"
          >
            {num}
          </span>
        ))}
      </div>
     </div>
   </div>
    </div>
  );
};

export default LiveRaceCard;
