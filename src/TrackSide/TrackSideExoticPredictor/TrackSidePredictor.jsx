import React from "react";
import CombinationGenerator from "./TrackSideCombinationGenerator";
import WinningCombos from "./TrackSideWinningCombos";
import HistoricalFrequency from "./TrackSideHistoricalFrequency";
import TrackSideLayout from "../TrackSideLayout/TrackSideLayout";
import SubscriptionGuard from "../../Component/SubscriptionGuard";
function TrackSidePredictor() {
  return (
    <>
        <TrackSideLayout>
    <SubscriptionGuard>
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
      </SubscriptionGuard>
    </TrackSideLayout>
    </>
  )
}

export default TrackSidePredictor