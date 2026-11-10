
import Hero from "../components/Hero";
import BookingSearch from "../components/BookingSearch";
import FeaturedCars from "../components/FeaturedCars";
import Testimonials from "../components/Testimonials";
import {
  ShieldCheck,
  Wallet,
  Headphones,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const stats = [
    ["50+", "Premium Cars"],
    ["1,200+", "Happy Customers"],
    ["15+", "Pickup Locations"],
    ["24/7", "Customer Support"],
  ];

  const benefits = [
    [ShieldCheck, "Safe & Secure", "Well-maintained and fully insured vehicles."],
    [Wallet, "Best Prices", "Transparent pricing with no hidden charges."],
    [Headphones, "24/7 Support", "Our team is always ready to help you."],
    [MapPin, "Easy Pickup", "Convenient pickup and drop-off locations."],
  ];

  return (
    <>
      <Hero />
      <BookingSearch />

      <section className="container-main stats-section">
        <div className="stats-grid">
          {stats.map(([number, label]) => (
            <div key={label}>
              <h3>{number}</h3>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedCars />
      <Testimonials />


      <section id="about" className="about-section">
        <div className="container-main about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=85"
              alt="Premium rental vehicle"
              loading="lazy"
            />
          </div>

          <div>
            <p className="eyebrow">ABOUT DRIVORA</p>
            <h2>Every Journey <span>Starts Here.</span></h2>
            <p className="about-description">
              At DRIVORA, we make car rentals simple, convenient and
              enjoyable. Whether you need a luxury vehicle for a special
              occasion or a comfortable car for a road trip, we have the
              right vehicle for you.
            </p>

            <ul className="about-list">
              {[
                "Wide range of premium vehicles",
                "Simple and convenient booking",
                "Transparent rental pricing",
                "Dedicated customer support",
              ].map((item) => (
                <li key={item}>
                  <CheckCircle2 /> {item}
                </li>
              ))}
            </ul>

            <a href="/cars" className="dark-button">
              Discover Our Cars <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container-main">
          <div className="center-heading">
            <p className="eyebrow">WHY CHOOSE US</p>
            <h2>Rental Made <span>Easy</span></h2>
            <p>Enjoy a better car rental experience with comfort, convenience and premium service.</p>
          </div>

          <div className="benefits-grid">
            {benefits.map(([Icon, title, description]) => (
              <article key={title} className="benefit-card">
                <div className="benefit-icon"><Icon size={27} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container-main">
          <div className="cta-card">
            <p className="eyebrow">READY FOR YOUR NEXT TRIP?</p>
            <h2>Your Perfect Ride<br />Is Waiting.</h2>
            <p>Find your dream car and start your journey today.</p>
            <a href="/cars" className="primary-button">
              Browse All Cars <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
