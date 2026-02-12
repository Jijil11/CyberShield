import React from "react";
import "../styles/Components.css"; 

const Card = ({ title, children }) => {
  return (
    <div className="custom-card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
