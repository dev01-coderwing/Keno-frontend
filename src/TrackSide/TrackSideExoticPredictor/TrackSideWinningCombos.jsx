import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverdueCombos } from "../../redux/overdueSlice";
import RaceCard from "../../Component/Cards/RaceCard";
function TrackSideWinningCombos() {

     const dispatch = useDispatch();
      const scrollRef = useRef(null);
      const { combos, loading, error } = useSelector((state) => state.overdue);
    
      const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
      };
    
      const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
      };
    
      useEffect(() => {
        dispatch(
          fetchOverdueCombos({
            betType: "Trifecta",
            minRacesSinceLastOccurrence: 100,
            noOfCombinations: 5,
            location: "ACT",
          })
        );
      }, [dispatch]);
  return (
    <>
    
      <div className="bg-[#1D1D1D] p-4 sm:p-6 rounded-lg w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
        Overdue Winning Combos
      </h3>
      <p className="text-xs sm:text-sm font-extralight text-gray-300 mb-4">
        These popular combos usually hit often, but they haven’t in a while.
      </p>

      {loading && <p className="text-gray-400 text-sm">Loading combos...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
        >
          &#10094;
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
        >
          &#10095;
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
        >
          {combos.length > 0 ? (
            combos.map((combo, index) => (
              <div key={index} className="flex-shrink-0 w-72 sm:w-full">
                <RaceCard
                  stats={[
                    { label: "Avg. every", value: `${combo.avgEvery} races` },
                    { label: "Last seen", value: `${combo.lastSeen} races` },
                  ]}
                />
              </div>
            ))
          ) : (
            !loading && (
              <p className="text-gray-400 text-sm">No combos found.</p>
            )
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default TrackSideWinningCombos