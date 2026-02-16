import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { getAllUsers, setCurrentUser, initAdmin } from "../utils/planUtils";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState(""); 

  useEffect(() => {
    initAdmin();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const users = getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) {
      setLoginMessage("❌ Invalid credentials. Please check email, password, or role.");
      return;
    }

    setCurrentUser(user);
    setLoginMessage(""); 

    if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`auth-select ${errors.role ? "error" : ""}`}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="email"
          placeholder={errors.email || "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "error" : ""}
        />

        <input
          type="password"
          placeholder={errors.password || "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "error" : ""}
        />

        <button type="submit">Login</button>

        {loginMessage && <p className="auth-message error">{loginMessage}</p>}
      </form>

      <button
        className="signup-switch-btn"
        onClick={() => navigate("/signup")}
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
};

export default Login;
