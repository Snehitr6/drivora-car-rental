
import { ShieldCheck, Star, Clock, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background" />

      <div className="container-main hero-inner">
        <div className="hero-content">

          <span className="hero-tag">
            <span /> PREMIUM CAR RENTAL EXPERIENCE
          </span>

          <h1>
            Find Your
            <br />
            Perfect <span>Drive.</span>
          </h1>

          <p>
            Explore the freedom of the road with our premium
            collection of cars. Book your perfect ride and make
            every journey memorable.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="primary-button">
              Book Your Ride <ArrowRight size={18} />
            </a>

            <a href="/cars" className="secondary-button">
              Explore Cars
            </a>
          </div>

          <div className="hero-features">
            <div>
              <ShieldCheck />
              <span>
                <b>Fully Insured</b>
                <small>Safe journeys</small>
              </span>
            </div>

            <div>
              <Star />
              <span>
                <b>Top Rated Cars</b>
                <small>Premium quality</small>
              </span>
            </div>

            <div>
              <Clock />
              <span>
                <b>24/7 Support</b>
                <small>Always available</small>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
