import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const RaceCard = ({
  combination = "7-12-8-14",
  stats = [],
  summary = "40% since last 20 races",
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative bg-[#0E0E0E] text-white p-8 rounded-lg w-full max-w-xs flex flex-col gap-2 shrink-0">
      <div
        className="absolute top-3 right-3 cursor-pointer text-white text-lg bg-white/15 rounded-lg p-1"
        onClick={() => setLiked(!liked)}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>

      <div className="border-b pb-2 text-center">
        <h2 className="text-3xl font-semibold tracking-wide">{combination}</h2>
        <p className="text-sm font-semibold font-opensans">{summary}</p>
      </div>

      <div className="flex flex-col gap-1 text-xs font-opensans font-semibold mt-2">
        {stats.map((item, index) => (
          <div key={index} className="flex justify-between pb-1">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCard;
