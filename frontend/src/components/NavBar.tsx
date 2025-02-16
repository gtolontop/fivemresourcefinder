import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/resources" className={location.pathname === "/resources" ? "active-link" : ""}>
              Resources
            </Link>
          </li>
          <li>
            <Link to="/store" className={location.pathname === "/store" ? "active-link" : ""}>
              Store
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className={location.pathname === "/login" ? "active-link" : ""}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
