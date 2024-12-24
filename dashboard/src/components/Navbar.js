import React from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <div className="centered-link">
          <li className="navbar-item">
            <a href="/dashboard" className="navbar-link">
              Dashboard
            </a>
          </li>
        </div>
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
