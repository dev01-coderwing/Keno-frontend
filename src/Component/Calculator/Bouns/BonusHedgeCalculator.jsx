import React, { useState, useEffect } from 'react';
import Layout from "../../../Layout/Layout";

// Default export React component (single-file). Built with Tailwind CSS classes for styling.
// Drop this file into a Vite + React project (src/components/BonusHedgeCalculator.jsx)
// Note: This implements the common *free-bet (stake not returned)* hedge formula.
// If you want a version without Tailwind (vanilla CSS) tell me and I'll convert it.

export default function BonusHedgeCalculator() {
    const [bonusStake, setBonusStake] = useState(50);
    const [backOdds, setBackOdds] = useState(3.0);
    const [layOdds, setLayOdds] = useState(3.2);
    const [commission, setCommission] = useState(5); // percent
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
        // For now we support Decimal odds only. If user selects fractional or american, we try a best-effort conversion from input.
        let decBack = toNum(backOdds);
        let decLay = toNum(layOdds);

        // Prevent division by zero or negative
        const c = toNum(commission) / 100;
        const B = toNum(bonusStake);

        if (decLay <= c + 0.0000001) {
            setLayStake(0);
            setProfit(0);
            setLiability(0);
            setRetentionPct(0);
            return;
        }

        // Formula derived for FREE BET (stake not returned):
        // LayStake = (BonusStake * (BackOdds - 1)) / (LayOdds - commission)
        // commission is a decimal fraction (e.g. 0.05)
        const L = (B * (decBack - 1)) / (decLay - c);
        const liabilityCalc = L * (decLay - 1);
        // Profit (either outcome) = LayStake * (1 - commission)
        const profitCalc = L * (1 - c);
        const retention = B > 0 ? (profitCalc / B) * 100 : 0;

        setLayStake(Number.isFinite(L) && L > 0 ? +L.toFixed(2) : 0);
        setLiability(Number.isFinite(liabilityCalc) ? +liabilityCalc.toFixed(2) : 0);
        setProfit(Number.isFinite(profitCalc) ? +profitCalc.toFixed(2) : 0);
        setRetentionPct(Number.isFinite(retention) ? +retention.toFixed(1) : 0);
    }, [bonusStake, backOdds, layOdds, commission, oddsFormat]);

    return (
        <>
            <Layout>
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
                        <strong>How it works (short):</strong>
                        <ul className="list-disc ml-5 mt-2 text-gray-400">
                            <li>This assumes a free-bet where the <em>stake is not returned</em>. The formula used is: <code>Lay = (Bonus * (Back - 1)) / (Lay - commission)</code>.</li>
                            <li>Profit is approximately the same whether the back wins or the lay wins (small rounding differences possible).</li>
                            <li>If you need support for returned-stake bets, multiples, or fractional/american conversions, tell me and I'll extend it.</li>
                        </ul>
                    </div>


                    <div className="mt-4 text-xs text-gray-500">Tip: If you don't have Tailwind in your project I can provide a plain CSS version. Also tell me your preferred currency symbol and I'll update the component.</div>
                    <div className="mt-10 text-gray-300 text-sm leading-relaxed">
                        <h2 className="text-lg font-bold mb-2">Free Bonus Bet Calculator (2025)</h2>
                        <p>
                            Welcome to Wagerville’s free bonus bet calculator — the fastest way to turn promotional bets into real profit. Whether
                            you’re using a $50 bonus from a new bookmaker or trying to convert multiple promos, this tool shows you exactly how
                            much to stake and what your guaranteed payout will be. Designed for both beginners and advanced bettors, our
                            calculator is the perfect companion for maximizing retention.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">What is a Bonus Bet?</h2>
                        <p>
                            A bonus bet (also called a free bet, bonus credit, or token) is non-withdrawable promotional amount bookmakers offer
                            to encourage new sign-ups or reward loyalty. While you can’t cash out the bonus bet directly, you can use a bonus bet
                            conversion calculator to hedge it and walk away with real, withdrawable money.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">Why Use a Bonus Bet Calculator?</h2>
                        <p>
                            When using a bonus bet, your bet only keeps the winnings (not the stake). This means blindly placing it on any outcome
                            may lead to poor value or even no profit. Our bonus bet hedge calculator helps you:
                        </p>
                        <ul className="list-disc ml-5 mt-2 text-gray-400">
                            <li>Hedge with one or two other outcomes</li>
                            <li>Calculate exact hedge stakes for risk-free profit</li>
                            <li>See potential payouts for all outcomes</li>
                            <li>Get your bonus bet retention percentage</li>
                        </ul>
                        <p className="mt-2">This makes it ideal for matched betting and arbitrage play.</p>

                        <h2 className="text-lg font-bold mt-4 mb-2">How to Use the Bonus Bet Hedge Calculator</h2>
                        <p>Using this calculator is simple:</p>
                        <ol className="list-decimal ml-5 mt-2 text-gray-400">
                            <li>Choose your odds format (Decimal, American, or Fractional)</li>
                            <li>Enter the odds where you’ll place your bonus bet</li>
                            <li>Enter the odds for your hedge outcome(s)</li>
                            <li>Input the bonus amount (e.g., $50)</li>
                            <li>Click Calculate</li>
                        </ol>
                        <p className="mt-2">
                            The calculator will display the required stakes, your guaranteed profit, and retention. You can then place your hedge bets accordingly.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">What is Bonus Bet Retention?</h2>
                        <p>
                            Bonus bet retention is the percentage of your bonus value that you keep as real money after hedging. For example,
                            if you have a $50 bonus and your calculator result shows $38 profit, your retention is 76%. Higher retention means better value.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">Bonus Bet Arbitrage Calculator for Two-Way or Three-Way Bets</h2>
                        <p>
                            Whether you’re placing a bonus bet on a win/draw-loss market (2-way) or a simple two-outcome market, this bonus bet
                            arbitrage calculator allows you to enter up to two hedge lines. This flexibility ensures you can fully cover
                            multi-outcome events like soccer, basketball, or MMA — locking in profit no matter what.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">Matched Bonus Bet Calculator: Ideal for Sign-Up Offers</h2>
                        <p>
                            Sign-up offers from bookmakers are one of the easiest ways to make risk-free profits. Use this matched bonus bet
                            calculator to convert your sign-up bonus into cash. Combined with our step-by-step guides, you’ll be on your way to
                            $200+ profit in your first week.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">FAQ: Bonus Bet Calculator</h2>
                        <p><strong>Q:</strong> Is this calculator free to use?<br /><strong>A:</strong> Yes — 100% free, no account required.</p>
                        <p><strong>Q:</strong> Can I use this for multi-bets or accumulators?<br /><strong>A:</strong> The calculator is designed for single outcomes. For multi-bets, hedge individually or wait for our multi-bet calculator (coming soon).</p>
                        <p><strong>Q:</strong> What’s the best way to find high retention bets?<br /><strong>A:</strong> Use an odds comparison tool like OddsJam, where we show top-value bets to convert bonuses quickly.</p>
                        <p><strong>Q:</strong> What’s a good retention percentage?<br /><strong>A:</strong> Anything above 70% is solid. 80–90% is considered elite.</p>

                        <h2 className="text-lg font-bold mt-4 mb-2">More Tools Like This</h2>
                        <p>
                            Want more calculators? Try our arbitrage calculator or EV calculator — perfect for sharp bettors and those seeking
                            matched betting as a side hustle. These tools aim to give you an edge, start using them today.
                        </p>

                        <h2 className="text-lg font-bold mt-4 mb-2">Start Converting Bonus Bets Into Real Money</h2>
                        <p>
                            Don’t let bonus bets expire or go to waste. Use the Wagerville Bonus Bet Converter to turn them into tax-free cash.
                            Thousands of users are already profiting — why not you?
                        </p>
                    </div>
                </div>

            </div>
</Layout>
        </>
    );
}



