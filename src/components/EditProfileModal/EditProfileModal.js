import React, { useState } from "react";

function EditProfileModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    // Returns true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // --- Handles the form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Only proceed if the form is valid
    if (validateForm()) {
      console.log("Submitting profile update:", {
        name: formData.name,
        username: formData.username,

        password: formData.password,
      });

      onSuccess("Profile updated successfully!");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="formName"
                    name="name"
                    placeholder="Enter Your Name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* --- Username Field --- */}
                <div className="mb-3">
                  <label htmlFor="formUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="formUsername"
                    name="username"
                    placeholder="Enter User name"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* --- Password Field --- */}
                <div className="mb-3">
                  <label htmlFor="formPassword" className="form-label">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    id="formPassword"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Leave blank to keep current password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {/* --- Confirm Password Field --- */}
                <div className="mb-4">
                  <label htmlFor="formConfirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="formConfirmPassword"
                    name="confirmPassword"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
