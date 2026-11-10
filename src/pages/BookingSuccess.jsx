
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CarFront,
  CalendarDays,
  MapPin,
  User,
  Mail,
  Phone,
  ArrowRight,
  Home,
} from "lucide-react";

import { cars, formatPrice } from "../data/cars";
import { useBooking } from "../context/BookingContext";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { booking } = useBooking();

  const selectedCar = cars.find(
    (car) => String(car.id) === String(booking.carId)
  );

  if (!booking.bookingId || !selectedCar) {
    return (
      <main className="booking-success-page">
        <div className="booking-success-card">
          <h1>No Booking Found</h1>
          <p>Please complete your booking first.</p>
          <button
            onClick={() => navigate("/cars")}
            className="success-primary-button"
          >
            Explore Cars
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-success-page">
      <div className="booking-success-card">

        {/* Success Icon */}
        <div className="success-icon">
          <CheckCircle2 size={55} />
        </div>

        <span className="success-label">
          DRIVORA BOOKING REQUEST
        </span>

        <h1>Booking Request Submitted!</h1>

        <p className="success-description">
          Thank you for choosing DRIVORA. Your booking request
          has been successfully submitted in this demo.
        </p>

        {/* Booking ID */}
        <div className="success-booking-id">
          <span>YOUR BOOKING REFERENCE</span>
          <strong>{booking.bookingId}</strong>
        </div>

        {/* Selected Car */}
        <div className="success-car">
          <img
            src={selectedCar.image}
            alt={selectedCar.name}
          />

          <div>
            <span>YOUR SELECTED VEHICLE</span>
            <h3>{selectedCar.name}</h3>
            <p>{selectedCar.model}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="success-details">
          <h3>Booking Information</h3>

          <div>
            <span><User size={17} /> Customer</span>
            <strong>{booking.customer?.name || "N/A"}</strong>
          </div>

          <div>
            <span><Mail size={17} /> Email</span>
            <strong>{booking.customer?.email || "N/A"}</strong>
          </div>

          <div>
            <span><Phone size={17} /> Phone</span>
            <strong>{booking.customer?.phone || "N/A"}</strong>
          </div>

          <div>
            <span><MapPin size={17} /> Pickup</span>
            <strong>{booking.pickupLocation || "N/A"}</strong>
          </div>

          <div>
            <span><MapPin size={17} /> Drop-off</span>
            <strong>{booking.dropoffLocation || "N/A"}</strong>
          </div>

          <div>
            <span><CalendarDays size={17} /> Pickup Date</span>
            <strong>{booking.pickupDate || "N/A"}</strong>
          </div>

          <div>
            <span><CalendarDays size={17} /> Drop-off Date</span>
            <strong>{booking.dropoffDate || "N/A"}</strong>
          </div>

          <div>
            <span><CarFront size={17} /> Rental Duration</span>
            <strong>
              {booking.days || 1} Days
            </strong>
          </div>
        </div>

        {/* Total */}
        <div className="success-total">
          <span>Estimated Rental Amount</span>
          <strong>{formatPrice(booking.total || 0)}</strong>
        </div>

        <div className="success-notice">
          <CheckCircle2 size={18} />
          <p>
            Your demo booking request has been saved.
            No actual vehicle reservation or payment has been made.
          </p>
        </div>

        {/* Actions */}
        <div className="success-actions">
          <button
            onClick={() => navigate("/")}
            className="success-primary-button"
          >
            <Home size={17} />
            Back to Home
          </button>

          <button
            onClick={() => navigate("/cars")}
            className="success-secondary-button"
          >
            Explore More Cars
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </main>
  );
}
