// --- Imports ---
import React, { useMemo, useState, useEffect } from "react"; // Added useEffect
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import "./Employee.css";

// --- Layout & Component Imports ---
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal"; // Import the modal
import ToastNotification from "../../components/ToastNotification/ToastNotification"; // Import a toast component (code below)

// --- Icon Imports ---
import { ArrowRepeat, CheckCircleFill, PencilSquare, Trash } from "react-bootstrap-icons";

// --- Data Import ---
import { employeeData } from "../../data/employee/Employee"; // Use the shared data source

// --- Main Component ---
function Employee() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get data from navigation

  // --- State Management ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // FIX 1: Initialize state with the imported data
  const [employees, setEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- State for Modal and Toast ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // IMPROVEMENT 3: Check for success messages from other pages (like Edit)
  useEffect(() => {
    if (location.state?.message) {
      setToast({ show: true, message: location.state.message, type: location.state.status });
      // We must refresh the state to see the edits!
      setEmployees([...employeeData]); 
      // Clear the location state so the toast doesn't reappear on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- Handlers ---
  const handleEdit = (employeeId) => {
    const id = employeeId.replace("#", "");
    navigate(`/employee/edit/${id}`);
  };

  // IMPROVEMENT 4: Use a modal instead of window.confirm
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      // Filter out the deleted employee
      const updatedEmployees = employees.filter(emp => emp.id !== employeeToDelete.id);
      setEmployees(updatedEmployees);

      // Show a success toast
      setToast({ show: true, message: `Employee ${employeeToDelete.name} has been deleted.`, type: 'success' });
      
      // Close the modal
      setShowConfirmModal(false);
      setEmployeeToDelete(null);
    }
  };

  // --- Filtering Logic (No changes needed here) ---
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) {
      return employees;
    }
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.shift.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);


  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <div className="container-fluid p-3 p-md-4">
          
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <button className="btn btn-primary sync-button">
              <ArrowRepeat /> <span>Sync</span>
            </button>
            <div className="search-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="table-card bg-white rounded-3 shadow-sm">
            <div className="table-responsive">
              <table className="table employee-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Emp.#</th>
                    <th>Name</th>
                    <th>Shift</th>
                    <th>Status</th>
                    <th>Basic Salary</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees && filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.shift}</td>
                        <td>
                          {/* FIX 2: Corrected icon logic */}
                          <span className={`status-badge ${employee.status.toLowerCase()}`}>
                            <CheckCircleFill className="icon" />
                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                          </span>
                        </td>
                        <td>Rs.{parseInt(employee.basicSalary).toLocaleString()}/-</td>
                        <td className="text-center">
                          <button
                            className="action-button edit-button me-2"
                            onClick={() => handleEdit(employee.id)}
                          >
                            <PencilSquare /> <span>Edit</span>
                          </button>
                          <button
                            className="action-button delete-button"
                            onClick={() => handleDeleteClick(employee)} // Changed to open modal
                          >
                            <Trash /> <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-5">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Modals and Toasts (Render them here) --- */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        body={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
      />
      
      <ToastNotification 
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        type={toast.type}
      />

      <Footer />
    </div>
  );
}
export default Employee;