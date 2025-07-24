import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEmployee.css";

// Import layout components
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { employeeData } from "../../data/employee/Employee";

// --- UPDATED: Imported new icons for the form fields ---
import {
  Person,
  Layers,
  CashCoin,
  Check2Circle,
  XCircle,
} from "react-bootstrap-icons";

function EditEmployee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { employeeId } = useParams();
  const navigate = useNavigate();

  // --- Core logic remains 100% the same ---
  const [formData, setFormData] = useState({
    id: "", // Add id to state to display it in the header
    shift: "",
    name: "",
    basicSalary: "",
  });

  useEffect(() => {
    const employeeToEdit = employeeData.find(
      (emp) => emp.id.replace("#", "") === employeeId
    );
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    } else {
      alert("Employee not found!");
      navigate("/employee");
    }
  }, [employeeId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeIndex = employeeData.findIndex(
      (emp) => emp.id.replace("#", "") === employeeId
    );
    if (employeeIndex !== -1) {
      employeeData[employeeIndex] = {
        ...employeeData[employeeIndex],
        ...formData,
      };
    }
    navigate("/employee", {
      state: {
        message: `Successfully updated ${formData.name}.`,
        status: "success",
      },
    });
  };

  const handleCancel = () => {
    navigate("/employee");
  };
  // --- End of core logic ---

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} pageTitle="Edit Employee" />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <div className="container-fluid p-3 p-md-4">
          {/* --- The main card with entry animation --- */}
          <div className="edit-form-card animate-fade-in-up">
            {/* --- NEW: A clear header for context --- */}
            <div className="card-header-custom">
              <h4 className="card-title-custom">Edit Employee Details</h4>
              <p className="card-subtitle-custom">
                Updating record for {formData.id}
              </p>
            </div>

            <div className="card-body-custom">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* --- Employee Name Field --- */}
                  <div className="col-md-6 form-group-animated">
                    <label htmlFor="name" className="form-label">
                      Employee Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Person />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* --- Shift Field --- */}
                  <div className="col-md-6 form-group-animated">
                    <label htmlFor="shift" className="form-label">
                      Shift
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Layers />
                      </span>
                      <select
                        id="shift"
                        name="shift"
                        className="form-select"
                        value={formData.shift}
                        onChange={handleChange}
                      >
                        <option value="General Shift">General Shift</option>
                        <option value="Night Shift">Night Shift</option>
                      </select>
                    </div>
                  </div>

                  {/* --- Salary Field --- */}
                  <div className="col-md-12 form-group-animated">
                    <label htmlFor="basicSalary" className="form-label">
                      Salary (₹)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <CashCoin />
                      </span>
                      <input
                        type="number"
                        id="basicSalary"
                        name="basicSalary"
                        className="form-control"
                        value={formData.basicSalary}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary-custom"
                    onClick={handleCancel}
                  >
                    <XCircle className="me-2" />
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom">
                    <Check2Circle className="me-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditEmployee;
