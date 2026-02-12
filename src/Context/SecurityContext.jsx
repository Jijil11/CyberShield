// SecurityContext can manage things like:Detected threats Scan results Scan status (running / completed)
// Security alerts Clear or fix threats Security logs / history
import { createContext, useState, useRef, useEffect } from "react";


export const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [threats, setThreats] = useState([]);
  const [lastScans, setLastScans] = useState([]);
  const isScanningRef = useRef(false);

  const types = ["Malware", "Virus", "Trojan", "Adware"];
  const severities = ["Low", "Medium", "High"];

  useEffect(() => {
    const savedScans = JSON.parse(localStorage.getItem("allScans")) || [];
    setThreats(savedScans);
    setLastScans(savedScans);
  }, []);

  const startScan = (target = "Unknown", type = "System", safe = true) => {
    if (isScanningRef.current) return;
    isScanningRef.current = true;

    const timestamp = new Date().toLocaleString();

    const scanResult = {
      id: Date.now(),
      name: target,
      type: safe ? type : types[Math.floor(Math.random() * types.length)],
      severity: safe ? "None" : severities[Math.floor(Math.random() * severities.length)],
      status: safe ? "Safe" : "Threat Detected",
      date: timestamp,
    };

    // Save scans to state and localStorage
    const updatedScans = [scanResult, ...threats];
    setThreats(updatedScans);
    setLastScans(updatedScans);
    localStorage.setItem("allScans", JSON.stringify(updatedScans));

    setTimeout(() => {
      isScanningRef.current = false;
    }, 500);
  };

  const clearThreats = () => {
    setThreats([]);
    localStorage.removeItem("allScans");
  };

  return (
    <SecurityContext.Provider value={{ threats, lastScans, startScan, clearThreats }}>
      {children}
    </SecurityContext.Provider>
  );
};
