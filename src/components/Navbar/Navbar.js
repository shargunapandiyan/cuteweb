import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/today":
        return "Today Attendence";
      case "/monthly":
        return "Monthly Attendence";
      case "/salary":
        return "Monthly Salary";
      case "/employee":
        return "Empolyee Details";
      case "/dashboard":
      case "/":
      default:
        return "Dashboard";
    }
  };
  return (
    <header className="p-2 d-flex justify-content-between align-items-center bg-white shadow-sm">
      <div className="d-flex align-items-center">
        {/* UPDATED: Use Bootstrap Icon for the menu */}
        <button className="btn btn-link fs-4 me-2" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <h5 className="mb-0">{getPageTitle()}</h5>
      </div>
    </header>
  );
};

export default Navbar;
