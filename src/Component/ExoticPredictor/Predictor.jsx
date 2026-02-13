import React from "react";
import CombinationGenerator from "./CombinationGenerator";
import WinningCombos from "./WinningCombos";
import HistoricalFrequency from "./HistoricalFrequency";

const Predictor = () => {
  return (
    <div className="bg-[#262626] py-6 px-4 sm:px-6 md:px-10 rounded-lg font-poppins w-full">
      <div className="text-center py-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">
          Hey! Try our Exotic Calculator Tool{" "}
        </h3>
        <p className="text-sm sm:text-base font-light text-gray-300">
          Uncover hidden value in exotic bets with data-driven insights.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <CombinationGenerator />
        <WinningCombos />
        <HistoricalFrequency />
      </div>
    </div>
  );
};

export default Predictor;
