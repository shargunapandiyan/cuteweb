import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure this is imported for the icon

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { attendanceData } from "../../data/employee/AttendanceData/attendanceData";

// 1. Import the icon for the edit button
import { PencilSquare } from "react-bootstrap-icons";

import "./TodayAttendance.css";

const TodayAttendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // --- State Management (No changes here) ---
  const [activeTab, setActiveTab] = useState("present");
  const [currentDate, setCurrentDate] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // --- useEffect and useMemo (No changes in logic) ---
  useEffect(() => {
    setAllEmployees(attendanceData);
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    setCurrentDate(`${day}-${month}-${year}`);
  }, []);

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

  // --- Helper functions and counts (No changes here) ---
  const getButtonClass = (tabName) => {
    return activeTab === tabName ? "active-tab-button" : "filter-btn-new";
  };

  const presentCount = allEmployees.filter((e) => e.status === "Present").length;
  const absentCount = allEmployees.filter((e) => e.status === "Absent").length;
  const lateEntryCount = allEmployees.filter((e) => e.status === "Late Entry").length;

  const handleEdit = (employeeId) => {
    // Placeholder for your edit logic, e.g., navigate to an edit page
    console.log("Editing employee:", employeeId);
    // navigate(`/attendance/edit/${employeeId}`);
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />
      <div className="page-content">
        <div className="container-fluid attendance-container p-3 p-md-4">
          {/* Top bar with blinking counts - no changes here */}
          <div className="top-bar-container mb-4">
            <button className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass("present")}`} onClick={() => setActiveTab("present")}>
              <span>Present</span>
              <span className="count-badge blink-animation">{presentCount}</span>
            </button>
            <button className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass("absent")}`} onClick={() => setActiveTab("absent")}>
              <span>Absent</span>
              <span className="count-badge blink-animation">{absentCount}</span>
            </button>
            <button className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass("lateentry")}`} onClick={() => setActiveTab("lateentry")}>
              <span>Late Entry</span>
              <span className="count-badge blink-animation">{lateEntryCount}</span>
            </button>
          </div>

          <div className="row g-3 justify-content-between align-items-center mb-4">
            <div className="col-auto">
              {/* 2. UPDATED THE SHIFT OPTIONS */}
              <select className="form-select custom-form-control" value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
                <option value="all">All Shifts</option>
                <option value="general">General Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control custom-form-control text-center" value={currentDate} readOnly />
            </div>
            <div className="col-12 col-md-auto ms-md-auto">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by Name or ID" />
            </div>
          </div>

          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle mb-0">
              <thead className="table-header">
                {activeTab === "absent" ? (
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Shift</th>
                    {/* 3. ADDED ACTION HEADER */}
                    <th className="p-3 text-center">Action</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Shift</th>
                    <th className="p-3">Time</th>
                    {/* 3. ADDED ACTION HEADER */}
                    <th className="p-3 text-center">Action</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="p-3">{emp.id}</td>
                      <td className="p-3">{emp.name}</td>
                      <td className="p-3 text-capitalize">{emp.shift}</td>
                      {activeTab !== "absent" && <td className="p-3">{emp.time}</td>}
                      {/* 4. ADDED ACTION CELL WITH EDIT BUTTON */}
                      <td className="p-3 text-center">
                        <button className="action-button edit-button" onClick={() => handleEdit(emp.id)}>
                          <PencilSquare />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* 5. UPDATED COLSPAN to account for new column */}
                    <td colSpan={activeTab === "absent" ? "4" : "5"} className="text-center text-muted p-5">
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