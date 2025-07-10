import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./TodayAttendance.css";

const TodayAttendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [activeTab, setActiveTab] = useState("present");

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const monthNames = [
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
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    setCurrentDate(`${day}-${month}-${year}`);
  }, []);

  // --- API data will be stored here in the future ---
  // const [presentData, setPresentData] = useState([]);
  // const [absentData, setAbsentData] = useState([]);
  // const [lateEntryData, setLateEntryData] = useState([]);

  // For now, we just show "No data" as requested.
  const tableData = [];

  // 2. A HELPER FUNCTION to determine the class for each button
  const getButtonClass = (tabName) => {
    return activeTab === tabName ? "active-tab-button" : "filter-btn-new";
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <div className="container-fluid attendance-container p-3 p-md-4">
          {/*  onClick handlers and dynamic classes */}
          <div className="top-bar-container mb-4">
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "present"
              )}`}
              onClick={() => setActiveTab("present")}
            >
              <span>Present</span>
              <span className="count-badge">5</span>
            </button>
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "absent"
              )}`}
              onClick={() => setActiveTab("absent")}
            >
              <span>Absent</span>
              <span className="count-badge">0</span>
            </button>
            <button
              className={`btn d-flex justify-content-center align-items-center gap-2 flex-grow-1 ${getButtonClass(
                "lateentry"
              )}`}
              onClick={() => setActiveTab("lateentry")}
            >
              <span>Late Entry</span>
              <span className="count-badge">3</span>
            </button>
          </div>

          {/* The filters row, with an added Search Bar */}
          <div className="row g-3 justify-content-between align-items-center mb-4">
            <div className="col-auto">
              <select
                className="form-select custom-form-control"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Shift --
                </option>
                <option value="morning">Morning Shift</option>
                <option value="evening">Evening Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control custom-form-control text-center"
                value={currentDate}
                readOnly
              />
            </div>
            <div className="col-12 col-md-auto ms-md-auto">
              <input
                type="text"
                className="form-control custom-form-control"
                placeholder="Search Name or ID"
              />
            </div>
          </div>

          <div className="table-responsive bg-white rounded-3 shadow-sm">
            <table className="table table-borderless align-middle mb-0">
              <thead className="table-header">
                {/* DYNAMICALLY RENDER table headers based on activeTab */}
                {activeTab === "absent" ? (
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Status</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Time</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {/* DYNAMICALLY RENDER table body based on data length */}
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted p-5">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  <p>Data will be mapped here later.</p>
                  // tableData.map(item => ( ... JSX for each row ... ))
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
