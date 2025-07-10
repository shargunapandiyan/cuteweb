import React, { useState, useEffect } from "react";
import "./MonthYearFilter.css";

const MonthYearFilter = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nav",
    "Dec",
  ];

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    setSelectedMonth(months[currentMonthIndex]);
  }, []); // The empty array [] ensures this runs only once

  return (
    <div className="month-filter-bar">
      <div className="year-selector">
        <select
          className="year-dropdown"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="month-list d-flex flex-row overflow-scroll pb-0 pt-1">
        {months.map((month) => (
          <button
            key={month}
            className={`month-item ${selectedMonth === month ? "active" : ""}`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};
export default MonthYearFilter;
