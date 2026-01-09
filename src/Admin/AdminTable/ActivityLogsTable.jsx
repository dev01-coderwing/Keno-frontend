import React from "react";
import AdminTable from "./AdminTable";

const columns = [
  { header: "Source", accessor: "source" },
  { header: "Source", accessor: "source2" },
  { header: "Source", accessor: "source3" },
];

const data = [
  {
    source: "Bet385",
    source2: "Success",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Error",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Success",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Error",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Success",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Error",
    source3: "Bet385",
  },
  {
    source: "Bet385",
    source2: "Success",
    source3: "Bet385",
  },
];

const ActivityLogsTable = () => {
  return (
    <div>
      <AdminTable title="Scraper Activity log's" columns={columns} data={data} />
    </div>
  );
};

export default ActivityLogsTable;
