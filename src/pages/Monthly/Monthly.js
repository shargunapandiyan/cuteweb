import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Monthly.css";

import SearchBar from "../../components/SearchBar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MonthYearFilter from "../../components/MonthYearFilter/MonthYearFilter";

const Monthly = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchTerm, setSearchTerm] = useState("");

  const sampleEmployee = {
    name: "John",
    id: "#1001",
    days: 5,
    present: 4,
    absent: 1,
  };
  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <div className="container-fluid p-1 p-md-4">
          <div className="mb-2">
            <MonthYearFilter />
          </div>

          {/* search bar */}
          <div className="d-flex justify-content-end mb-2">
            <div className="search-wrapper">
              {
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by Name or ID"
                />
              }
            </div>
          </div>
          {/* Attendance Table*/}
          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle mb-0">
              <thead className="table-header">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="text-center p-2">Days</th>
                  <th className="text-center p-2">Present</th>
                  <th className="text-center p-2">Absent</th>
                </tr>
              </thead>
              <tbody>
                {/* sample data */}
                <tr>
                  <td className="p-3">
                    <div className="employee-name">{sampleEmployee.name}</div>
                    <div className="employee-id">{sampleEmployee.id}</div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary">
                      {sampleEmployee.days}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success">
                      {sampleEmployee.present}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-danger">
                      {sampleEmployee.absent}
                    </span>
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
export default Monthly;
