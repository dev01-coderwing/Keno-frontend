import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotColdNumbers } from "../../redux/dashboardSlice";

const CurrentDrawCard = () => {
  const dispatch = useDispatch();

  const {
    draw,
    time,
    numbers,
    hotNumbers,
    coldNumbers,
    hotColdLoading,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchHotColdNumbers());
  }, [dispatch]);

  if (hotColdLoading) {
    return <div className="text-white p-4">Loading Current Draw...</div>;
  }

  return (
    <div className="p-4 rounded-xl w-full max-w-2xl bg-[#191919]">
      {/* Header */}
      <div className="flex gap-4 items-center mb-2 pb-2 border-b border-gray-500">
        <h3 className="text-lg font-semibold text-white">{draw}</h3>

        <div className="flex gap-2">
          {hotNumbers?.length > 0 && (
            <span className="text-sm font-semibold px-2 py-1 rounded bg-red-500 text-white">
              HOT
            </span>
          )}
          {coldNumbers?.length > 0 && (
            <span className="text-sm font-semibold px-2 py-1 rounded bg-blue-500 text-white">
              COLD
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-20 max-w-sm">
        {/* Time */}
        <div className="p-8 border-r border-gray-500">
          <div className="text-sm text-gray-400 mb-1 font-semibold">
            Time
          </div>
          <div className="text-white font-medium text-xl mb-3">
            {time}
          </div>
        </div>

        {/* Numbers */}
        {/* Numbers */}
{/* Numbers */}
<div className="px- py- flex-5 w-80">
  <div className="text-sm text-gray-400 mb-2 font-semibold">
    Numbers
  </div>

  <div className="grid grid-cols-6 gap-2">
  {numbers?.map((num, index) => {
    const isHot = hotNumbers?.map(Number).includes(num);
    const isCold = coldNumbers?.map(Number).includes(num);

    return (
      <span
        key={`${num}-${index}`}
        className={`text-sm font-semibold text-center py-1 rounded-md
          ${
            isHot
              ? "bg-red-500 text-white"
              : isCold
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }
        `}
      >
        {num}
      </span>
    );
  })}
</div>

</div>


      </div>
    </div>
  );
};

export default CurrentDrawCard;
