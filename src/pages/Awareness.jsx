import { useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Awareness.css";

const Awareness = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b8pdrsp",
        "template_ltifvxc",
        form.current,
        "coQo52oqmsCwF3ZeR"
      )
      .then(
        () => {
          alert("Booking request sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send booking request");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="awareness-container">
      <h1>Cyber Awareness Program</h1>

    <div className="awareness-info">
  <h2>What Will You Learn</h2>

  <div className="learn-cards">
    <div className="learn-card">
      <span className="icon">🎣</span>
      <h3>Phishing Awareness</h3>
      <p>Identify fake emails, links, and scams before they steal your data.</p>
    </div>

    <div className="learn-card">
      <span className="icon">🌐</span>
      <h3>Safe Browsing</h3>
      <p>Learn how to browse the internet safely and avoid malicious websites.</p>
    </div>

    <div className="learn-card">
      <span className="icon">🔐</span>
      <h3>Password Security</h3>
      <p>Create strong passwords and protect accounts from attacks.</p>
    </div>

    <div className="learn-card">
      <span className="icon">🦠</span>
      <h3>Malware Protection</h3>
      <p>Understand malware, ransomware, and how they infect systems.</p>
    </div>

    <div className="learn-card">
      <span className="icon">📱</span>
      <h3>Social Media Safety</h3>
      <p>Protect your privacy and avoid online identity theft.</p>
    </div>
    <div className="learn-card">
  <span className="icon">📶</span>
  <h3>Public Wi-Fi Safety</h3>
  <p>Learn the risks of public Wi-Fi and how to protect your data on open networks.</p>
</div>

<div className="learn-card">
  <span className="icon">💳</span>
  <h3>Online Payment Security</h3>
  <p>Understand safe online transactions and how to avoid payment fraud.</p>
</div>

<div className="learn-card">
  <span className="icon">🧠</span>
  <h3>Cyber Hygiene</h3>
  <p>Best practices to keep your devices and digital life secure every day.</p>
</div>

  </div>
  
</div>



      <div className="booking-section">
        <h2>Book an Awareness Class</h2>

        <form ref={form} onSubmit={sendEmail} className="booking-form">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />

          <select name="class_type" required>
            <option value="">Select Class Type</option>
            <option value="Student Awareness">Student Awareness</option>
            <option value="Corporate Training">Corporate Training</option>
            <option value="Online Workshop">Online Workshop</option>
          </select>

          <textarea
            name="message"
            placeholder="Message (optional)"
          ></textarea>

          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default Awareness;
