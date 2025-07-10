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

  //It receives the date from the child component.
  const handleRangeChange = (range) => {
    setDateRange(range);
  };

  const sampleEmployee = {
    name: "John peter",
    id: "#1001",
    earnings: 1000,
    deduction: 0,
    Net: 1000,
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
          {/* Shift selection */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 ">
            <div>
              <select className="form-select custom-filter-select">
                <option>-- Shift --</option>
                <option>Morning Shift</option>
                <option>Evening Shift</option>
                <option>Night Shift</option>
              </select>
            </div>
            <div>
              <DateRangePicker onRangeChange={handleRangeChange} />
            </div>
          </div>

          {/* Salary Table */}
          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle salary-table  mb-0">
              <thead className="table-header">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="text-end p-3">Earnings</th>
                  <th className="text-end p-3">Deduction</th>
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
                  {/* Note: toLocaleString only works on numbers, not strings */}
                  <td className="text-end p-3">
                    ₹ {sampleEmployee.earnings.toLocaleString("en-IN")}
                  </td>
                  <td className="text-end p-3">
                    ₹ {sampleEmployee.deduction.toLocaleString("en-IN")}
                  </td>
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
