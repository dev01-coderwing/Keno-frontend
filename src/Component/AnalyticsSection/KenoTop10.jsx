import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKenoTop10 } from "../../redux/tracksideAnalyticsSlice";

function KenoTop10() {
    const dispatch = useDispatch();

    const { kenoTop10, loading, error } = useSelector(
        (state) => state.tracksideAnalytics
    );

    useEffect(() => {
        dispatch(fetchKenoTop10());
    }, [dispatch]);

    if (loading || !kenoTop10) {
        return <p className="text-gray-400">Loading Keno Analytics...</p>;
    }

    if (error) {
        return <p className="text-red-400">Error: {error}</p>;
    }

    const { top10HotKeno = [], top10ColdKeno = [] } = kenoTop10;

    //  Badge renderer (RED / BLUE)
    const renderDroughtBadge = (value) => {
        let bgColor = "rgb(75, 85, 99)"; // gray default

        if (value >= 1 && value <= 40) {
            bgColor = "rgb(239, 68, 68)"; // red
        } else if (value >= 41 && value <= 90) {
            bgColor = "rgb(59, 130, 246)"; // blue
        }

        return (
            <span
                className="px-2 py-1 rounded text-sm font-semibold text-white"
                style={{ backgroundColor: bgColor }}
            >
                {value}
            </span>
        );
    };

    return (
        <div className="bg-[#1D1D1D] rounded-xl mt-6 p-4">
            <h3 className="text-lg font-semibold mb-4">
                Keno Top 10 Analytics
            </h3>
      {/*  COLD KENO */}
            <h4 className="text-md font-semibold mt-6 mb-2 text-blue-400">
                 Top 10 Cold Keno
            </h4>
            <KenoTable
                data={top10ColdKeno}
                renderDroughtBadge={renderDroughtBadge}
            />
            {/*  HOT KENO */}
            <h4 className="text-md font-semibold mb-2 text-orange-400">
                 Top 10 Hot Keno
            </h4>
            <KenoTable
                data={top10HotKeno}
                renderDroughtBadge={renderDroughtBadge}
            />

      
        </div>
    );
}

export default KenoTop10;


function KenoTable({ data, renderDroughtBadge }) {
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <p className="text-gray-500 text-sm mb-4">
                No data available
            </p>
        );
    }

    return (
        <div className="overflow-x-auto mb-4">
            <table className="w-full border border-gray-700 rounded-lg">
                <thead className="bg-[#090909]">
                    <tr>
                        <th className="p-3 text-left">Number</th>
                        <th className="p-3 text-left">Win %</th>
                        <th className="p-3 text-left">Avg Drought</th>
                        <th className="p-3 text-left">Current Drought</th>
                        <th className="p-3 text-left">Longest Drought</th>
                           <th className="p-3 text-left">Last Appeared</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="border-t border-gray-700">
                            <td className="p-3">{item.number}</td>
                            <td className="p-3">{item.winPercentage}%</td>
                            <td className="p-3">{item.averageDrought}</td>
<td className="p-3">{item.lastAppeared}</td>
                            <td className="p-3">
                                {renderDroughtBadge(item.currentDrought)}
                            </td>

                            <td className="p-3">
                                {renderDroughtBadge(item.longestDrought)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
