import React from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dataentry" className={({ isActive }) => (isActive ? "active" : "")}>
            Data Entry
          </NavLink>
        </li>
        <li>
          <NavLink to="/results" className={({ isActive }) => (isActive ? "active" : "")}>
            Results
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
