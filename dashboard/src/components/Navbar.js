// src/components/Navbar.js
import React from "react";
import "./Navbar.css"; // Import the CSS file for the navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item">
          <a href="/dashboard" className="navbar-link">
            Dashboard
          </a>
        </li>
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
