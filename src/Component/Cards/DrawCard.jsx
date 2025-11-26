import React, { useState, useEffect } from "react";

const DrawCard = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 55 * 60 + 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  return (
    <div className="flex justify-center items-center h-[72%] border-b border-1">
      <div className="bg-[#000] p-4 rounded-lg ">
        <div className="text-3xl text-red-500">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default DrawCard;
