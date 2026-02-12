import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to CyberShield</h1>
        <p>Protect your system from threats, viruses, and malware.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Real-Time Scan</h3>
            <p>Detect threats instantly and protect your system in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>System Optimization</h3>
            <p>Monitor CPU & RAM usage and optimize performance.</p>
          </div>
          <div className="feature-card">
            <h3>Threat History</h3>
            <p>Keep track of all detected threats and scan results.</p>
          </div>
          <div className="feature-card">
            <h3>Security Tips</h3>
            <p>Learn best practices to stay safe online and offline.</p>
          </div>
        </div>
      </section>

<section className="premium-highlight">
  <h2>Upgrade to Premium</h2>
  <p>Unlock advanced protection, faster scans, and priority security features.</p>

  <div className="premium-features">
    <div className="premium-item">⚡ Faster Threat Detection</div>
    <div className="premium-item">🛡️ Advanced Firewall</div>
    <div className="premium-item">🚀 Performance Boost</div>
    <div className="premium-item">📊 Detailed Security Reports</div>
  </div>

  <Link to="/premium" className="premium-btn">
    Explore Premium Plans
  </Link>
</section>

      <section className="cta">
        <h2>Start protecting your system today!</h2>
        <Link to="/signup" className="btn signup-btn">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;
