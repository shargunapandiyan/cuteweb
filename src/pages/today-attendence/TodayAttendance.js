import React, { useState, useEffect, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { attendanceData } from "../../data/employee/AttendanceData/attendanceData";
import { PencilSquare } from "react-bootstrap-icons";

import "./TodayAttendance.css";

const TodayAttendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [activeTab, setActiveTab] = useState("present");
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    setAllEmployees(attendanceData);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  const filteredEmployees = useMemo(() => {
    let employees = allEmployees;

    if (activeTab === "present") {
      employees = employees.filter((emp) => emp.status === "Present");
    } else if (activeTab === "absent") {
      employees = employees.filter((emp) => emp.status === "Absent");
    } else if (activeTab === "lateentry") {
      employees = employees.filter((emp) => emp.status === "Late Entry");
    }

    if (selectedShift !== "all") {
      employees = employees.filter((emp) => emp.shift === selectedShift);
    }

    if (searchTerm) {
      employees = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return employees;
  }, [allEmployees, activeTab, selectedShift, searchTerm]);

  const getButtonClass = (tabName) => {
    return activeTab === tabName ? "active-tab-button" : "filter-btn-new";
  };

  const presentCount = allEmployees.filter(
    (e) => e.status === "Present"
  ).length;
  const absentCount = allEmployees.filter((e) => e.status === "Absent").length;
  const lateEntryCount = allEmployees.filter(
    (e) => e.status === "Late Entry"
  ).length;

  const handleEdit = (employeeId) => {
    console.log("Editing employee:", employeeId);
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
    }
    setCalendarOpen(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />
      <div className="page-content">
        <div className="container-fluid attendance-container p-2">
          <div className="top-bar-container mb-2">
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "present"
              )}`}
              onClick={() => setActiveTab("present")}
            >
              <span>Present</span>
              <span className="count-badge blink-animation">
                {presentCount}
              </span>
            </button>
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "absent"
              )}`}
              onClick={() => setActiveTab("absent")}
            >
              <span>Absent</span>
              <span className="count-badge blink-animation">{absentCount}</span>
            </button>
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "lateentry"
              )}`}
              onClick={() => setActiveTab("lateentry")}
            >
              <span>Late Entry</span>
              <span className="count-badge blink-animation">
                {lateEntryCount}
              </span>
            </button>
          </div>

          {/* Shift and Date Filters */}
          <div className="row g-5 mb-2">
            <div className="col-6 col-md-auto">
              <select
                className="form-select custom-form-control"
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
              >
                <option value="all">-- Shift --</option>
                <option value="general">General Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </div>
            <div className="col-6 col-md-auto" ref={datePickerRef}>
              <div className="position-relative h-100">
                <input
                  type="text"
                  className="form-control custom-form-control text-center h-100"
                  value={format(selectedDate, "dd-MMM-yyyy")}
                  readOnly
                  onClick={() => setCalendarOpen(!isCalendarOpen)}
                />
                {isCalendarOpen && (
                  <div className="calendar-popover">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*  Search Bar */}
          <div className="row g-3 mb-2">
            <div className="col-12">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search Name or ID"
              />
            </div>
          </div>
          {/* --- Table --- */}

          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle mb-0">
              <thead className="table-header">
                {activeTab === "absent" ? (
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Shift</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Shift</th>
                    <th className="p-2">Time</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="p-2">{emp.id}</td>
                      <td className="p-2">{emp.name}</td>
                      <td className="p-2 text-capitalize">{emp.shift}</td>
                      {activeTab !== "absent" && (
                        <td className="p-2">{emp.time}</td>
                      )}
                      <td className="p-2 text-center">
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEdit(emp.id)}
                        >
                          <PencilSquare />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === "absent" ? "4" : "5"}
                      className="text-center text-muted p-5"
                    >
                      No data matches your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TodayAttendance;
