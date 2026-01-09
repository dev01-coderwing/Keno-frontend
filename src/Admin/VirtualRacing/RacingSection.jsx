import React from 'react';
import BarChartSection from '../AdminCard/BarChartSection';
import DrawHistoryTable from '../AdminTable/DrawHistoryTable';
import LiveRaceCard from '../AdminCard/LiveRaceCard';

const RacingSection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#131313] p-4 rounded-lg max-h-[300px]">
            <LiveRaceCard />
          </div>

          <div className="bg-[#131313] p-4 rounded-lg flex-grow overflow-auto">
            <DrawHistoryTable />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#131313] p-4 rounded-lg min-h-xs flex flex-col">
            <h3 className="text-lg mb-2 font-semibold text-white">Number Frequency</h3>
            <div className="flex-grow">
              <BarChartSection />
            </div>
          </div>

          <div className="bg-[#131313] p-4 rounded-lg min-h-xs flex flex-col">
            <h3 className="text-lg mb-2 font-semibold text-white">Odd Even Distribution</h3>
            <div className="flex-grow">
              <BarChartSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacingSection;
