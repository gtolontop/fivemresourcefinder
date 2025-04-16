
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerClose, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/resources", label: "Resources" },
    { path: "/store", label: "Store" },
    { path: "/about", label: "About" },
    { path: "/login", label: "Login" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        
        {isMobile ? (
          <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DrawerTrigger asChild>
              <button 
                className="mobile-menu-button" 
                aria-label="Toggle menu"
              >
                <Menu size={24} color="#fff" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-background">
              <div className="mobile-menu-header">
                <DrawerClose asChild>
                  <button className="mobile-menu-close" aria-label="Close menu">
                    <X size={24} color="#fff" />
                  </button>
                </DrawerClose>
              </div>
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={location.pathname === link.path ? "active-link" : ""}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>
        ) : (
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? "active-link" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
