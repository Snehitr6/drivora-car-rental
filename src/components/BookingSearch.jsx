
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Clock,
  ArrowLeftRight,
  Search,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const localDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function BookingSearch() {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const today = localDate(new Date());
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const [form, setForm] = useState({
    pickup: "Bengaluru",
    dropoff: "Bengaluru",
    pickupDate: today,
    pickupTime: "10:00",
    returnDate: localDate(tomorrowDate),
    returnTime: "10:00",
  });

  const [error, setError] = useState("");

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.pickup.trim() || !form.dropoff.trim()) {
      setError("Enter both pickup and drop-off locations.");
      return;
    }

    if (form.pickupDate < today || form.returnDate < form.pickupDate) {
      setError("Please select valid rental dates.");
      return;
    }

    if (
      form.returnDate === form.pickupDate &&
      form.returnTime <= form.pickupTime
    ) {
      setError("Return time must be later than pickup time.");
      return;
    }

    updateBooking({
      ...form,
      carId: null,
      customer: null,
      bookingId: null,
    });

    navigate("/cars");
  };

  const field =
    "w-full h-12 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-orange-500";

  return (
    <section id="booking" className="booking-section">
      <div className="container-main">
        <form className="booking-card" onSubmit={submit}>

          <div className="flex justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-xl font-black">Find Your Rental Car</h2>
              <p className="text-sm text-gray-400 mt-1">
                Choose your location and travel dates
              </p>
            </div>
            <span className="booking-badge">QUICK BOOKING</span>
          </div>

          <div className="booking-grid">

            <div>
              <label><MapPin /> PICKUP LOCATION</label>
              <input
                className={field}
                name="pickup"
                value={form.pickup}
                onChange={change}
                required
              />
            </div>

            <div>
              <label><MapPin /> DROP-OFF LOCATION</label>
              <div className="flex gap-2">
                <input
                  className={field}
                  name="dropoff"
                  value={form.dropoff}
                  onChange={change}
                  required
                />
                <button
                  type="button"
                  className="swap-button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      pickup: prev.dropoff,
                      dropoff: prev.pickup,
                    }))
                  }
                  aria-label="Swap locations"
                >
                  <ArrowLeftRight />
                </button>
              </div>
            </div>

            <div>
              <label><CalendarDays /> PICKUP DATE</label>
              <input
                className={field}
                type="date"
                name="pickupDate"
                min={today}
                value={form.pickupDate}
                onChange={change}
                required
              />
              <div className="time-field">
                <Clock />
                <input
                  type="time"
                  name="pickupTime"
                  value={form.pickupTime}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <div>
              <label><CalendarDays /> RETURN DATE</label>
              <input
                className={field}
                type="date"
                name="returnDate"
                min={form.pickupDate}
                value={form.returnDate}
                onChange={change}
                required
              />
              <div className="time-field">
                <Clock />
                <input
                  type="time"
                  name="returnTime"
                  value={form.returnTime}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <button className="search-button" type="submit">
              <Search size={19} /> Search Cars
            </button>

          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        </form>
      </div>
    </section>
  );
}
