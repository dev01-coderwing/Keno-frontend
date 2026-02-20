// import React, { useState, useMemo } from "react";
// import Layout from "../../../Layout/Layout";
// import SubscriptionGuard from "../../../Component/SubscriptionGuard";

// export default function MatchedBettingCalculator() {

//     const [backOdds, setBackOdds] = useState("");
//     const [hedgeOdds, setHedgeOdds] = useState("");
//     const [stake, setStake] = useState("");

//     // Hedge Stake Formula
//     const hedgeStake = useMemo(() => {
//         if (!backOdds || !hedgeOdds || !stake) return 0;
//         return (stake * backOdds) / hedgeOdds;
//     }, [backOdds, hedgeOdds, stake]);

//     // If back wins
//     const payoutBackWins = useMemo(() => {
//         if (!stake || !backOdds) return 0;
//         return stake * backOdds - hedgeStake * hedgeOdds;
//     }, [stake, backOdds, hedgeStake, hedgeOdds]);

//     // If hedge wins
//     const payoutHedgeWins = useMemo(() => {
//         if (!stake || !hedgeStake) return 0;
//         return hedgeStake - stake;
//     }, [stake, hedgeStake]);

//     // Profit (guaranteed)
//     const profit = useMemo(() => {
//         return (payoutBackWins + payoutHedgeWins) / 2;
//     }, [payoutBackWins, payoutHedgeWins]);

//     // Retention %
//     const retention = useMemo(() => {
//         if (!stake) return 0;
//         return (profit / stake) * 100;
//     }, [profit, stake]);

//     const fmt = (v) => (v && !isNaN(v) ? Number(v).toFixed(2) : "0.00");

//     return (
//         <>
//             <Layout>
//                 <SubscriptionGuard>
//                 <div className="min-h-screen bg-[#262626] text-gray-100 px-6 py-8">
//                     <div className="max-w-6xl mx-auto">

//                         <div className="text-center mb-8">
//                             <h1 className="text-3xl md:text-4xl font-bold">Matched Betting Calculator</h1>
//                             <p className="text-sm text-green-300 mt-1">Simple Back &amp; Hedge Calculator</p>
//                         </div>

//                         <div className="flex justify-center">
//                             <div className="w-full lg:col-span-2">
//                                 <div className="bg-black rounded-lg p-5 shadow-md border border-gray-800">

//                                     {/* Inputs */}
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//                                         <div>
//                                             <label className="text-xs text-gray-300">BACK ODDS</label>
//                                             <input
//                                                 type="number"
//                                                 value={backOdds}
//                                                 onChange={(e) => setBackOdds(Number(e.target.value))}
//                                                 className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="text-xs text-gray-300">HEDGE ODDS</label>
//                                             <input
//                                                 type="number"
//                                                 value={hedgeOdds}
//                                                 onChange={(e) => setHedgeOdds(Number(e.target.value))}
//                                                 className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="text-xs text-gray-300">STAKE ($)</label>
//                                             <input
//                                                 type="number"
//                                                 value={stake}
//                                                 onChange={(e) => setStake(Number(e.target.value))}
//                                                 className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
//                                             />
//                                         </div>

//                                     </div>

//                                     {/* Results */}
//                                     <div className="mt-6 bg-[#0f0f0f] p-4 rounded border border-gray-800">
//                                         <h3 className="text-lg font-semibold mb-3">Results</h3>

//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

//                                             <div className="p-3 bg-[#262626] rounded">
//                                                 <div className="text-xs text-gray-400">Hedge Stake</div>
//                                                 <div className="text-xl font-bold mt-1">${fmt(hedgeStake)}</div>
//                                             </div>

//                                             <div className="p-3 bg-[#262626] rounded">
//                                                 <div className="text-xs text-gray-400">Profit (Back Wins)</div>
//                                                 <div className="text-xl font-bold mt-1">${fmt(payoutBackWins)}</div>
//                                             </div>

//                                             <div className="p-3 bg-[#262626] rounded">
//                                                 <div className="text-xs text-gray-400">Profit (Hedge Wins)</div>
//                                                 <div className="text-xl font-bold mt-1">${fmt(payoutHedgeWins)}</div>
//                                             </div>

//                                             <div className="p-3 bg-[#262626] rounded">
//                                                 <div className="text-xs text-gray-400">Guaranteed Profit</div>
//                                                 <div className="text-xl font-bold mt-1 text-green-400">${fmt(profit)}</div>
//                                             </div>

//                                             <div className="p-3 bg-[#262626] rounded">
//                                                 <div className="text-xs text-gray-400">Retention %</div>
//                                                 <div className="text-xl font-bold mt-1">{fmt(retention)}%</div>
//                                             </div>

//                                         </div>
//                                     </div>

//                                     {/* Description Document (your text) */}
//                                     <div className="mt-12 text-gray-100 space-y-6 leading-relaxed max-w-4xl">

//                                         <h2 className="text-3xl font-bold">Punt Data – Matched Betting Calculator</h2>
//                                         <p className="text-gray-300 text-[15px]">
//                                             The Punt Data Matched Betting Calculator helps you turn bookmaker promotions 
//                                             into steady, predictable returns. Enter your odds and stake and the calculator 
//                                             tells you exactly how much to place on each side so you can lock in a result 
//                                             without relying on luck.
//                                         </p>

//                                         <h3 className="text-2xl font-bold mt-10">What Is Matched Betting</h3>
//                                         <p className="text-gray-300 text-[15px]">
//                                             Matched betting uses two bets on opposite outcomes to remove risk. You back one outcome 
//                                             with the bookmaker, then place a hedge bet on the other outcome. No matter who wins, 
//                                             the payouts balance out.
//                                         </p>

//                                         <h3 className="text-2xl font-bold mt-10">Responsible Gambling</h3>
//                                         <p className="text-gray-300 text-[15px]">
//                                             Use promotions wisely. Stay in control. Bet within your limits.
//                                         </p>

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 </SubscriptionGuard>
//             </Layout>
//         </>
//     );
// }





// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find(); // all users
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });


//                           <div className="mt-12 text-gray-100 space-y-6 leading-relaxed max-w-4xl">

//     <h2 className="text-3xl font-bold">Punt Data – Matched Betting Calculator</h2>
//     <p className="text-gray-300 text-[15px]">
//         The Punt Data Matched Betting Calculator helps you turn bookmaker promotions into 
//         steady, predictable returns. Enter your odds and stake and the calculator tells you 
//         exactly how much to place on each side so you can lock in a result without relying on luck.
//     </p>

//     <h3 className="text-2xl font-bold mt-10">What Is Matched Betting</h3>
//     <p className="text-gray-300 text-[15px]">
//         Matched betting uses two bets on opposite outcomes to remove risk. You back one outcome 
//         with the bookmaker, then place a hedge bet on the other outcome. No matter who wins, 
//         the payouts balance out. You are not trying to guess the winner — you are using maths 
//         to make the promotion work in your favour.
//     </p>

//     <h3 className="text-2xl font-bold mt-10">How Promotions Make It Work</h3>
//     <p className="text-gray-300 text-[15px]">
//         Bookmakers use promos to attract punters — bonus bets, bet & get offers, money-back credits. 
//         Matched betting converts these promos into predictable returns. The promo provides value, 
//         and the hedge removes the risk.
//     </p>

//     <h3 className="text-2xl font-bold mt-10">How to Use the Calculator</h3>
//     <ul className="space-y-2 text-gray-200 text-[15px]">
//         <li>Enter your back odds</li>
//         <li>Enter your hedge (lay) odds</li>
//         <li>Enter your stake or bonus amount</li>
//         <li>Select the bet type</li>
//         <li>Press Calculate</li>
//     </ul>

//     <p className="text-gray-300 text-[15px]">
//         The calculator instantly shows your lay stake, payouts for both outcomes, total profit, 
//         and retention — everything you need to stay in control.
//     </p>

//     <h3 className="text-2xl font-bold mt-10">Simple Example</h3>
//     <p className="text-gray-300 text-[15px]">
//         Back Odds: 2.40 • Hedge Odds: 1.70 • Back Stake: $50  
//         The calculator works out a hedge stake of $41.18 so both outcomes return around $70.  
//         Guaranteed Profit: $28.82 (57.64% retention)
//     </p>

//     <h3 className="text-2xl font-bold mt-10">Why People Use Matched Betting</h3>
//     <ul className="space-y-2 text-gray-200 text-[15px]">
//         <li>Removes risk</li>
//         <li>Uses promos for real value</li>
//         <li>Creates consistent returns</li>
//         <li>Easy with a calculator</li>
//         <li>Works with nearly all betting offers</li>
//     </ul>
//     <p className="text-gray-300 text-[15px]">
//         Matched betting is mathematics — not gambling.
//     </p>

//     <h3 className="text-2xl font-bold mt-10">Responsible Gambling</h3>
//     <p className="text-gray-300 text-[15px]">
//         Use promotions wisely. Stay in control. Bet within your limits.  
//         If gambling becomes a problem, visit Gambling Help Online or call 1800 858 858.
//     </p>

// </div>



import React, { useState, useMemo } from "react";
import Layout from "../../../Layout/Layout";
import SubscriptionGuard from "../../../Component/SubscriptionGuard";

export default function MatchedBettingCalculator() {
  const [backOdds, setBackOdds] = useState("");
  const [layOdds, setLayOdds] = useState("");
  const [stake, setStake] = useState("");
  const [commission, setCommission] = useState(5);
  const [betType, setBetType] = useState("sr"); // sr = stake returned, snr = stake not returned
  const [currency, setCurrency] = useState("£");

  const valid =
    backOdds > 1 &&
    layOdds > 1 &&
    stake > 0 &&
    commission >= 0 &&
    commission < 20;

  const comm = commission / 100;

  const layStake = useMemo(() => {
    if (!valid) return 0;

    if (betType === "snr") {
      // Free bet (stake not returned)
      return (stake * (backOdds - 1)) / (layOdds - comm);
    }

    // Normal matched bet (stake returned)
    return (stake * backOdds) / (layOdds - comm);
  }, [valid, stake, backOdds, layOdds, comm, betType]);

  const liability = useMemo(() => {
    if (!valid) return 0;
    return layStake * (layOdds - 1);
  }, [valid, layStake, layOdds]);

  const profitBackWins = useMemo(() => {
    if (!valid) return 0;

    if (betType === "snr") {
      return stake * (backOdds - 1) - liability;
    }

    return stake * (backOdds - 1) - liability;
  }, [valid, stake, backOdds, liability, betType]);

  const profitLayWins = useMemo(() => {
    if (!valid) return 0;
    return layStake * (1 - comm);
  }, [valid, layStake, comm]);

  const guaranteedProfit = useMemo(() => {
    if (!valid) return 0;
    return Math.min(profitBackWins, profitLayWins);
  }, [valid, profitBackWins, profitLayWins]);

  const retention = useMemo(() => {
    if (!valid || stake === 0) return 0;
    return (guaranteedProfit / stake) * 100;
  }, [valid, guaranteedProfit, stake]);

  const fmt = (v) => (Number.isFinite(v) ? v.toFixed(2) : "0.00");

  return (
    <>
      <Layout>
        <SubscriptionGuard>
          <div className="min-h-screen bg-[#262626] text-gray-100 px-6 py-8">
            <div className="max-w-6xl mx-auto">

              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">Matched Betting Calculator</h1>
                <p className="text-sm text-green-300 mt-1">Back & Lay Hedge Calculator</p>
              </div>

              {/* Inputs */}
              <div className="bg-black rounded-lg p-5 shadow-md border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs">Back Odds</label>
                    <input type="number" min="1.01" step="0.01"
                      value={backOdds}
                      onChange={(e) => setBackOdds(Number(e.target.value))}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-xs">Lay Odds</label>
                    <input type="number" min="1.01" step="0.01"
                      value={layOdds}
                      onChange={(e) => setLayOdds(Number(e.target.value))}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-xs">Stake</label>
                    <input type="number" min="1"
                      value={stake}
                      onChange={(e) => setStake(Number(e.target.value))}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-xs">Commission (%)</label>
                    <input type="number" min="0" max="20"
                      value={commission}
                      onChange={(e) => setCommission(Number(e.target.value))}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-xs">Bet Type</label>
                    <select
                      value={betType}
                      onChange={(e) => setBetType(e.target.value)}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    >
                      <option value="sr">Normal Bet (Stake Returned)</option>
                      <option value="snr">Free Bet (Stake Not Returned)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full mt-1 bg-[#262626] px-3 py-2 rounded"
                    >
                      <option value="£">GBP (£)</option>
                      <option value="$">USD ($)</option>
                      <option value="₹">INR (₹)</option>
                      <option value="€">EUR (€)</option>
                    </select>
                  </div>
                </div>

                {!valid && (
                  <p className="text-red-400 text-sm mt-4">
                    Please enter valid odds (&gt; 1), stake (&gt; 0) and commission (0–20%).
                  </p>
                )}

                {/* Results */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ResultCard label="Lay Stake" value={`${currency}${fmt(layStake)}`} />
                  <ResultCard label="Liability (Lay Loses)" value={`${currency}${fmt(liability)}`} />
                  <ResultCard label="Profit if Back Wins" value={`${currency}${fmt(profitBackWins)}`} />
                  <ResultCard label="Profit if Lay Wins" value={`${currency}${fmt(profitLayWins)}`} />
                  <ResultCard label="Guaranteed Profit" value={`${currency}${fmt(guaranteedProfit)}`} highlight />
                  <ResultCard label="Retention %" value={`${fmt(retention)}%`} />
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
        </SubscriptionGuard>
      </Layout>
    </>
  );
}

const ResultCard = ({ label, value, highlight }) => (
  <div className={`p-3 rounded bg-[#262626] ${highlight ? "border border-green-400" : ""}`}>
    <div className="text-xs text-gray-400">{label}</div>
    <div className={`text-xl font-bold mt-1 ${highlight ? "text-green-400" : ""}`}>{value}</div>
  </div>
);
