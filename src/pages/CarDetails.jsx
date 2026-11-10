
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Fuel,
  Settings2,
  Gauge,
  Star,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import { cars, formatPrice } from "../data/cars";
import { useBooking } from "../context/BookingContext";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateBooking } = useBooking();

  const car = cars.find(
    (item) => String(item.id) === String(id)
  );

  const [activeImage, setActiveImage] = useState(0);

  if (!car) {
    return (
      <main className="empty-state min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-black">Car Not Found</h2>
        <p className="text-gray-500">
          This vehicle is currently unavailable.
        </p>
        <button
          onClick={() => navigate("/cars")}
          className="search-button"
        >
          Explore Cars
        </button>
      </main>
    );
  }

  const gallery =
    car.gallery?.length > 0
      ? car.gallery
      : [car.image];

  const specs = [
    [Users, "Passengers", `${car.seats} Seats`],
    [Fuel, "Fuel Type", car.fuel],
    [Settings2, "Transmission", car.transmission],
    [Gauge, "Mileage", car.mileage],
  ];

  const bookNow = () => {
    if (!car.available) return;

    // Save the selected car ID as a string.
    updateBooking({
      carId: String(car.id),
      total: 0,
      days: 1,
      bookingId: "",
    });

    navigate("/booking");
  };

  return (
    <main className="details-page">

      {/* Banner */}
      <section className="page-banner">
        <div className="container-main">
          <button
            className="back-button"
            onClick={() => navigate("/cars")}
          >
            <ArrowLeft size={18} />
            Back to Cars
          </button>

          <p className="eyebrow mt-6">
            DRIVORA PREMIUM COLLECTION
          </p>

          <h1>{car.name}</h1>
          <p>{car.model}</p>
        </div>
      </section>

      {/* Main Details */}
      <section className="container-main details-content">
        <div className="details-grid">

          {/* Left Column */}
          <div>
            <div className="details-main-image">
              <img
                src={gallery[activeImage]}
                alt={car.name}
              />
              <span>{car.category}</span>
            </div>

            {/* Image Gallery */}
            {gallery.length > 1 && (
              <div className="gallery-thumbnails">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={
                      activeImage === index ? "selected" : ""
                    }
                  >
                    <img
                      src={image}
                      alt={`${car.name} view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications */}
            <div className="spec-grid">
              {specs.map(([Icon, label, value]) => (
                <div className="spec-card" key={label}>
                  <Icon />
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-2xl font-black mb-4">
                About This Car
              </h2>

              <p className="text-gray-500 leading-8">
                Experience exceptional comfort, performance,
                and style with the {car.name}. Designed for
                memorable journeys, city drives, and business
                trips, this vehicle offers a comfortable and
                premium driving experience.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10">
              <h2 className="text-2xl font-black mb-5">
                Included Features
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(car.features || []).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={19}
                      className="text-orange-500"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <aside className="details-sidebar h-fit">
            <div className="flex justify-between items-center">
              <span className="text-orange-500 font-bold text-sm">
                <Star
                  size={16}
                  fill="currentColor"
                  className="inline"
                />
                {" "}{car.rating}
              </span>

              <span className={car.available ? "available" : "booked"}>
                {car.available ? "Available" : "Booked"}
              </span>
            </div>

            <h2>{car.name}</h2>
            <p className="text-gray-500 leading-7">
              {car.model}
            </p>

            <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
              <ShieldCheck className="text-orange-500" size={20} />
              Comfortable and convenient rental experience
            </div>

            <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
              <CalendarDays className="text-orange-500" size={20} />
              Flexible rental duration
            </div>

            {/* Price Options */}
            <h3 className="font-black mt-8 mb-4">
              Rental Pricing
            </h3>

            <div className="price-options">
              <div>
                <span>Daily</span>
                <strong>{formatPrice(car.price)}</strong>
              </div>

              <div>
                <span>Weekly</span>
                <strong>{formatPrice(car.weeklyPrice)}</strong>
              </div>

              <div>
                <span>Monthly</span>
                <strong>{formatPrice(car.monthlyPrice)}</strong>
              </div>
            </div>

            <button
              onClick={bookNow}
              disabled={!car.available}
              className="search-button w-full mt-6"
            >
              {car.available ? "Book This Car" : "Currently Unavailable"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              No payment is processed at this demo stage.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
