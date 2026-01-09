import React from "react";
const columns = [
  "Entries",
  "",
  "",
  "Win %",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "Races Since",
];

const data = [
  [
    <span className="px-2.5 py-1 bg-red-700">1</span>,
    "",
    "",
    "40%",
    "5",
    "5",
    "5",
    "5",
    "16",
  ],
  [
    <span className="px-2.5 py-1 bg-black">2</span>,
    "",
    "",
    "36.8%",
    "5",
    "5",
    "5",
    "5",
    "20",
  ],
  [
    <span className="px-2.5 py-1 border border-white">3</span>,
    "",
    "",
    "28%",
    "5",
    "5",
    "5",
    "5",
    "35",
  ],
  [
    <span className="px-2.5 py-1 bg-[#134080]">4</span>,
    "",
    "",
    "54.5%",
    "5",
    "5",
    "5",
    "5",
    "14",
  ],
  [
    <span className="px-2.5 py-1 bg-[#FDF000]">5</span>,
    "",
    "",
    "02%",
    "5",
    "5",
    "5",
    "5",
    "22",
  ],
  [
    <span className="px-2.5 py-1 bg-[#28883A]">6</span>,
    "",
    "",
    "40%",
    "5",
    "5",
    "5",
    "5",
    "16",
  ],
  [
    <span className="px-2.5 py-1 bg-[#34A6A4]">7</span>,
    "",
    "",
    "36.8%",
    "5",
    "5",
    "5",
    "5",
    "20",
  ],
  [
    <span className="px-2.5 py-1 bg-[#EB1888]">8</span>,
    "",
    "",
    "28%",
    "5",
    "5",
    "5",
    "5",
    "35",
  ],
  [
    <span className="px-2.5 py-1 bg-[#19862F]">9</span>,
    "",
    "",
    "54.5%",
    "5",
    "5",
    "5",
    "5",
    "14",
  ],
  [
    <span className="px-2 py-1 bg-[#1F60A7]">10</span>,
    "",
    "",
    "02%",
    "5",
    "5",
    "5",
    "5",
    "22",
  ],
  [
    <span className="px-2 py-1 bg-[#F04F1E]">11</span>,
    "",
    "",
    "40%",
    "5",
    "5",
    "5",
    "5",
    "16",
  ],
  [
    <span className="px-2 py-1 bg-[#39A4ED]">12</span>,
    "",
    "",
    "36.8%",
    "5",
    "5",
    "5",
    "5",
    "20",
  ],
];

const ExpandableHome = () => {
  return (
    <div>
      <div className="bg-[#1D1D1D] mt-4 rounded-xl">
        <h3 className="text-xl font-semibold px-7 pt-4 rounded-t-2xl bg-[#0A0A0A]">
          Quick Stats
        </h3>
        <StatsSection columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ExpandableHome;
