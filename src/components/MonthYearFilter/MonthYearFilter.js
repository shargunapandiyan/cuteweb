import React, { useState, useEffect, useRef } from "react";
import "./MonthYearFilter.css";

const MonthYearFilter = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const monthListRef = useRef(null);

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
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    setSelectedMonth(months[currentMonthIndex]);
  }, []);

  // Scroll active month into view
  useEffect(() => {
    if (monthListRef.current) {
      const activeMonthElement =
        monthListRef.current.querySelector(".month-item.active");
      if (activeMonthElement) {
        activeMonthElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [selectedMonth]);

  const getMonthStatusClass = (monthIndex) => {
    const now = new Date();
    const currentRealYear = now.getFullYear();
    const currentRealMonthIndex = now.getMonth();
    const yearInSelector = parseInt(selectedYear, 10);

    if (yearInSelector < currentRealYear) {
      return "month-completed";
    }

    if (yearInSelector > currentRealYear) {
      return "";
    }

    if (monthIndex < currentRealMonthIndex) {
      return "month-completed";
    }
    if (monthIndex === currentRealMonthIndex) {
      return "month-current";
    }
    return "";
  };

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
      <div className="month-list" ref={monthListRef}>
        {/* Pass the index to the map function */}
        {months.map((month, index) => (
          <button
            key={month}
            // Combine all classes together
            className={`
              month-item
              ${selectedMonth === month ? "active" : ""}
              ${getMonthStatusClass(index)}
            `}
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
