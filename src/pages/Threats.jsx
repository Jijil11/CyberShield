import React, { useContext, useState, useEffect } from "react";
import { SecurityContext } from "../Context/SecurityContext";
import "../Styles/Threats.css";

const Threats = () => {
  const { threats, clearThreats } = useContext(SecurityContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(
      threats.map((t) => ({
        ...t,
        fixed: t.status === "Safe" ? true : false,
      }))
    );
  }, [threats]);

  const handleFixAll = () => {
    setHistory((prev) =>
      prev.map((t) => ({ ...t, fixed: true }))
    );
    clearThreats();
  };

  return (
    <div className="threats-container">
      <h1>Scan & Threat History</h1>

      {history.length === 0 ? (
        <div className="safe-box">No scans yet.</div>
      ) : (
        <>
          <table className="threats-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Date Detected</th>
              </tr>
            </thead>
            <tbody>
              {history.map((t) => (
                <tr
                  key={t.id}
                  className={`animate-row ${t.severity.toLowerCase()}`}
                >
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td className={`severity ${t.severity.toLowerCase()}`}>{t.severity}</td>
                  <td>{t.status}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="fix-btn" onClick={handleFixAll}>
            Fix All Threats
          </button>
        </>
      )}

      <div className="history-section">
        <h2>History Cards</h2>
        {history.map((t) => (
          <div
            key={t.id}
            className={`history-card ${t.fixed ? "fixed" : ""} ${t.severity.toLowerCase()}`}
          >
            <h3>{t.name}</h3>
            <p>Type: {t.type}</p>
            <p>Status: {t.status}</p>
            <p>Date: {t.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Threats;
