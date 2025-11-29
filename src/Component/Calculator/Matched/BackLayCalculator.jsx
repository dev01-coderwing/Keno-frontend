import React, { useState, useMemo } from "react";
import Layout from "../../../Layout/Layout";

export default function MatchedBettingCalculator() {
    // defaults mirror your example
    const [betType, setBetType] = useState("freebet"); // "qualifying" | "freebet"
    const [backStake, setBackStake] = useState(3);
    const [backOdds, setBackOdds] = useState(6);
    const [layOdds, setLayOdds] = useState(3);
    const [layCommission, setLayCommission] = useState(4); // percent

    const c = useMemo(() => layCommission / 100, [layCommission]);

    // Lay stake formulas:
    // freebet (SNR): L = (BS * (BO - 1)) / (LO - c)
    // qualifying (stake returned): L = (BS * BO) / (LO - c)
    const layStake = useMemo(() => {
        if (!layOdds || (layOdds - c) === 0) return 0;
        const denom = layOdds - c;
        if (betType === "freebet") {
            return (backStake * (backOdds - 1)) / denom;
        } else {
            return (backStake * backOdds) / denom;
        }
    }, [betType, backStake, backOdds, layOdds, c]);

    // Outcome values (rounded only for display)
    // If Bookmaker Bet Wins:
    //   - freebet: bookmaker = BS*(BO-1)
    //   - qualifying: bookmaker = BS*(BO-1)
    // exchange side loses liability = L * (LO - 1)
    const bookmakerIfBackWins = useMemo(() => {
        if (betType === "freebet") return backStake * (backOdds - 1);
        return backStake * (backOdds - 1);
    }, [betType, backStake, backOdds]);

    const exchangeIfBackWins = useMemo(() => {
        return -layStake * (layOdds - 1);
    }, [layStake, layOdds]);

    const totalIfBackWins = useMemo(() => {
        return bookmakerIfBackWins + exchangeIfBackWins;
    }, [bookmakerIfBackWins, exchangeIfBackWins]);

    // If Exchange Bet Wins:
    //   - bookmaker: qualifying -> -BS (you lose the qualifying stake)
    //                freebet -> 0 (you lose free bet, stake was not your cash)
    //   - exchange: you win lay stake minus commission on winnings => L * (1 - c)
    const bookmakerIfExchangeWins = useMemo(() => {
        return betType === "freebet" ? 0 : -backStake;
    }, [betType, backStake]);

    const exchangeIfExchangeWins = useMemo(() => {
        return layStake * (1 - c);
    }, [layStake, c]);

    const totalIfExchangeWins = useMemo(() => {
        return bookmakerIfExchangeWins + exchangeIfExchangeWins;
    }, [bookmakerIfExchangeWins, exchangeIfExchangeWins]);

    // safe display helpers
    const fmt = (v) =>
        typeof v === "number" && !isNaN(v) ? v.toFixed(2) : "0.00";

    return (
        <>
            <Layout >
                <div className="min-h-screen bg-[#262626] text-gray-100 px-6 py-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold">Matched Betting Calculator</h1>
                            <p className="text-sm text-green-300 mt-1">Back &amp; Lay Method</p>
                        </div>

                        {/* Two-column layout */}
                        <div className="flex justify-center">

                            {/* Left - Calculator (spans 2 cols on large) */}
                            <div className="lg:col-span-2 ...">
                                <div className="bg-black rounded-lg p-5 shadow-md border border-gray-800">
                                    {/* Bet type selector */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <label className="text-sm text-gray-300">Bet type</label>
                                            <select
                                                value={betType}
                                                onChange={(e) => setBetType(e.target.value)}
                                                className="bg-[#101010] text-gray-100 px-3 py-1 rounded text-sm outline-none"
                                            >
                                                <option value="freebet">Bonus Bet (SNR)</option>
                                                <option value="qualifying">Qualifying Bet</option>
                                            </select>
                                        </div>

                                        {/* <div className="text-xs text-gray-400 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                    <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 16v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>Used when converting a bonus bet into cash with the not stake returned.</span>
                </div> */}
                                    </div>

                                    {/* Bookmaker's Bet (green card) */}
                                    <div className="rounded-md overflow-hidden mb-4 border border-green-700">
                                        <div className="bg-green-700 text-white px-4 py-2 font-semibold">Bookmaker's Bet</div>
                                        <div className="bg-[#0f0f0f] px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-300">BACK STAKE</label>
                                                <input
                                                    type="number"
                                                    value={backStake}
                                                    onChange={(e) => setBackStake(Number(e.target.value))}
                                                    className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-300">BACK ODDS</label>
                                                <input
                                                    type="number"
                                                    value={backOdds}
                                                    onChange={(e) => setBackOdds(Number(e.target.value))}
                                                    className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Betting Exchange's Bet (red card) */}
                                    <div className="rounded-md overflow-hidden border border-red-700">
                                        <div className="bg-red-700 text-white px-4 py-2 font-semibold">Betting Exchange's Bet</div>
                                        <div className="bg-[#0f0f0f] px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-300">LAY ODDS</label>
                                                <input
                                                    type="number"
                                                    value={layOdds}
                                                    onChange={(e) => setLayOdds(Number(e.target.value))}
                                                    className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-300">LAY COMMISSION (%)</label>
                                                <input
                                                    type="number"
                                                    value={layCommission}
                                                    onChange={(e) => setLayCommission(Number(e.target.value))}
                                                    className="w-full mt-2 bg-[#262626] text-gray-100 px-3 py-2 rounded outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Small footer showing lay stake */}
                                        <div className="bg-[#2b2b2b] px-4 py-2 text-sm text-gray-200">
                                            Your lay stake: <span className="font-semibold">{fmt(layStake)}</span>
                                        </div>
                                    </div>

                                    {/* Profit box (dark) */}
                                    <div className="mt-4 bg-[#0f0f0f] p-4 rounded border border-gray-800">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">If Bookmaker Bet Wins:</div>
                                                <div className="mt-2 text-sm text-gray-300">Bookmaker <span className="float-right font-semibold">{fmt(bookmakerIfBackWins)}</span></div>
                                                <div className="mt-1 text-sm text-gray-300">Exchange <span className="float-right font-semibold">{fmt(exchangeIfBackWins)}</span></div>
                                                <div className="mt-1 text-sm text-gray-200 border-t border-gray-800 pt-2">Total <span className="float-right font-semibold">{fmt(totalIfBackWins)}</span></div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">If Exchange Bet Wins:</div>
                                                <div className="mt-2 text-sm text-gray-300">Bookmaker <span className="float-right font-semibold">{fmt(bookmakerIfExchangeWins)}</span></div>
                                                <div className="mt-1 text-sm text-gray-300">Exchange <span className="float-right font-semibold">{fmt(exchangeIfExchangeWins)}</span></div>
                                                <div className="mt-1 text-sm text-gray-200 border-t border-gray-800 pt-2">Total <span className="float-right font-semibold">{fmt(totalIfExchangeWins)}</span></div>
                                            </div>

                                            <div className="p-3 bg-[#262626] rounded">
                                                <div className="text-xs text-gray-400">Summary</div>
                                                <div className="mt-2 text-sm text-gray-200">Lay Stake <span className="float-right font-semibold">{fmt(layStake)}</span></div>
                                                <div className="mt-1 text-sm text-gray-200">Expected Return <span className="float-right font-semibold">{fmt(Math.max(totalIfBackWins, totalIfExchangeWins))}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-12 text-gray-100 space-y-6 leading-relaxed max-w-4xl">
                                        <h2 className="text-3xl font-bold">
                                            Back and Lay Calculator for Matched Betting (Australia)
                                        </h2>

                                        <p className="text-gray-300 text-[15px]">
                                            This free <strong>back and lay calculator</strong> is built for Australians looking to make consistent,
                                            risk-free profits from bookmaker promotions using a method known as
                                            <strong> matched betting</strong>. It’s easy to use, beginner-friendly, and powerful
                                            enough for advanced bettors who want to maximise value from every bonus.
                                        </p>

                                        <p className="text-gray-300 text-[15px]">
                                            Whether you're placing a <strong>qualifying bet</strong> to unlock a reward or using a
                                            <strong> free bet</strong> to secure profit, our <strong>back lay calculator</strong> works
                                            out the exact <strong>lay stake</strong> you need to place on a betting exchange to
                                            balance the outcomes. This removes the risk, allowing you to keep the bonus — not lose it.
                                        </p>

                                        <p className="text-gray-300 text-[15px]">
                                            The calculator handles decimal odds, common exchange commissions, and both
                                            <strong> stake returned</strong> and <strong>stake not returned (SNR)</strong> bet types.
                                            It’s a must-have tool if you're doing any type of <strong>back to lay betting</strong>,
                                            <strong> lay back arbitrage</strong>, or want to build a repeatable system for
                                            <strong> sports betting</strong> profits.
                                        </p>

                                        <h3 className="text-2xl font-bold mt-10">What This Calculator Supports:</h3>

                                        <ul className="space-y-2 text-gray-200 text-[15px]">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400 text-xl">✔</span>
                                                Quick calculations for both <strong>qualifying bets</strong> and <strong>free bets</strong>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400 text-xl">✔</span>
                                                Works with all <strong>decimal odds</strong> and <strong>Betfair commission rates</strong>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400 text-xl">✔</span>
                                                Ideal for <strong>back/lay betting strategies</strong> and <strong>arbitrage</strong>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400 text-xl">✔</span>
                                                100% free — no sign-up, no subscriptions
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400 text-xl">✔</span>
                                                Mobile-friendly and fast
                                            </li>
                                        </ul>

                                        <p className="text-gray-300 text-[15px]">
                                            Whether you're betting on the <strong>Premier League</strong>, Aussie horse racing, or other popular events,
                                            our calculator helps ensure you always place smart, risk-managed bets. It’s trusted by people who want a smarter,
                                            more calculated approach to sports betting — without gambling in the traditional sense.
                                        </p>

                                        <p className="text-gray-300 text-[15px]">
                                            The <strong>back and lay calculator</strong> is the core tool behind every successful matched betting system.
                                            It allows you to remove emotion and guesswork from your bets and replace them with precise, mathematical
                                            outcomes that compound over time.
                                        </p>

                                        <p className="text-gray-300 text-[15px]">
                                            New to this? <span className="text-blue-400 font-semibold cursor-pointer underline">
                                                Check out our free matched betting guide
                                            </span> and learn how to start making risk-free money today using a proven system anyone can follow.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Description section (exact text you provided) */}

                    </div>
                </div>
            </Layout>
        </>
    );
}
