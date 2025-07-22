import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Salary.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import MonthYearFilter from "../../components/MonthYearFilter/MonthYearFilter";
import Footer from "../../components/Footer/Footer";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";

const Salary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // State for the shift dropdown
  const [selectedShift, setSelectedShift] = useState("");

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleRangeChange = (range) => {
    setDateRange(range);
  };

  const sampleEmployees = [
    { id: "#1001", name: "Anil Ray", workHrs: "53 Hrs", workDays: 7, Net: 0 },
    { id: "#1002", name: "Sachine", workHrs: "44 Hrs", workDays: 6, Net: 0 },
    { id: "#1003", name: "Subash Nayak", workHrs: "39 Hrs", workDays: 6, Net: 0 },
    { id: "#1004", name: "Prasanth Naik", workHrs: "34 Hrs", workDays: 6, Net: 3047 },
    { id: "#1005", name: "Rajendra Barik", workHrs: "37 Hrs", workDays: 5, Net: 3943 },
    { id: "#1006", name: "Amresh", workHrs: "42 Hrs", workDays: 5, Net: 1806 },
  ];

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />
      <div className="page-content">
        <div className="container-fluid p-2 p-md-4">
          <div className="mb-2">
            <MonthYearFilter />
          </div>

          <div className="salary-content-wrapper bg-light rounded-3 shadow-sm">
            {/* --- REVISED FILTER SECTION TO MATCH NEW IMAGE --- */}
            <div className="row g-2 align-items-center p-3">
              {/* col-auto makes this column just wide enough for its content */}
              <div className="col-auto">
                <div className="custom-select-wrapper shift-select">
                  <select
                    className="custom-select-underlay"
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    required
                  >
                    <option value="" disabled>--Shift--</option>
                    <option value="all">All Shifts</option>
                    <option value="general">General Shift</option>
                    <option value="night">Night Shift</option>
                  </select>
                  {/* The arrow icon is intentionally removed to match the design */}
                </div>
              </div>
              {/* col makes this column take up the remaining available space */}
              <div className="col">
                <DateRangePicker onRangeChange={handleRangeChange} />
              </div>
            </div>

            {/* --- Salary Table (Unchanged) --- */}
            <div className="table-responsive">
              <table className="table table-borderless align-middle salary-table mb-0">
                <thead className="table-header">
                  <tr>
                    <th className="p-2 ps-3">Employee</th>
                    <th className="text-end p-2">Work Hrs</th>
                    <th className="text-end p-2">Work Days</th>
                    <th className="text-end p-2 pe-3">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="p-2 ps-3">
                        <div className="employee-id">{employee.id}</div>
                        <div className="employee-name-salary">
                          {employee.name}
                        </div>
                      </td>
                      <td className="text-end p-2">{employee.workHrs}</td>
                      <td className="text-end p-2">{employee.workDays}</td>
                      <td className="text-end p-2 pe-3">
                        ₹ {employee.Net.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Salary;