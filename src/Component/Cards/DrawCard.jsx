import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingDraw } from "../../redux/betComparisonSlice";

const DrawCard = () => {
  const dispatch = useDispatch();

  const { countdownSeconds } = useSelector(
    (state) => state.betComparison
  );

  const [timeLeft, setTimeLeft] = useState(0);

  // API call
  useEffect(() => {
    dispatch(fetchUpcomingDraw());
  }, [dispatch]);

  // API se aaya hua countdown set
  useEffect(() => {
    if (typeof countdownSeconds === "number") {
      setTimeLeft(countdownSeconds);
    }
  }, [countdownSeconds]);

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  return (
    <div className="flex justify-center items-center h-[72%] border-b border-1">
      <div className="bg-[#000] p-4 rounded-lg">
        <div className="text-3xl text-red-500">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default DrawCard;
