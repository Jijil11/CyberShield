import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>🛡️ CyberShield</p>
      <p>Advanced Security & Threat Detection System</p>
      <p>© {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
};

export default Footer;
