import React, { useState, useMemo } from "react";
import TrackSideLayout from "../../TrackSideLayout/TrackSideLayout";

function TrackSideArbitrage() {

     const [outcomes, setOutcomes] = useState(2);
    const [odds, setOdds] = useState(["", "", ""]);
    const [totalStake, setTotalStake] = useState("");
    const [labels, setLabels] = useState(["", "", ""]);
    
    
        function updateOdd(index, value) {
            const next = [...odds];
            next[index] = Number(value || 0);
            setOdds(next);
        }
    
        function updateLabel(index, value) {
            const next = [...labels];
            next[index] = value;
            setLabels(next);
        }
    
        const effectiveOdds = useMemo(() => odds.slice(0, outcomes), [odds, outcomes]);
    
        const impliedProbabilities = useMemo(() => {
            return effectiveOdds.map((o) => (o > 0 ? 1 / o : 0));
        }, [effectiveOdds]);
    
        const sumImplied = useMemo(() => {
            return impliedProbabilities.reduce((a, b) => a + b, 0);
        }, [impliedProbabilities]);
    
        const isArb = sumImplied > 0 && sumImplied < 1;
    
        // Recommended stakes proportionally: stake_i = ( (1/odd_i) / sumImplied ) * totalStake
        const recommendedStakes = useMemo(() => {
            if (!totalStake || totalStake <= 0) return effectiveOdds.map(() => 0);
            const stakes = impliedProbabilities.map((p) => (p / sumImplied) * Number(totalStake || 0));
            return stakes;
        }, [impliedProbabilities, sumImplied, totalStake]);
    
        // Profit calculation: For each outcome, payout = stake_i * odd_i. Profit = payout - totalStake
        const payouts = useMemo(() => {
            return recommendedStakes.map((s, i) => s * effectiveOdds[i]);
        }, [recommendedStakes, effectiveOdds]);
    
        const profits = useMemo(() => {
            return payouts.map((p) => p - Number(totalStake || 0));
        }, [payouts, totalStake]);
    
        const minProfit = useMemo(() => {
            if (profits.length === 0) return 0;
            return Math.min(...profits);
        }, [profits]);
    
        function reset() {
            setOutcomes(2);
            setOdds([1.8, 2.2, 0]);
            setTotalStake(100);
            setLabels(["Outcome A", "Outcome B", "Outcome C"]);
        }
  return (
    <>
    <TrackSideLayout>
          <div className="bg-[#262626] min-h-screen">
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-black text-gray-100 rounded-2xl shadow-lg p-6 ring-1 ring-white/5">
                    <h2 className="text-2xl font-semibold mb-2">Arbitrage Calculator</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Enter the decimal odds for each outcome and a total stake. The calculator shows whether an arbitrage
                        opportunity exists and recommends how to split your stake to lock in profit.
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                        <label className="flex items-center gap-2 text-sm">
                            <span className="text-gray-300">Outcomes</span>
                            <select
                                value={outcomes}
                                onChange={(e) => setOutcomes(Number(e.target.value))}
                                className="bg-[#262626] text-gray-100 rounded px-2 py-1 text-sm focus:outline-none"
                            >
                                <option value={2}>2-way</option>
                                <option value={3}>3-way</option>
                            </select>
                        </label>

                        <label className="ml-auto text-sm text-gray-300">Total Stake (₹)
                            <input
                                type="number"
                                min={1}
                                step="0.01"
                                value={totalStake}
                                onChange={(e) => setTotalStake(e.target.value)}
                                className="ml-2 w-28 bg-[#262626] text-gray-100 rounded px-2 py-1 text-sm focus:outline-none"
                            />
                        </label>
                    </div>

                    <div className="space-y-3">
                        {Array.from({ length: outcomes }).map((_, i) => (
                            <div key={i} className="grid grid-cols-12 gap-2 items-center">
                                <input
                                    className="col-span-5 bg-[#262626] text-gray-100 rounded px-3 py-2 text-sm focus:outline-none"
                                    value={labels[i]}
                                    onChange={(e) => updateLabel(i, e.target.value)}
                                    placeholder={`Outcome ${i + 1}`}
                                />

                                <input
                                    className={`col-span-3 bg-[#262626] text-gray-100 rounded px-3 py-2 text-sm focus:outline-none ${effectiveOdds[i] <= 0 ? "border border-red-500" : ""
                                        }`}
                                    value={effectiveOdds[i] || ""}
                                    onChange={(e) => updateOdd(i, e.target.value)}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Decimal odds (e.g. 2.15)"
                                />

                                <div className="col-span-4 text-right text-sm text-gray-400">
                                    <div>Implied: <span className="text-gray-200">{(impliedProbabilities[i] * 100 || 0).toFixed(2)}%</span></div>
                                    <div>Stake: <span className="text-gray-200">{(recommendedStakes[i] || 0).toFixed(2)}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#262626] rounded p-4">
                            <div className="text-xs text-gray-400">Sum of implied probabilities</div>
                            <div className="text-lg font-medium mt-1">{(sumImplied * 100).toFixed(4)}%</div>
                        </div>

                        <div className="bg-[#262626] rounded p-4">
                            <div className="text-xs text-gray-400">Arbitrage?</div>
                            <div className={`text-lg font-medium mt-1 ${isArb ? 'text-green-400' : 'text-red-400'}`}>
                                {isArb ? 'YES' : 'NO'}
                            </div>
                        </div>

                        <div className="bg-[#262626] rounded p-4">
                            <div className="text-xs text-gray-400">Estimated min profit</div>
                            <div className={`text-lg font-medium mt-1 ${minProfit > 0 ? 'text-green-300' : 'text-yellow-300'}`}>
                                {isNaN(minProfit) ? '—' : `${minProfit.toFixed(2)} (${((minProfit / totalStake) * 100).toFixed(2)}%)`}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-[#262626] p-4 rounded">
                        <h3 className="text-sm text-gray-300 mb-2">Outcome Payouts & Profit</h3>
                        <div className="space-y-2">
                            {Array.from({ length: outcomes }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between text-sm text-gray-200">
                                    <div className="truncate">{labels[i]}</div>
                                    <div className="text-right">
                                        <div>Payout: <span className="font-medium">{(payouts[i] || 0).toFixed(2)}</span></div>
                                        <div>Profit: <span className={`font-medium ${profits[i] > 0 ? 'text-green-300' : 'text-yellow-300'}`}>{(profits[i] || 0).toFixed(2)}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => navigator.clipboard?.writeText(JSON.stringify({ outcomes, odds: effectiveOdds, totalStake }))}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white text-sm shadow-sm"
                        >
                            Copy Snapshot
                        </button>

                        <button
                            onClick={() => {
                                // Quick adjust: round stakes to 2 decimals while preserving total
                                const rounded = recommendedStakes.map((s) => Math.floor(s * 100) / 100);
                                const diff = Number(totalStake) - rounded.reduce((a, b) => a + b, 0);
                                // distribute remaining cents to largest odd
                                const idx = rounded.reduce((bestIdx, cur, i) => (cur > rounded[bestIdx] ? i : bestIdx), 0);
                                rounded[idx] += diff;
                                // set as a temporary alert for user
                                alert('Rounded stakes: ' + rounded.map((r) => r.toFixed(2)).join(', '));
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm shadow-sm"
                        >
                            Quick Round Stakes
                        </button>

                        <button
                            onClick={reset}
                            className="ml-auto px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-sm shadow-sm"
                        >
                            Reset
                        </button>
                    </div> */}

                    <div className="mt-5 text-xs text-gray-500">
                        Notes: Odds must be decimal (e.g., 2.5). This calculator provides estimated stakes based on implied
                        probabilities; real-world use should consider bookmaker limits, commissions, and timing.
                    </div>
                     {/* Description Section */}
            <div className="mt-10  text-gray-100 rounded-2xl shadow-lg p-6 ring-1 ring-white/5 space-y-6">
                <h2 className="text-2xl font-semibold">What this Arbitrage Calculator does</h2>
                <p className="text-gray-300 text-sm">Our arbitrage calculator is a powerful tool designed to help you calculate and optimize your bets. With it, you can easily determine the right stake amount for each outcome whenever an arbitrage betting opportunity appears.</p>

                <h3 className="text-xl font-semibold">How to Use the Arbitrage Calculator</h3>
                <p className="text-gray-300 text-sm">Enter decimal odds, total stake, and the calculator will instantly show implied probability, recommended stake, and guaranteed profit.</p>

                <h3 className="text-xl font-semibold">What is Arbitrage Betting?</h3>
                <p className="text-gray-300 text-sm">Arbitrage betting (surebet) is a strategy where you place bets on all possible outcomes using different bookmakers to lock in guaranteed profit.</p>

                <h3 className="text-xl font-semibold">Why Do Arbitrage Bets Exist?</h3>
                <p className="text-gray-300 text-sm">They exist due to odds differences, market imbalance, slow updates from bookmakers, and global variance.</p>

                <h3 className="text-xl font-semibold">Example of an Arbitrage Bet</h3>
                <p className="text-gray-300 text-sm">If odds are 2.10 and 2.15, implied probability becomes less than 100%, creating a surebet opportunity.</p>

                <h3 className="text-xl font-semibold">How to Find Arbitrage Opportunities</h3>
                <p className="text-gray-300 text-sm">Monitor sportsbook odds, use comparison websites, scanners, or this calculator to identify opportunities.</p>

                <h3 className="text-xl font-semibold">Benefits of Using an Arbitrage Tool</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Saves time</li>
                    <li>Removes calculation mistakes</li>
                    <li>Maximizes guaranteed profit</li>
                    <li>Works for 2-way & 3-way markets</li>
                </ul>

                <h3 className="text-xl font-semibold">Start Your Arbitrage Betting Journey</h3>
                <p className="text-gray-300 text-sm">Use this calculator to test different odds and see if profit is possible. Arbitrage betting can give stable returns with proper strategy.</p>
            </div>
                </div>
            </div>
            
       </div>    
       </TrackSideLayout>
    </>
  )
}

export default TrackSideArbitrage