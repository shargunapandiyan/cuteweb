// src/components/DateRangePicker/DateRangePicker.js

import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as rdrLocales from "react-date-range/dist/locale";
import {
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";
import "./DateRangePicker.css";

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return "";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/ /g, ", ");
};

const DateRangePicker = ({ onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("This Month");
  const [state, setState] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: "selection",
    },
  ]);

  // --- START: NEW CODE FOR RESPONSIVENESS ---
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // --- END: NEW CODE FOR RESPONSIVENESS ---

  const ref = useRef(null);

  // Close the picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // Notify parent component about date changes
  useEffect(() => {
    onRangeChange(state[0]);
  }, [state, onRangeChange]);

  const handlePresetClick = (range, label) => {
    setState([range]);
    setActivePreset(label);

    if (label !== "Custom Range") {
      setIsOpen(false);
    }
  };

  const today = new Date();
  const definedRanges = [
    {
      label: "Last Week",
      range: () => ({
        startDate: startOfWeek(subDays(today, 7)),
        endDate: endOfWeek(subDays(today, 7)),
      }),
    },
    {
      label: "Last Month",
      range: () => ({
        startDate: startOfMonth(subMonths(today, 1)),
        endDate: endOfMonth(subMonths(today, 1)),
      }),
    },
    {
      label: "This Month",
      range: () => ({
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      }),
    },
  ];

  return (
  <div className="date-range-picker-wrapper" ref={ref}>
    <button className="date-range-toggle" onClick={() => setIsOpen(!isOpen)}>
      <i className="bi bi-calendar3 me-2"></i>
      <span>{`${formatDate(state[0].startDate)} - ${formatDate(
        state[0].endDate
      )}`}</span>
      <i
        className={`bi bi-chevron-down ms-auto transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      ></i>
    </button>

    {isOpen && (
      <div className="date-range-dropdown">
        <div className="presets">
          {definedRanges.map((preset) => (
            <button
              key={preset.label}
              className={`preset-item ${
                activePreset === preset.label ? "active" : ""
              }`}
              onClick={() => handlePresetClick(preset.range(), preset.label)}
            >
              {preset.label}
            </button>
          ))}
          <button
            className={`preset-item ${
              activePreset === "Custom Range" ? "active" : ""
            }`}
            onClick={() => {
              // This button just activates the calendar view
              setActivePreset("Custom Range");
            }}
          >
            Custom Range
          </button>
        </div>

        {/* The calendar now appears below the presets inside the same card */}
        {activePreset === "Custom Range" && (
          <div className="calendar-container">
            <DateRange
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={isMobile ? 1 : 2}
              ranges={state}
              direction={isMobile ? "vertical" : "horizontal"}
              locale={rdrLocales.enGB}
              showMonthAndYearPickers={true}
            />
          </div>
        )}
      </div>
    )}
  </div>
);
};

export default DateRangePicker;
