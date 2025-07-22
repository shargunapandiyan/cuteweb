import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AttendanceGauge from "../../components/AttendanceGauge/AttendanceGauge";

import absent from "../../assets/images/dashboard/absent.png";
import employee from "../../assets/images/dashboard/employee.png";
import late_hours from "../../assets/images/dashboard/late-hours.png";
import present from "../../assets/images/dashboard/present.png";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // const [attendancePercent, setAttendanePercent] = useState(78); used to fututre remove belwo data
  const [attendancePercent] = useState(78);

  // ---   API binding. ---
  const summaryData = [
    { id: 1, title: "Employee", value: 3, image: employee, color: "#e0e7ff" },
    { id: 2, title: "Present", value: 2, image: present, color: "#dcfce7" },
    { id: 3, title: "Absent", value: 1, image: absent, color: "#fee2e2" },
    {
      id: 4,
      title: "Late Entry",
      value: 2,
      image: late_hours,
      color: "#fef3c7",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Call the Header*/}
      <Navbar toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Call the Sidebar */}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      {/* The page-content*/}
      <div className="page-content">
        <div className="container-fluid mt-4">
          {/* Gauge import */}
          <div className="d-flex justify-content-center mb-4">
            <div className="card gauge-card col-12 col-md-8 col-lg-6">
              <AttendanceGauge percent={attendancePercent} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Today Attendence Summery</h6>
            <NavLink to="/today">
              <button className="btn btn-primary rounded-pill px-3">
                view
              </button>
            </NavLink>
          </div>

          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="summary-card text-center p-3">
                <img
                  src={employee}
                  alt="Employee"
                  className="mx-auto mb-2"
                  style={{ width: "50px" }}
                />
                <h6>Employee</h6>
                <strong>3</strong>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="summary-card text-center p-3">
                <img
                  src={present}
                  alt="Present"
                  className="mx-auto mb-2"
                  style={{ width: "50px" }}
                />
                <h6>Present</h6>
                <strong>2</strong>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="summary-card  text-center p-3">
                <img
                  src={absent}
                  alt="Absent"
                  className="mx-auto mb-2"
                  style={{ width: "50px" }}
                />
                <h6>Absent</h6>
                <strong>1</strong>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="summary-card text-center p-3">
                <img
                  src={late_hours}
                  alt="Late hours"
                  className="mx-auto mb-2"
                  style={{ width: "50px" }}
                />
                <h6>Late Entry</h6>
                <strong>2</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
