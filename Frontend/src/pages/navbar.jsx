import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Headphones, Menu, Upload, UserRound, X } from "lucide-react";
import "../Styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-mark"><Headphones size={18} /></span>
          <span>Wave<span>Room</span></span>
        </Link>
        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link className={location.pathname === "/" ? "nav-item active" : "nav-item"} to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link className={location.pathname === "/upload" ? "nav-item active" : "nav-item"} to="/upload" onClick={() => setIsOpen(false)}><Upload size={15} /> Upload</Link>
          <div className="nav-auth">
            <Link to="/login" className="login-link" onClick={() => setIsOpen(false)}><UserRound size={15} /> Login</Link>
            <Link to="/register" className="nav-btn" onClick={() => setIsOpen(false)}>Create account</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
