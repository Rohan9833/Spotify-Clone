import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎵</span> Spotify<span className="pro-text">Pro</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Nav Links - 'active' class mobile pe toggle hogi */}
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/upload" className="nav-item" onClick={() => setIsOpen(false)}>Upload</Link>
          <div className="nav-auth">
            <Link to="/login" className="nav-item login-link" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="nav-btn" onClick={() => setIsOpen(false)}>Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;