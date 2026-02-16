import React, { useState, useContext } from "react";
import { SecurityContext } from "../Context/SecurityContext";
import "../Styles/Scan.css";
import { getCurrentUser } from "../utils/planUtils";

const Scan = () => {
  const [progress, setProgress] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const { threats, startScan } = useContext(SecurityContext);

  const currentUser = getCurrentUser();
  const isPremium = currentUser?.plan?.name === "Premium";

  const isUrlSafe = (target) => {
    const suspiciousKeywords = ["virus", "malware", "phishing", "hack"];
    if (!target.startsWith("https://")) return false;
    if (suspiciousKeywords.some((word) => target.toLowerCase().includes(word)))
      return false;
    return true;
  };

  const runScan = (target, type) => {
    if (scanning || !target) return;

    setScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);

          const safe = type === "URL" ? isUrlSafe(target) : Math.random() > 0.3;
          startScan(target, type, safe);

          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const handleUrlScan = () => {
    runScan(url, "URL");
    setUrl("");
  };

  const handleFileScan = () => {
    if (!file || !isPremium) return;
    runScan(file.name, "File");
    setFile(null);
  };

  return (
    <div className="scan-container">
      <h1>Scan Center</h1>

      <div className="scan-card">
        <h2>Scan a URL</h2>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="scan-btn"
          onClick={handleUrlScan}
          disabled={scanning || !url}
        >
          Scan URL
        </button>
      </div>

      <div className="scan-card">
        <h2>Scan a File</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={!isPremium}
        />
        <button
          className="scan-btn"
          onClick={handleFileScan}
          disabled={scanning || !file || !isPremium}
        >
          {isPremium ? "Scan File" : "Premium Required"}
        </button>
      </div>

      {scanning && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p>Scanning... {progress}%</p>
        </div>
      )}

      <div className="scan-results">
        <h2>Detected Threats</h2>
        {threats.length === 0 ? (
          <p className="no-results">No threats detected yet</p>
        ) : (
          <table>
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
                  <td className={`severity ${t.severity?.toLowerCase()}`}>
                    {t.severity}
                  </td>
                  <td>{t.status}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Scan;
