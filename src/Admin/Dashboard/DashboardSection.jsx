import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardCards from "../AdminCard/DashboardCard";
import TrendChart from "../AdminCard/TrendChart";
import BarChartSection from "../AdminCard/BarChartSection";
import RecentRaceTable from "../AdminTable/RecentRaceTable";
import ActivityLogsTable from "../AdminTable/ActivityLogsTable";

import { fetchDashboardStats } from "../../redux/dashboardSlice";

const DashboardSection = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <div className="text-white">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // 🔹 API se aane wale data ko cards ke liye map
  const cardData = [
    { value: stats?.totalKenoDraws || 0, label: "Total Keno Draws" },
    { value: stats?.totalRacesToday || 0, label: "Total Races Today" },
    { value: stats?.activeScrappers || 0, label: "Active Scrappers" },
    { value: stats?.errorsToday || 0, label: "Errors Today" },
  ];

  return (
    <div>
      {/* 🔹 TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cardData.map((item, index) => (
          <DashboardCards
            key={index}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      {/* 🔹 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
        <div className="md:col-span-8 bg-[#191919] rounded-lg p-4">
          <h3 className="text-white font-semibold text-lg pb-4 sm:pb-8">
            Keno Hot Number Trends
          </h3>
          <TrendChart />
        </div>

        <div className="md:col-span-4 bg-[#191919] p-4 rounded-md">
          <h3 className="text-lg mb-2 font-semibold text-white">
            Win by Race Type
          </h3>
          <BarChartSection />
        </div>
      </div>

      {/* 🔹 TABLES */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
        <div className="md:col-span-8 bg-[#191919] rounded-lg overflow-x-auto">
          <RecentRaceTable />
        </div>
        <div className="md:col-span-4 bg-[#191919] rounded-lg overflow-x-auto">
          <ActivityLogsTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
