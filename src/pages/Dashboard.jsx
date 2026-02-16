import React, { useContext, useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import { SecurityContext } from "../Context/SecurityContext";

const Dashboard = () => {
  const { threats, startScan, clearThreats, lastScans } = useContext(SecurityContext);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cpu, setCpu] = useState(25);
  const [ram, setRam] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 50) + 25);
      setRam(Math.floor(Math.random() * 50) + 30);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {          
    if (scanning) return;
    if (threats.filter(t => t.status.includes("Threat Detected")).length > 0) {
      alert("Please fix existing threats before scanning again!");
      return;
    }

    setScanning(true);
    setProgress(0);

    let started = false;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          if (!started) {
            const threatDetected = Math.random() > 0.6; 
            startScan("System Scan", "System", !threatDetected);
            started = true;
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const activeThreats = threats.filter(t => t.status.includes("Threat Detected"));

  const threatChartData = [
    { name: "Malware", count: threats.filter(t => t.type === "Malware").length },
    { name: "Virus", count: threats.filter(t => t.type === "Virus").length },
    { name: "Trojan", count: threats.filter(t => t.type === "Trojan").length },
    { name: "Adware", count: threats.filter(t => t.type === "Adware").length },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>System Status</h2>
          <p>
            {activeThreats.length === 0
              ? "System Secure "
              : `${activeThreats.length} Threat(s) Detected `}
          </p>
        </div>
        <div className="card">
          <h2>CPU Usage</h2>
          <p>{cpu}%</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${cpu}%`, background: "#2980b9" }}
            ></div>
          </div>
        </div>
        <div className="card">
          <h2>RAM Usage</h2>
          <p>{ram}%</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${ram}%`, background: "#27ae60" }}
            ></div>
          </div>
        </div>
        <div className="card">
          <h2>Last Scan</h2>
          <p>{lastScans[0]?.date || "Not scanned yet"}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <button className="action-btn scan" onClick={handleScan} disabled={scanning}>
          {scanning ? `Scanning... ${progress}%` : "Start Scan"}
        </button>

        {scanning && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>

      <div className="threats-summary">
        <h2>Recent Threats</h2>
        {threats.length === 0 ? (
          <div className="safe-box">No threats detected</div>
        ) : (
          <table className="threats-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td className={`severity ${t.severity.toLowerCase()}`}>{t.severity}</td>
                  <td>{t.status}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="last-scans">
        <h2>Last Scans</h2>
        <table className="scans-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Threats Found</th>
            </tr>
          </thead>
          <tbody>
            {lastScans.map((scan) => (
              <tr key={scan.id}>
                <td>{scan.date}</td>
                <td>{scan.threats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="threat-types">
        <h2>Threat Type Distribution</h2>
        {["Malware", "Virus", "Trojan", "Adware"].map((type) => {
          const count = threats.filter((t) => t.type === type).length;
          const percentage = Math.min((count / 5) * 100, 100); // scale for demo
          return (
            <div key={type} className="threat-type-bar">
              <span>
                {type} ({count})
              </span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="security-tips">
        <h2>Security Tips</h2>
        <div className="tips-cards">
          <div className="tip-card">Use strong passwords 🔒</div>
          <div className="tip-card">Enable two-factor authentication ✅</div>
          <div className="tip-card">Avoid suspicious links ⚠️</div>
          <div className="tip-card">Keep your system updated ⬆️</div>
          <div className="tip-card">Backup your data regularly 💾</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;