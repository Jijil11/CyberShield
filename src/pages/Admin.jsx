import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import {
  getAllUsers,
  setAllUsers
} from "../utils/planUtils";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());

    const storedScans = JSON.parse(localStorage.getItem("scanHistory")) || [];
    setScans(storedScans);
  }, []);

  const deleteUser = (email) => {
    if (email === "admin@cybershield.com") {
      alert("Default admin cannot be deleted");
      return;
    }

    const updatedUsers = users.filter(u => u.email !== email);
    setUsers(updatedUsers);
    setAllUsers(updatedUsers); 
  };

  const fixThreat = (id) => {
    const updatedScans = scans.map(scan =>
      scan.id === id ? { ...scan, status: "Fixed" } : scan
    );

    setScans(updatedScans);
    localStorage.setItem("scanHistory", JSON.stringify(updatedScans));
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <section className="admin-section">
        <h2>Users</h2>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="danger-btn"
                      onClick={() => deleteUser(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <h2>Scan History</h2>

        {scans.length === 0 ? (
          <p>No scans available</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scans.map(scan => (
                <tr key={scan.id}>
                  <td>{scan.name}</td>
                  <td>{scan.type}</td>
                  <td>{scan.severity}</td>
                  <td>{scan.status}</td>
                  <td>{scan.date}</td>
                  <td>
                    {scan.status !== "Fixed" && (
                      <button
                        className="fix-btn"
                        onClick={() => fixThreat(scan.id)}
                      >
                        Fix
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Admin;
