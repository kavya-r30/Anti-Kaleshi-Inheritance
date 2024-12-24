import React from "react";
import logo from "../assets/logo.png"; // Ensure the logo path is correct
import "./Navbar.css"; // Import the CSS file for navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <ul className="navbar-links">
        {/* Center the Dashboard link */}
        <div className="centered-link">
          <li className="navbar-item">
            <a href="/dashboard" className="navbar-link">
              Dashboard
            </a>
          </li>
        </div>
        {/* Other links remain as they are */}
        <li className="navbar-item">
          <a href="/login" className="navbar-link">
            Login
          </a>
        </li>
        <li className="navbar-item">
          <a href="/signup" className="navbar-link">
            Signup
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
