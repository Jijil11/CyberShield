import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";
import { getAllUsers, setAllUsers } from "../utils/planUtils";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (name.length < 6) newErrors.name = "Min 6 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (password.length < 8) newErrors.password = "Min 8 characters";

    if (newErrors.name) setName("");
    if (newErrors.email) setEmail("");
    if (newErrors.password) setPassword("");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newUser = {
      name,
      email,
      password,
      role: "user",
      plan: { name: "Free" },
    };

    const users = getAllUsers();
    users.push(newUser);
    setAllUsers(users);

    navigate("/login"); 
  };

  return (
    <div className="auth-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          className={errors.name ? "error" : ""}
          placeholder={errors.name || "Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={errors.email ? "error" : ""}
          placeholder={errors.email || "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={errors.password ? "error" : ""}
          placeholder={errors.password || "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
