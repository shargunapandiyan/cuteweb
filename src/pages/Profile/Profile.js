import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import User from "../../assets/images/sidebar/user.png";

import {
  LayersFill,
  WalletFill,
  PersonCircle,
  BoxArrowRight,
  ChevronRight,
  Pencil,
} from "react-bootstrap-icons";

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleLogout = () => {
    navigate("/", {
      state: { message: "You have been logged out.", status: "success" },
    });
  };

  const handleProfileUpdateSuccess = (message) => {
    setShowEditModal(false);
    setToast({ show: true, message: message, type: "success" });
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} pageTitle="Profile" />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content profile-page-content">
        <div className="container-fluid p-3 p-md-4">
          <div className="profile-card animate-fade-in-up">
            <header className="profile-header">
              <div className="avatar">
                
                <img src={User} alt="User Avatar" />
              </div>
              <div className="user-info">
                <h4>CuteWeb</h4>
                <p>Developer</p>
              </div>
              <button
                className="btn edit-profile-btn"
                onClick={() => setShowEditModal(true)}
              >
                <Pencil />
              </button>
            </header>

            <div className="p-3">
              <div className="row g-3">
                <div className="col-6">
                  <NavLink to="/today" className="quick-action-card">
                    <div className="quick-action-icon-wrapper bg-primary-light">
                      <LayersFill className="icon text-primary" />
                    </div>
                    <span>Attendance</span>
                  </NavLink>
                </div>
                <div className="col-6">
                  <NavLink to="/salary" className="quick-action-card">
                    <div className="quick-action-icon-wrapper bg-success-light">
                      <WalletFill className="icon text-success" />
                    </div>
                    <span>Salary</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h6 className="settings-section-title">Account Settings</h6>
              <ul className="settings-list">
                <li
                  className="settings-item"
                  onClick={() => setShowEditModal(true)}
                >
                  <PersonCircle className="settings-icon" />
                  <span>Edit Profile</span>
                  <ChevronRight className="settings-chevron" />
                </li>
                <li className="settings-item" onClick={handleLogout}>
                  <BoxArrowRight className="settings-icon text-danger" />
                  <span className="text-danger">Log Out</span>
                  <ChevronRight className="settings-chevron" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <EditProfileModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSuccess={handleProfileUpdateSuccess}
      />

      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default Profile;
