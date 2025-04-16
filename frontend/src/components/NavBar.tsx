// NavBar.tsx
import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

interface DrawerContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: ReactElement<{ className?: string }>;
}

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({
  asChild,
  children,
  className,
  ...props
}) => {
  if (asChild) {
    // On clone le ReactElement en lui injectant les props et la classe
    const existingClass = children.props.className || "";
    const newClass = [existingClass, className].filter(Boolean).join(" ");
    return React.cloneElement(children, { ...props, className: newClass });
  }
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
const DrawerContent: React.FC<DrawerContentProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div
    className={`fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background ${className}`}
    {...props}
  >
    <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    {children}
  </div>
);

interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: ReactElement;
}
const DrawerClose: React.FC<DrawerCloseProps> = ({
  asChild,
  children,
  ...props
}) => {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
};

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}
const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const handleOpenChange = (newState: boolean) => {
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const contextValue: DrawerContext = {
    open: isOpen,
    setOpen: handleOpenChange,
  };

  return (
    <div className="relative">
      {/* Cloner chaque enfant valide en lui passant le drawerContext */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as ReactElement<any>, {
          drawerContext: contextValue,
        });
      })}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80"
          onClick={() => handleOpenChange(false)}
        />
      )}
    </div>
  );
};

// Hook responsive
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const NavBar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/resources", label: "Resources" },
    { to: "/store", label: "Store" },
    { to: "/about", label: "About" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        {isMobile ? (
          <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
            {/* Le bouton qui ouvre le menu */}
            <DrawerTrigger
              asChild
              className="mobile-menu-button"
              onClick={() => setMenuOpen(true)}
            >
              {/* On passe directement l’icône, pas un <button> emboîté */}
              <Menu size={24} color="#fff" />
            </DrawerTrigger>

            {/* On affiche le contenu *seulement* si menuOpen */}
            {menuOpen && (
              <DrawerContent>
                <div className="mobile-menu-header">
                  <DrawerClose
                    asChild
                    className="mobile-menu-close"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X size={24} color="#fff" />
                  </DrawerClose>
                </div>
                <ul className="mobile-nav-links">
                  {links.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className={
                          location.pathname === to ? "active-link" : ""
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </DrawerContent>
            )}
          </Drawer>
        ) : (
          <ul className="nav-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ? "active-link" : ""}
                >
                  {label}
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
