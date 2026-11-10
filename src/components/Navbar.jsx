
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  CarFront,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container-main navbar-inner">

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <CarFront size={27} />
          </span>

          <span>
            <span className="brand-name">
              DRI<span>VORA</span>
            </span>
            <small>DRIVE YOUR WAY</small>
          </span>
        </Link>

        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>

          <NavLink to="/cars" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Our Cars
          </NavLink>

          <Link to="/#about" className="nav-link">
            About
          </Link>

          <Link to="/#contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/cars" className="find-link">
            Find a Car
          </Link>

          <Link to="/cars" className="nav-book">
            Book Now <ArrowUpRight size={17} />
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <nav className="mobile-nav">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/cars" onClick={closeMenu}>Our Cars</Link>
          <Link to="/#about" onClick={closeMenu}>About</Link>
          <Link to="/#contact" onClick={closeMenu}>Contact</Link>
          <Link to="/cars" onClick={closeMenu}>Book Your Car</Link>
        </nav>
      )}
    </header>
  );
}
