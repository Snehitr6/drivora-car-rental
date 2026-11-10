
import { Link } from "react-router-dom";
import {
  CarFront,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container-main">
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="brand footer-logo">
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

            <p className="footer-description">
              Experience the freedom of the road with DRIVORA.
              Discover premium cars, flexible rentals, and a
              driving experience designed around you.
            </p>

            {/* Social Media */}
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <Link to="/">Home</Link>
            <Link to="/cars">Explore Cars</Link>
            <Link to="/#about">About Us</Link>
            <Link to="/#contact">Contact Us</Link>
          </div>

          {/* Car Categories */}
          <div className="footer-column">
            <h3>Our Categories</h3>

            <Link to="/cars">SUV Cars</Link>
            <Link to="/cars">Luxury Cars</Link>
            <Link to="/cars">Sedan Cars</Link>
            <Link to="/cars">Sports Cars</Link>
          </div>

          {/* Contact */}
          <div className="footer-column footer-contact">
            <h3>Get In Touch</h3>

            <a href="https://maps.google.com/" target="_blank" rel="noreferrer">
              <MapPin size={18} />
              <span>Bengaluru, Karnataka, India</span>
            </a>

            <a href="tel:+919876543210">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </a>

            <a href="mailto:hello@drivora.com">
              <Mail size={18} />
              <span>hello@drivora.com</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {currentYear} <span>DRIVORA</span>. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/#contact">Privacy Policy</Link>
            <Link to="/#contact">Terms & Conditions</Link>
          </div>

          <Link to="/cars" className="footer-back-top">
            Explore Cars <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
