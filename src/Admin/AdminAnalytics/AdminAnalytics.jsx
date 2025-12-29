import React from "react";
import {
  metricData,
  doughnut1,
  doughnut2,
  lineData,
  barData,
  agents,
} from "../AdminAnalytics/analyticsData";
import MetricCard from "../AdminCard/MetricCard";
import DoughnutChartCard from "../AdminCard/DoughnutChartCard";
import LineChartCard from "../AdminCard/LineChartCard";
import BarChartCard from "../AdminCard/BarChartCard";
import TicketsTableCard from "../AdminCard/TicketsTableCard";

const AdminAnalytics = () => {
  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <button className="bg-[#6C4DFE] text-white px-4 py-1 rounded-md text-sm">
          Weekly ▾
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {metricData.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))}
        <DoughnutChartCard
          title="Automation Rate"
          trend="+2.87%"
          data={doughnut1}
          centerText="70%"
          subtext="Out of - 1,450 Queries"
        />
        <DoughnutChartCard
          title="Escalation Rate"
          trend="+2.87%"
          data={doughnut2}
          centerText="30%"
          subtext="Out of - 1,450 Queries"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* <LineChartCard
          title="Average First Response Time (FRT)"
          data={lineData}
        /> */}
        <BarChartCard title="Average Resolution Time" data={barData} />
         <TicketsTableCard data={agents} />
      </div>

     
    </div>
  );
};
 
export default AdminAnalytics;
