import React, { useState, useEffect } from 'react';
import TrackSideLayout from "../../TrackSideLayout/TrackSideLayout";
import SubscriptionGuard from "../../../Component/SubscriptionGuard";
function TrackSideBouns() {
    const [backOdds, setBackOdds] = useState("");
    const [layOdds, setLayOdds] = useState("");
    const [commission, setCommission] = useState("");
    const [bonusStake, setBonusStake] = useState("");

        const [layStake, setLayStake] = useState(0);
        const [profit, setProfit] = useState(0);
        const [liability, setLiability] = useState(0);
        const [retentionPct, setRetentionPct] = useState(0);
        const [oddsFormat, setOddsFormat] = useState('decimal');
    
        // Helper: clamp inputs
        const toNum = v => {
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        };
    
         useEffect(() => {
               const B = Number(bonusStake);
               const bonusOdds = Number(backOdds);   // using same field name
               const hedgeOdds = Number(layOdds);    // using same field name
       
               if (!B || !bonusOdds || !hedgeOdds || hedgeOdds <= 1 || bonusOdds <= 1) {
                   setLayStake(0);
                   setProfit(0);
                   setLiability(0);
                   setRetentionPct(0);
                   return;
               }
       
               // Punt Data Calculator Formulas:
       
               // 1. Bonus profit (stake not returned)
               const bonusProfit = (bonusOdds - 1) * B;
       
               // 2. Hedge stake
               const hedgeStake = bonusProfit / (hedgeOdds - 1);
       
               // 3. Hedge payout
               const hedgePayout = hedgeStake * (hedgeOdds - 1);
       
               // 4. Guaranteed profit (same for either winner)
               const guaranteedProfit = bonusProfit - hedgeStake;
       
               // 5. Retention %
               const retention = (guaranteedProfit / B) * 100;
       
               // Update UI values
               setLayStake(+hedgeStake.toFixed(2));
               setLiability(+hedgePayout.toFixed(2)); // showing hedge payout here
               setProfit(+guaranteedProfit.toFixed(2));
               setRetentionPct(+retention.toFixed(2));
       
           }, [bonusStake, backOdds, layOdds]);
    
  return (
    <>
    <TrackSideLayout>
    <SubscriptionGuard>
       <div className="min-h-screen flex items-center justify-center bg-[#262626] p-6 text-gray-100">
                <div className="max-w-6xl w-full bg-black rounded-2xl shadow-2xl p-6">
                    <h1 className="text-xl font-bold mb-3">Bonus Bet Hedge Calculator</h1>
                    <p className="text-sm text-gray-400 mb-6">Dark theme — enter your free-bet details and this calculator will give the lay stake, liability, guaranteed profit and retention % (for free bets where the stake is not returned).</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-xs text-gray-300 mb-1">Bonus stake (e.g. 50)</span>
                            <input type="number" value={bonusStake} onChange={e => setBonusStake(e.target.value)} className="bg-[#262626] rounded p-2 text-gray-100" />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-xs text-gray-300 mb-1">Odds format</span>
                            <select value={oddsFormat} onChange={e => setOddsFormat(e.target.value)} className="bg-[#262626] rounded p-2 text-gray-100">
                                <option value="decimal">Decimal (recommended)</option>
                                <option value="fractional">Fractional (enter as a decimal for now)</option>
                                <option value="american">American (enter as decimal for now)</option>
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span className="text-xs text-gray-300 mb-1">Back odds (decimal)</span>
                            <input type="number" step="0.01" value={backOdds} onChange={e => setBackOdds(e.target.value)} className="bg-[#262626] rounded p-2 text-gray-100" />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-xs text-gray-300 mb-1">Lay odds (decimal)</span>
                            <input type="number" step="0.01" value={layOdds} onChange={e => setLayOdds(e.target.value)} className="bg-[#262626] rounded p-2 text-gray-100" />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-xs text-gray-300 mb-1">Exchange commission (%)</span>
                            <input type="number" step="0.1" value={commission} onChange={e => setCommission(e.target.value)} className="bg-[#262626] rounded p-2 text-gray-100" />
                        </label>

                        <div className="flex items-end">
                            <button onClick={() => { setBonusStake(50); setBackOdds(3); setLayOdds(3.2); setCommission(5); }} className="ml-auto bg-teal-500 hover:bg-teal-400 text-gray-900 font-semibold px-4 py-2 rounded">Reset</button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#262626] p-4 rounded">
                            <div className="text-xs text-gray-400">Suggested lay stake</div>
                            <div className="text-2xl font-bold">{layStake === 0 ? '-' : `£${layStake}`}</div>
                        </div>

                        <div className="bg-[#262626] p-4 rounded">
                            <div className="text-xs text-gray-400">Liability (if lay loses)</div>
                            <div className="text-2xl font-bold">{liability === 0 ? '-' : `£${liability}`}</div>
                        </div>

                        <div className="bg-[#262626] p-4 rounded">
                            <div className="text-xs text-gray-400">Guaranteed profit (approx.)</div>
                            <div className="text-2xl font-bold">{profit === 0 ? '-' : `£${profit}`}</div>
                            <div className="text-xs text-gray-400 mt-1">Retention: {retentionPct === 0 ? '-' : `${retentionPct}% of bonus`}</div>
                        </div>
                    </div>

                     <div className="mt-6 text-sm text-gray-300 bg-gray-850 p-4 rounded">
                            <strong>Punt Data – Bonus Bet Calculator</strong>
                            <p className="mt-2 text-gray-400">
                                Welcome to the Punt Data bonus bet calculator. This tool shows you the simplest way to turn a bookmaker
                                bonus bet into real money. If you have a $50 bonus bet or any other promo, the calculator works out exactly
                                how much to stake on the other outcome so you can lock in a return.
                            </p>
                        </div>

                        <div className="mt-6 text-sm text-gray-300 leading-relaxed">

                            <h2 className="text-lg font-bold mb-2">What is a Bonus Bet?</h2>
                            <p className="text-gray-400">
                                A bonus bet is a promo credit from a bookmaker. You cannot withdraw the bonus itself, but you can use it
                                to win real money. If your bonus bet wins, you only receive the profit, not the stake. For example, a $50
                                bonus at $2.40 returns $70 profit — not $120. Because the stake does not return, you need the correct
                                hedge bet. The Punt Data calculator handles all the maths for you.
                            </p>

                            <h2 className="text-lg font-bold mt-4 mb-2">Why Use the Bonus Bet Calculator?</h2>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Work out the exact hedge stake</li>
                                <li>Lock in a return no matter who wins</li>
                                <li>See your payouts instantly</li>
                                <li>Understand your retention percentage</li>
                                <li>Turn more of your bonus into real cash</li>
                            </ul>

                            <h2 className="text-lg font-bold mt-6 mb-2">How to Use the Calculator</h2>
                            <p className="text-gray-400">Enter your:</p>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Bonus Odds</li>
                                <li>Hedge Odds</li>
                                <li>Bonus Amount</li>
                            </ul>
                            <p className="text-gray-400 mt-2">Press calculate — you will instantly see:</p>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Hedge stake</li>
                                <li>Payouts</li>
                                <li>Total profit</li>
                                <li>Retention %</li>
                            </ul>

                            <h2 className="text-lg font-bold mt-6 mb-2">What Is Bonus Bet Retention?</h2>
                            <p className="text-gray-400">
                                Retention is how much of your bonus becomes real cash after hedging.
                                Example: If a $50 bonus returns $28.82 profit, retention is 57.64%.
                                Higher retention means better value.
                            </p>

                            <h2 className="text-lg font-bold mt-6 mb-2">Example: Simple Basketball Match</h2>
                            <p className="text-gray-400">
                                A match with two outcomes. One team pays $2.40, the other $1.70.
                            </p>

                            <p className="mt-2 text-gray-300 font-semibold">Inputs</p>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Bonus Odds: 2.40</li>
                                <li>Hedge Odds: 1.70</li>
                                <li>Bonus Amount: $50</li>
                            </ul>

                            <p className="mt-4 text-gray-300 font-semibold">Outputs</p>
                            <p className="text-gray-400 mt-1"><strong>Bonus Bet @ 2.40</strong></p>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Stake: $50</li>
                                <li>Profit: $70</li>
                            </ul>

                            <p className="text-gray-400 mt-3"><strong>Hedge Bet @ 1.70</strong></p>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Stake: $41.18</li>
                                <li>Payout: $70</li>
                            </ul>

                            <h2 className="text-lg font-bold mt-6 mb-2">Guaranteed Result</h2>
                            <ul className="list-disc ml-5 text-gray-400">
                                <li>Total profit: $28.82</li>
                                <li>Retention: 57.64%</li>
                            </ul>

                            <p className="text-gray-400 mt-4">
                                The aim is simple — use the bonus to create a return, protect yourself with a hedge, and walk away with
                                real profit.
                            </p>

                            <h2 className="text-lg font-bold mt-6 mb-2">Responsible Gambling Message</h2>
                            <p className="text-gray-400">
                                Punt Data encourages responsible gambling. Set limits, stay in control, and only bet what you can afford
                                to lose. If gambling becomes a problem, help is available at Gambling Help Online or 1800 858 858.
                            </p>
                        </div>
                </div>

            </div>
            </SubscriptionGuard>
            </TrackSideLayout>
    </>
  )
}

export default TrackSideBouns