import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import {
  Grid1x2Fill,
  CalendarCheck,
  CashCoin,
  PeopleFill,
  PersonCircle,
  BoxArrowRight,
  XLg,
} from "react-bootstrap-icons";
import User from "../../assets/images/sidebar/user.png";

const Sidebar = ({ isOpen, onCloseClick }) => {
  const navigate = useNavigate();

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "sidebar-link active" : "sidebar-link";
  };

  
  const handleLogout = () => {
    console.log("Logging out...");
        onCloseClick();

    
    navigate("/", {
      state: {
        message: "You have been logged out successfully.",
        status: "success",
      },
    });
  };

  return (
    <div className={`sidebar shadow-sm ${isOpen ? "open" : ""}`}>
      {/* Top Profile Section */}
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <img
              src={User}
              alt="profile"
              className="img-fluid rounded-circle me-3"
              style={{ width: "50px" }}
            />
            <h5 className="fw-bold mb-0">CuteWeb</h5>
          </div>
          <button
            className="btn btn-link text-dark fs-4 p-0"
            onClick={onCloseClick}
          >
            <XLg />
          </button>
        </div>


        <nav className="nav flex-column">
          <NavLink
            to="/dashboard"
            className={getNavLinkClass}
            onClick={onCloseClick}
          >
            <Grid1x2Fill className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/today"
            className={getNavLinkClass}
            onClick={onCloseClick}
          >
            <CalendarCheck className="sidebar-icon" />
            <span>Today Attendance</span>
          </NavLink>

          <NavLink
            to="/monthly"
            className={getNavLinkClass}
            onClick={onCloseClick}
          >
            <CashCoin className="sidebar-icon" />
            <span>Monthly Salary</span>
          </NavLink>

          <NavLink
            to="/employee"
            className={getNavLinkClass}
            onClick={onCloseClick}
          >
            <PeopleFill className="sidebar-icon" />
            <span>Employee</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={getNavLinkClass}
            onClick={onCloseClick}
          >
            <PersonCircle className="sidebar-icon" />
            <span>Profile</span>
          </NavLink>
        </nav>
      </div>


      <div className="sidebar-footer">
        <hr className="mx-2" />

        <div
          className="sidebar-link logout-link"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <BoxArrowRight className="sidebar-icon" />
          <span>Logout</span>
        </div>
        <div className="text-center mt-3">
          <p className="small mb-0 text-muted">App Version 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
