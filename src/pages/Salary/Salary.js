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

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleRangeChange = (range) => {
    setDateRange(range);
  };

  const sampleEmployee = {
    name: "John Peter",
    id: "#1001",
    workHrs: "184 Hrs",
    workDays: 23,
    Net: 12500,
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />
      <div className="page-content">
        <div className="container-fluid p-3 p-md-4">
          <div className="mb-3">
            <MonthYearFilter />
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 ">
            <div>
              <select
                className="form-select custom-filter-select"
                defaultValue="all"
              >
                <option value="all">All Shifts</option>
                <option value="general">General Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </div>
            <div>
              <DateRangePicker onRangeChange={handleRangeChange} />
            </div>
          </div>

          {/* Salary Table */}
          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle salary-table mb-0">
              <thead className="table-header">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="text-end p-3">Work Hrs</th>
                  <th className="text-end p-3">Work Days</th>
                  <th className="text-end p-3">Net</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">
                    <div className="employee-id">{sampleEmployee.id}</div>
                    <div className="employee-name-salary">
                      {sampleEmployee.name}
                    </div>
                  </td>
                  <td className="text-end p-3">{sampleEmployee.workHrs}</td>
                  <td className="text-end p-3">{sampleEmployee.workDays}</td>
                  <td className="text-end p-3">
                    ₹ {sampleEmployee.Net.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Salary;
