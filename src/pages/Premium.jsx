import React, { useState, useEffect } from "react";
import "../Styles/Premium.css";
import {
  getCurrentUser,
  setCurrentUser,
  getAllUsers,
  setAllUsers
} from "../utils/planUtils";

const plans = [
  { name: "Basic", features: ["Scan URLs", "Basic File Scan"] },
  { name: "Standard", features: ["Scan URLs", "Enhanced File Scan"] },
  { name: "Premium", features: ["Scan URLs", "Full File Scan", "Advanced Reports"] },
];

const Premium = () => {
  const [currentUser, setCurrent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrent(getCurrentUser());
  }, []);

  if (!currentUser) {
    return <h2 style={{ color: "white" }}>Please login again</h2>;
  }

  const updateUserEverywhere = (updatedUser) => {
    setCurrentUser(updatedUser);

    const users = getAllUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      setAllUsers(users);
    }

    setCurrent(updatedUser);
  };

  const buyPlan = (planName) => {
    if (currentUser.plan) {
      setMessage("❌ Please cancel your current plan before buying a new one.");
      return;
    }

    updateUserEverywhere({
      ...currentUser,
      plan: { name: planName }
    });

    setMessage(` ${planName} plan activated successfully!`);
  };

  const cancelPlan = () => {
    updateUserEverywhere({
      ...currentUser,
      plan: null
    });

    setMessage(" Subscription cancelled. You can now choose another plan.");
  };

  return (
    <div className="premium-container">
      <h1>Choose Your Plan</h1>

      <p>
        Current Plan:{" "}
        <b>{currentUser.plan?.name || "No active plan"}</b>
      </p>

      <div className="plans">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`plan-card ${
              currentUser.plan?.name === plan.name ? "active" : ""
            }`}
          >
            <h2>{plan.name}</h2>

            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {currentUser.plan?.name === plan.name ? (
              <button disabled>Active</button>
            ) : (
              <button onClick={() => buyPlan(plan.name)}>
                Buy
              </button>
            )}
          </div>
        ))}
      </div>

      {currentUser.plan && (
        <button
          className="cancel-btn"
          onClick={cancelPlan}
          style={{ marginTop: "1rem" }}
        >Cancel
        </button>
      )}

      {message && (
        <p style={{ marginTop: "1rem", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Premium;
