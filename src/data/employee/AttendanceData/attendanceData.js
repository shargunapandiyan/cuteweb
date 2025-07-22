// src/data/employee/AttendanceData/attendanceData.js

export const attendanceData = [
  // General Shift (Combined from old Morning/Evening)
  {
    id: "#1001",
    name: "John Peter",
    shift: "general",
    status: "Present",
    time: "09:00 AM",
  },
  {
    id: "#1002",
    name: "Alice Smith",
    shift: "general",
    status: "Present",
    time: "09:03 AM",
  },
  {
    id: "#1003",
    name: "Robert Brown",
    shift: "general",
    status: "Late Entry",
    time: "09:18 AM",
  },
  {
    id: "#1004",
    name: "Emily White",
    shift: "general",
    status: "Absent",
    time: null,
  },
  {
    id: "#2001",
    name: "Michael Green",
    shift: "general",
    status: "Present",
    time: "02:00 PM",
  },
  {
    id: "#2002",
    name: "Jessica Blue",
    shift: "general",
    status: "Late Entry",
    time: "02:25 PM",
  },
  {
    id: "#2003",
    name: "David Black",
    shift: "general",
    status: "Present",
    time: "01:58 PM",
  },

  // Night Shift
  {
    id: "#3001",
    name: "Sarah Grey",
    shift: "night",
    status: "Present",
    time: "10:01 PM",
  },
  {
    id: "#3002",
    name: "Chris Red",
    shift: "night",
    status: "Late Entry",
    time: "10:16 PM",
  },
  {
    id: "#3003",
    name: "Laura Purple",
    shift: "night",
    status: "Absent",
    time: null,
  },
];
