import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import TodayAttendance from "./pages/today-attendence/TodayAttendance";
import Monthly from "./pages/Monthly/Monthly";
import Salary from "./pages/Salary/Salary";
import Employee from "./pages/Employee/Employee";
import Profile from "./pages/Profile/Profile";
import EditEmployee from "./pages/EditEmployee/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/today" element={<TodayAttendance />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employee/edit/:employeeId" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
