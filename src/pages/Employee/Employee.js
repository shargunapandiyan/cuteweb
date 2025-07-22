import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Employee.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import ToastNotification from "../../components/ToastNotification/ToastNotification";
import SearchBar from "../../components/SearchBar/SearchBar";

import {
  ArrowRepeat,
  CheckCircleFill,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";

import { employeeData } from "../../data/employee/Employee";

function Employee() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [employees, setEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (location.state?.message) {
      setToast({
        show: true,
        message: location.state.message,
        type: location.state.status,
      });
      setEmployees([...employeeData]);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleEdit = (employeeId) => {
    const id = employeeId.replace("#", "");
    navigate(`/employee/edit/${id}`);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      const updatedEmployees = employees.filter(
        (emp) => emp.id !== employeeToDelete.id
      );
      setEmployees(updatedEmployees);
      setToast({
        show: true,
        message: `Employee ${employeeToDelete.name} has been deleted.`,
        type: "success",
      });
      setShowConfirmModal(false);
      setEmployeeToDelete(null);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
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
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <button className="btn btn-primary sync-button-header">
          <ArrowRepeat /> <span>Sync</span>
        </button>

        <div className="container-fluid p-2 p-md-4">
          <div className="mb-3">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, ID, or shift"
            />
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
                          <span
                            className={`status-badge ${employee.status.toLowerCase()}`}
                          >
                            <CheckCircleFill className="icon" />
                            {employee.status.charAt(0).toUpperCase() +
                              employee.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          Rs.{parseInt(employee.basicSalary).toLocaleString()}/-
                        </td>
                        <td className="text-center">
                          <button
                            className="action-button edit-button me-2"
                            onClick={() => handleEdit(employee.id)}
                          >
                            <PencilSquare /> <span>Edit</span>
                          </button>
                          <button
                            className="action-button delete-button"
                            onClick={() => handleDeleteClick(employee)}
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
