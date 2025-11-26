import React, { useState } from "react";
import StatsSection from "./StatsSection";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const columns = ["Game No.", "Result", "Action"];
const baseData = [
  ["Game 01", "23, 45, 67", ""],
  ["Game 02", "12, 78, 90", ""],
];

const expandedDetails = {
  0: ["", "More details for Game 01", ""],
  1: ["", "More details for Game 02", ""],
};

const ExpandableStatsSection = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggle = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const preparedData = [];

  baseData.forEach((row, idx) => {
    const isExpanded = expandedRow === idx;
    preparedData.push([
      row[0],
      row[1],
      <button
        onClick={() => handleToggle(idx)}
        className="text-white text-lg"
      >
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>,
    ]);

    if (isExpanded) {
      preparedData.push(expandedDetails[idx]);
    }
  });

  return <StatsSection columns={columns} data={preparedData} />;
};

export default ExpandableStatsSection;
