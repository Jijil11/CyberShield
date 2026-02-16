import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import { getCurrentUser, logoutUser } from "../utils/planUtils";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setOpen(false);
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <NavLink to={currentUser.role === "admin" ? "/admin" : "/"} className="navbar-brand">
          🛡️ CyberShield
        </NavLink>

        <div
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          {currentUser.role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/scan" onClick={() => setOpen(false)}>
                  Scan
                </NavLink>
              </li>
              <li>
                <NavLink to="/threats" onClick={() => setOpen(false)}>
                  Threats
                </NavLink>
              </li>
              <li>
                <NavLink to="/awareness" onClick={() => setOpen(false)}>
                  Awareness
                </NavLink>
              </li>
              <li>
                <NavLink to="/premium" onClick={() => setOpen(false)}>
                  Premium
                </NavLink>
              </li>
            </>
          )}

          {currentUser.role === "admin" && (
            <li>
              <NavLink to="/admin" onClick={() => setOpen(false)}>
                Admin Panel
              </NavLink>
            </li>
          )}

          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
