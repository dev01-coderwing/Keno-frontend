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
    return (
      <div className="h-full flex items-center justify-center text-white">
        Loading Current Draw...
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl w-full bg-[#191919] text-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
        <div>
          <h3 className="text-lg font-semibold">{draw}</h3>
          <p className="text-xs text-gray-400">Current Draw</p>
        </div>

        <div className="flex gap-2">
          {hotNumbers?.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500 text-white">
              HOT
            </span>
          )}
          {coldNumbers?.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500 text-white">
              COLD
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Time */}
        <div className="md:pr-6 md:border-r border-gray-700">
          <p className="text-sm text-gray-400 font-semibold mb-1">Time</p>
          <p className="text-white font-medium text-lg">{time}</p>
        </div>

        {/* Numbers */}
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2 font-semibold">
            Numbers
          </p>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {numbers?.map((num, index) => {
              const isHot = hotNumbers?.map(Number).includes(num);
              const isCold = coldNumbers?.map(Number).includes(num);

              return (
                <div
                  key={`${num}-${index}`}
                  className={`h-8 flex items-center justify-center rounded-md text-sm font-bold shadow
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDrawCard;
