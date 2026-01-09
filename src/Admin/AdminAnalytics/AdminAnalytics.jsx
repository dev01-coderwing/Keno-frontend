import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAnalyticsMetrics,
  fetchResolutionTime,
  fetchAgentsAnalytics,
  fetchAutomationRate,
  fetchEscalationRate,
} from "../../redux/analyticsSlice";

import MetricCard from "../AdminCard/MetricCard";
import DoughnutChartCard from "../AdminCard/DoughnutChartCard";
import BarChartCard from "../AdminCard/BarChartCard";
import TicketsTableCard from "../AdminCard/TicketsTableCard";

const AdminAnalytics = () => {
  const dispatch = useDispatch();
  const [range, setRange] = useState("monthly"); // 🔥 weekly | monthly

  const {
    metricData,
    doughnut1,
    doughnut2,
    barData,
    agents,
    loading,
    error,
  } = useSelector((state) => state.analytics);
console.log("METRIC DATA =>", metricData);

  useEffect(() => {
    dispatch(fetchAnalyticsMetrics(range));
    dispatch(fetchResolutionTime(range));
    dispatch(fetchAgentsAnalytics(range));
    dispatch(fetchAutomationRate(range));
    dispatch(fetchEscalationRate(range));
  }, [dispatch, range]);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="relative">
      {/* 🔘 Range Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-[#262626] rounded-md overflow-hidden flex text-sm">
          <button
            onClick={() => setRange("weekly")}
            className={`px-4 py-1 ${
              range === "weekly"
                ? "bg-[#6C4DFE] text-white"
                : "text-gray-400"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setRange("monthly")}
            className={`px-4 py-1 ${
              range === "monthly"
                ? "bg-[#6C4DFE] text-white"
                : "text-gray-400"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Metric + Doughnut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {metricData.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))}

        {doughnut1.datasets.length > 0 && (
          <DoughnutChartCard
            title="Automation Rate"
            trend="0%"
            data={doughnut1}
            centerText={`${doughnut1.datasets[0].data[0]}%`}
            subtext={`Out of total queries (${range})`}
          />
        )}

        {doughnut2.datasets.length > 0 && (
          <DoughnutChartCard
            title="Escalation Rate"
            trend="0%"
            data={doughnut2}
            centerText={`${doughnut2.datasets[0].data[0]}%`}
            subtext={`Out of total queries (${range})`}
          />
        )}
      </div>

      {/* Resolution + Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <BarChartCard title="Average Resolution Time" data={barData} />
        <TicketsTableCard data={agents} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
