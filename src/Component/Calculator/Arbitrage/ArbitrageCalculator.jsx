import React, { useState, useMemo } from "react";
import Layout from "../../../Layout/Layout";
import SubscriptionGuard from "../../../Component/SubscriptionGuard";


export default function ArbitrageCalculator() {
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

    // ---------------------------
    // IMPLIED PROBABILITIES (same as document)
    // ---------------------------
    const impliedProbabilities = useMemo(() => {
        return effectiveOdds.map((o) => (o > 0 ? 1 / o : 0));
    }, [effectiveOdds]);

    const sumImplied = useMemo(() => {
        return impliedProbabilities.reduce((a, b) => a + b, 0);
    }, [impliedProbabilities]);

    const isArb = sumImplied < 1;


    // -------------------------------------------------
    // ⭐ NEW DOCUMENT-BASED STAKE SPLIT FORMULA (2-WAY)
    // -------------------------------------------------
    const recommendedStakes = useMemo(() => {
        if (!totalStake || totalStake <= 0 || effectiveOdds.length < 2)
            return effectiveOdds.map(() => 0);

        const A = effectiveOdds[0];
        const B = effectiveOdds[1];
        const T = Number(totalStake);

        // Stake on outcome A
        const SA = T / (1 + A / B);

        // Stake on outcome B
        const SB = T - SA;

        return [SA, SB];
    }, [effectiveOdds, totalStake]);


    // ---------------------------------------------
    // ⭐ NEW PAYOUTS (Same payout for both outcomes)
    // ---------------------------------------------
    const payouts = useMemo(() => {
        return recommendedStakes.map((stake, i) => stake * effectiveOdds[i]);
    }, [recommendedStakes, effectiveOdds]);


    // ---------------------------------------------
    // ⭐ NEW PROFIT CALCULATION
    // ---------------------------------------------
    const profits = useMemo(() => {
        return payouts.map((payout) => payout - Number(totalStake));
    }, [payouts, totalStake]);


    const minProfit = useMemo(() => {
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
         <Layout >
                <SubscriptionGuard>
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

                        <label className="ml-auto text-sm text-gray-300">Total Stake ($)
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
    Notes: Odds must be decimal (e.g., 2.5). Arbitrage opportunities depend on finding the highest prices for each
    outcome. Always double-check bookmaker limits and timing.
</div>

{/* Description Section */}
<div className="mt-10 text-gray-100 rounded-2xl shadow-lg p-6 ring-1 ring-white/5 space-y-6">

    <h2 className="text-2xl font-semibold">Punt Data – Arbitrage Calculator</h2>
    <p className="text-gray-300 text-sm">
        The Punt Data Arbitrage Calculator shows you how to lock in a profit by backing different outcomes when
        the odds create a guaranteed margin. Arbitrage betting is not about guessing winners — it is about using
        differences in prices to secure a return no matter what happens. The idea is simple: win, not lose.
    </p>

    <h3 className="text-xl font-semibold">What Is Arbitrage Betting?</h3>
    <p className="text-gray-300 text-sm">
        Arbitrage betting (arbing) happens when odds vary enough across different places that you can cover all
        outcomes and still make a profit. You place one bet on Outcome A and another bet on Outcome B. If the odds
        are high enough across both sides, you can guarantee a return. You are not predicting results — you are
        using maths and price differences to your advantage.
    </p>

    <h3 className="text-xl font-semibold">How to Find the Highest Odds</h3>
    <p className="text-gray-300 text-sm">
        Arbitrage only works when you use the best possible odds for each outcome. Prices for the same event can
        vary, and these variations create the opportunity.
    </p>

    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        <li>Find the highest odds for Outcome A</li>
        <li>Find the highest odds for Outcome B</li>
        <li>Enter both odds into the calculator</li>
        <li>Stake exactly as shown</li>
        <li>Lock in a guaranteed return</li>
    </ul>

    <p className="text-gray-300 text-sm">No guessing. No predictions. Just maths.</p>

    <h3 className="text-xl font-semibold">Why Use the Punt Data Arbitrage Calculator?</h3>
    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        <li>Finds the exact stake split for each outcome</li>
        <li>Shows your total outlay</li>
        <li>Shows your guaranteed return</li>
        <li>Simple and accurate</li>
        <li>No complex formulas needed</li>
    </ul>

    <h3 className="text-xl font-semibold">How to Use the Calculator</h3>
    <p className="text-gray-300 text-sm">Enter:</p>
    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        <li>The odds for Outcome A</li>
        <li>The odds for Outcome B</li>
        <li>Your total stake</li>
    </ul>
    <p className="text-gray-300 text-sm">
        Press Calculate — you will instantly see how much to stake on each outcome, your total spend, and your
        locked-in profit.
    </p>

    <h3 className="text-xl font-semibold">Why People Use Arbitrage Betting</h3>
    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        <li>Removes risk</li>
        <li>Takes advantage of price differences</li>
        <li>Works on any two-outcome market</li>
        <li>Pure mathematics</li>
        <li>No guesswork</li>
    </ul>

    <h3 className="text-xl font-semibold">Responsible Gambling</h3>
    <p className="text-gray-300 text-sm">
        Always stay in control. Bet within your limits. If gambling becomes a problem, visit Gambling Help Online
        or call 1800 858 858.
    </p>

</div>

                </div>
            </div>
            
       </div>   
                </SubscriptionGuard> 
</Layout>
        </>
    );
}
