import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTable from "./AdminTable";
import { fetchDrawHistory } from "../../redux/dashboardSlice";

const columns = [
  { header: "Race Id", accessor: "race" },
  { header: "Type", accessor: "type" },
  { header: "Time", accessor: "time" },
  { header: "Numbers", accessor: "number" },
  { header: "Status", accessor: "status" },
];

const RecentRaceTable = () => {
  const dispatch = useDispatch();

  const { drawHistory, drawHistoryLoading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDrawHistory());
  }, [dispatch]);

  if (drawHistoryLoading) {
    return <div className="text-white p-4">Loading Recent Races...</div>;
  }

  const tableData = drawHistory.slice(0, 10).map((item) => ({
    race: item.race,
    type: "Keno",
    time: item.time,
    number: item.number,
    status: item.status,
  }));

  return (
    <div>
      <AdminTable
        title="Recent Races"
        columns={columns}
        data={tableData}
      />
    </div>
  );
};

export default RecentRaceTable;
