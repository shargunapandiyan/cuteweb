// --- Imports ---
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";

// --- Layout & Child Component Imports ---
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import ToastNotification from "../../components/ToastNotification/ToastNotification"; // <-- 1. Import the Toast component

// --- Icon Imports ---
import {
  PersonFill,
  Pencil,
  LayersFill,
  WalletFill,
  PersonCircle,
  BoxArrowRight,
  ChevronRight,
} from "react-bootstrap-icons";

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // --- 2. ADD STATE FOR THE TOAST NOTIFICATION ---
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleLogout = () => {
    navigate("/", {
      state: { message: "You have been logged out.", status: "success" },
    });
  };

  // --- 3. CREATE A FUNCTION TO HANDLE THE SUCCESS MESSAGE FROM THE MODAL ---
  const handleProfileUpdateSuccess = (message) => {
    setShowEditModal(false); // First, close the modal
    setToast({ show: true, message: message, type: "success" }); // Then, show the toast
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} pageTitle="Profile" />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content profile-page-content">
        {/* ... All your other profile content remains the same ... */}
        <div className="container-fluid p-3 p-md-4">
          <div className="profile-card">
            {/* Header, Quick Actions, Settings List etc. */}
            <header className="profile-header">
              <div className="avatar">
                <PersonFill />
              </div>
              <div className="user-info">
                <h4>CuteWeb</h4>
                <p>CuteWeb</p>
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
                    <LayersFill className="icon" />
                    <span>Attendance</span>
                  </NavLink>
                </div>
                <div className="col-6">
                  <NavLink to="/salary" className="quick-action-card">
                    <WalletFill className="icon" />
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
                  <BoxArrowRight className="settings-icon" />
                  <span>Log Out</span>
                  <ChevronRight className="settings-chevron" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* --- 4. PASS THE NEW FUNCTION AS A PROP TO THE MODAL --- */}
      <EditProfileModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSuccess={handleProfileUpdateSuccess} // Pass the success handler
      />

      {/* --- 5. RENDER THE TOAST COMPONENT --- */}
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
