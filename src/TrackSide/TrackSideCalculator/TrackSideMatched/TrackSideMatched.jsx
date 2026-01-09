import React, { useState, useMemo } from "react";
import TrackSideLayout from "../../TrackSideLayout/TrackSideLayout";

function TrackSideMatched() {
     const [backOdds, setBackOdds] = useState("");
      const [hedgeOdds, setHedgeOdds] = useState("");
      const [stake, setStake] = useState("");
  
      // Hedge Stake Formula
      const hedgeStake = useMemo(() => {
          if (!backOdds || !hedgeOdds || !stake) return 0;
          return (stake * backOdds) / hedgeOdds;
      }, [backOdds, hedgeOdds, stake]);
  
      // If back wins
      const payoutBackWins = useMemo(() => {
          if (!stake || !backOdds) return 0;
          return stake * backOdds - hedgeStake * hedgeOdds;
      }, [stake, backOdds, hedgeStake, hedgeOdds]);
  
      // If hedge wins
      const payoutHedgeWins = useMemo(() => {
          if (!stake || !hedgeStake) return 0;
          return hedgeStake - stake;
      }, [stake, hedgeStake]);
  
      // Profit (guaranteed)
      const profit = useMemo(() => {
          return (payoutBackWins + payoutHedgeWins) / 2;
      }, [payoutBackWins, payoutHedgeWins]);
  
      // Retention %
      const retention = useMemo(() => {
          if (!stake) return 0;
          return (profit / stake) * 100;
      }, [profit, stake]);
  
      const fmt = (v) => (v && !isNaN(v) ? Number(v).toFixed(2) : "0.00");
  return (
    <>
         <TrackSideLayout>
       <div className="min-h-screen bg-[#262626] text-gray-100 px-6 py-8">
                    <div className="max-w-6xl mx-auto">

                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold">Matched Betting Calculator</h1>
                            <p className="text-sm text-green-300 mt-1">Simple Back &amp; Hedge Calculator</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-full lg:col-span-2">
                                <div className="bg-black rounded-lg p-5 shadow-md border border-gray-800">

                                    {/* Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                        <div>
                                            <label className="text-xs text-gray-300">BACK ODDS</label>
                                            <input
                                                type="number"
                                                value={backOdds}
                                                onChange={(e) => setBackOdds(Number(e.target.value))}
                                                className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs text-gray-300">HEDGE ODDS</label>
                                            <input
                                                type="number"
                                                value={hedgeOdds}
                                                onChange={(e) => setHedgeOdds(Number(e.target.value))}
                                                className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs text-gray-300">STAKE ($)</label>
                                            <input
                                                type="number"
                                                value={stake}
                                                onChange={(e) => setStake(Number(e.target.value))}
                                                className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                            />
                                        </div>

                                    </div>

                                    {/* Results */}
                                    <div className="mt-6 bg-[#0f0f0f] p-4 rounded border border-gray-800">
                                        <h3 className="text-lg font-semibold mb-3">Results</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Hedge Stake</div>
                                                <div className="text-xl font-bold mt-1">${fmt(hedgeStake)}</div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Profit (Back Wins)</div>
                                                <div className="text-xl font-bold mt-1">${fmt(payoutBackWins)}</div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Profit (Hedge Wins)</div>
                                                <div className="text-xl font-bold mt-1">${fmt(payoutHedgeWins)}</div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Guaranteed Profit</div>
                                                <div className="text-xl font-bold mt-1 text-green-400">${fmt(profit)}</div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Retention %</div>
                                                <div className="text-xl font-bold mt-1">{fmt(retention)}%</div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Description Document (your text) */}
                                    <div className="mt-12 text-gray-100 space-y-6 leading-relaxed max-w-4xl">

                                        <h2 className="text-3xl font-bold">Punt Data – Matched Betting Calculator</h2>
                                        <p className="text-gray-300 text-[15px]">
                                            The Punt Data Matched Betting Calculator helps you turn bookmaker promotions 
                                            into steady, predictable returns. Enter your odds and stake and the calculator 
                                            tells you exactly how much to place on each side so you can lock in a result 
                                            without relying on luck.
                                        </p>

                                        <h3 className="text-2xl font-bold mt-10">What Is Matched Betting</h3>
                                        <p className="text-gray-300 text-[15px]">
                                            Matched betting uses two bets on opposite outcomes to remove risk. You back one outcome 
                                            with the bookmaker, then place a hedge bet on the other outcome. No matter who wins, 
                                            the payouts balance out.
                                        </p>

                                        <h3 className="text-2xl font-bold mt-10">Responsible Gambling</h3>
                                        <p className="text-gray-300 text-[15px]">
                                            Use promotions wisely. Stay in control. Bet within your limits.
                                        </p>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </TrackSideLayout>
    </>
  )
}

export default TrackSideMatched