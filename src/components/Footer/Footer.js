import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  // This function helps NavLink apply the 'active' class
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "footer-item active" : "footer-item";
  };

  return (
    <footer className="footer d-flex justify-content-around align-items-center">
      <NavLink to="/dashboard" className={getNavLinkClass}>
        <i className="bi bi-house-door-fill"></i>
        <div>Dashboard</div>
      </NavLink>
      <NavLink to="/today" className={getNavLinkClass}>
        <i className="bi bi-layers"></i>
        <div className="">Today</div>
      </NavLink>
      <NavLink to="/monthly" className={getNavLinkClass}>
        <i className="bi bi-calendar-event"></i>
        <div className="">Monthly</div>
      </NavLink>
      <NavLink to="/salary" className={getNavLinkClass}>
        <i className="bi bi-bag-check"></i>
        <div className="">Salary</div>
      </NavLink>
    </footer>
  );
};

export default Footer;
