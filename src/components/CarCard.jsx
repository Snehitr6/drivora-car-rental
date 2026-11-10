
import { Link } from "react-router-dom";
import {
  Users,
  Fuel,
  Settings2,
  Star,
  ArrowUpRight,
} from "lucide-react";

import { formatPrice } from "../data/cars";

export default function CarCard({ car }) {
  if (!car) return null;

  return (
    <article className="car-card">
      <div className="car-card-image">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
        />

        <span className="car-category">
          {car.category}
        </span>

        <span className={car.available ? "available" : "booked"}>
          {car.available ? "Available" : "Booked"}
        </span>
      </div>

      <div className="car-card-body">
        <div className="flex justify-between gap-2">
          <div>
            <h3>{car.name}</h3>
            <p className="car-model">{car.model}</p>
          </div>

          <span className="car-rating">
            <Star size={15} fill="currentColor" />
            {car.rating}
          </span>
        </div>

        <div className="car-specs">
          <div>
            <Users />
            <span>{car.seats} Seats</span>
          </div>

          <div>
            <Fuel />
            <span>{car.fuel}</span>
          </div>

          <div>
            <Settings2 />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="car-card-bottom">
          <div>
            <small>Starting from</small>
            <strong>
              {formatPrice(car.price)}
              <small> /day</small>
            </strong>
          </div>

          <Link
            to={`/cars/${encodeURIComponent(String(car.id))}`}
            className="details-button"
          >
            Details <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
