import React from "react";
import "../styles/Components.css";

const Input = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <input
      className="custom-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
