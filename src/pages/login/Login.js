// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginIcon from "../../assets/images/login/login-icon.png";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isToastExiting, setIsToastExiting] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Check if location.state has the message we sent from the sidebar
    if (location.state?.message) {
      setLoginStatus(location.state.status || "success");
      setLoginMessage(location.state.message);
      setIsToastExiting(false);

      // Hide the toast after a few seconds
      setTimeout(() => {
        setIsToastExiting(true);
      }, 2500);

      setTimeout(() => {
        setLoginMessage("");
      }, 3000);

      // Clear the history so the message doesn't reappear on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]); // runs only when the location changes

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoginMessage("");
      setLoginStatus("");
      return;
    }

    setErrors({});

    if (username === "a" && password === "a") {
      setLoginStatus("success");
      setLoginMessage("Login successful! Redirecting...");
      setIsToastExiting(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      setLoginStatus("error");
      setLoginMessage("Invalid username or password");
      setIsToastExiting(false);

      setTimeout(() => {
        setIsToastExiting(true);
      }, 2500);

      setTimeout(() => {
        setLoginMessage("");
      }, 3000);
    }
  };

  return (
    <div className="login-page-container">
      {/* Toast Notification Area */}
      {loginMessage && (
        <div className="custom-toast-container">
          <div
            className={`custom-toast ${loginStatus} ${
              isToastExiting ? "hide" : "show"
            }`}
          >
            <div className="icon">
              <i
                className={`bi ${
                  loginStatus === "success"
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }`}
              ></i>
            </div>
            <div className="text">
              <strong>
                {loginStatus === "success" ? "Success!" : "Error!"}
              </strong>
              <div>{loginMessage}</div>
            </div>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="login-card">
        <div className="text-center mb-4">
          <img
            src={loginIcon}
            alt="Login icon"
            style={{ width: "80px", height: "80px" }}
          />
          <h4 className="fw-bold mt-3 mb-1">Welcome back!</h4>
          <p className="text-muted">Welcome back! You've been missed.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Type Username Here"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: null }));
              }}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: null }));
              }}
              placeholder="Type password Here"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
