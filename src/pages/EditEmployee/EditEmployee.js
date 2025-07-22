import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEmployee.css";

// Import your layout components
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

// FIX 2: Ensure this import path is correct and it's your single source of truth for employee data
import { employeeData } from "../../data/employee/Employee"; 

function EditEmployee() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shift: "",
    name: "",
    basicSalary: "",
  });

  // When the component loads, find the employee and pre-fill the form
  useEffect(() => {
    // FIX 2: The find logic is now robust. It compares the ID from the URL ('1001')
    // with the ID in the data ('#1001'), ignoring the '#'.
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

    // IMPROVEMENT: Update the master data array
    // This makes the change visible when you navigate back.
    // NOTE: In a real app, an API call would go here. This is for client-side simulation.
    const employeeIndex = employeeData.findIndex(
      (emp) => emp.id.replace("#", "") === employeeId
    );
    if (employeeIndex !== -1) {
      employeeData[employeeIndex] = { ...employeeData[employeeIndex], ...formData };
      console.log("Updated Employee Data Source:", employeeData);
    }

    // IMPROVEMENT 2: Pass a success message back to the employee list page
    // This allows you to show a success toast instead of a blocking alert.
    navigate("/employee", { 
      state: { 
        message: `Successfully updated ${formData.name}.`,
        status: 'success'
      } 
    });
  };

  // FIX 1: Add the missing handleCancel function
  const handleCancel = () => {
    navigate("/employee"); // Go back without saving
  };

  return (
    <div className="page-wrapper">
      <Navbar toggleSidebar={toggleSidebar} pageTitle="Edit Employee" />
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <Sidebar isOpen={sidebarOpen} onCloseClick={toggleSidebar} />

      <div className="page-content">
        <div className="container-fluid p-3 p-md-4">
          <div className="edit-form-card">
            <form onSubmit={handleSubmit}>
              {/* --- Shift Field (as a dropdown) --- */}
              <div className="form-group">
                <label htmlFor="shift" className="form-label">
                  Shift
                </label>
                <select
                  id="shift"
                  name="shift"
                  className="form-control"
                  value={formData.shift}
                  onChange={handleChange}
                >
                  <option value="Morning Shift">Morning Shift</option>
                  <option value="Evening Shift">Evening Shift</option>
                  <option value="Night Shift">Night Shift</option>
                </select>
              </div>

              {/* --- Employee Name Field --- */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* --- Salary Field --- */}
              <div className="form-group">
                <label htmlFor="basicSalary" className="form-label">
                  Salary
                </label>
                <input
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  className="form-control"
                  value={formData.basicSalary}
                  onChange={handleChange}
                />
              </div>

              {/* --- Action Buttons --- */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleCancel} // This will now work correctly
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditEmployee;