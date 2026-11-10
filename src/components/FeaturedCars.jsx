
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cars } from "../data/cars";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  return (
    <section className="featured-section">
      <div className="container-main">

        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR COLLECTION</p>
            <h2>
              Explore Our <span>Premium Cars</span>
            </h2>
            <p>Choose from our handpicked collection of premium vehicles.</p>
          </div>

          <Link to="/cars" className="view-all">
            View All Cars <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {cars.slice(0, 6).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </div>
    </section>
  );
}
