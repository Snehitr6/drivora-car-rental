
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Phone,
  Mail,
} from "lucide-react";

import { cars, formatPrice } from "../data/cars";
import { useBooking } from "../context/BookingContext";

export default function Booking() {
  const navigate = useNavigate();

  const { booking, updateBooking } = useBooking();

  // Find selected car using its string ID.
  const selectedCar = cars.find(
    (car) => String(car.id) === String(booking.carId)
  );

  const [formData, setFormData] = useState({
    name: booking.customer?.name || "",
    email: booking.customer?.email || "",
    phone: booking.customer?.phone || "",
    pickupLocation: booking.pickupLocation || "",
    dropoffLocation: booking.dropoffLocation || "",
    pickupDate: booking.pickupDate || "",
    dropoffDate: booking.dropoffDate || "",
    pickupTime: booking.pickupTime || "10:00",
    dropoffTime: booking.dropoffTime || "10:00",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const rentalDays = useMemo(() => {
    if (!formData.pickupDate || !formData.dropoffDate) {
      return 1;
    }

    const start = new Date(
      `${formData.pickupDate}T00:00:00`
    );

    const end = new Date(
      `${formData.dropoffDate}T00:00:00`
    );

    const difference = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return Math.max(1, difference);
  }, [formData.pickupDate, formData.dropoffDate]);

  const total = selectedCar
    ? selectedCar.price * rentalDays
    : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Enter pickup location";
    }

    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = "Enter drop-off location";
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Select pickup date";
    } else if (formData.pickupDate < today) {
      newErrors.pickupDate = "Pickup date cannot be in the past";
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate = "Select drop-off date";
    } else if (
      formData.pickupDate &&
      formData.dropoffDate <= formData.pickupDate
    ) {
      newErrors.dropoffDate = "Drop-off must be after pickup";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCar) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const bookingId = `DRV${Date.now().toString().slice(-8)}`;

    // Save all booking details before moving to confirmation.
    updateBooking({
      ...booking,
      carId: String(selectedCar.id),
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      pickupTime: formData.pickupTime,
      dropoffTime: formData.dropoffTime,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      bookingId,
      total,
      days: rentalDays,
    });

    navigate("/booking-success");
  };

  // Handle missing selected car.
  if (!selectedCar) {
    return (
      <main className="min-h-[65vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
            <CarFront size={36} className="text-orange-500" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            No Car Selected
          </h1>

          <p className="text-gray-500 leading-7 mb-7">
            Please select a vehicle from our collection
            before continuing with your booking.
          </p>

          <button
            onClick={() => navigate("/cars")}
            className="search-button"
          >
            Explore Available Cars
            <ArrowRight size={17} className="inline ml-2" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f8f8f8] min-h-screen py-12 md:py-16">
      <div className="container-main">

        {/* Heading */}
        <div className="mb-9">
          <button
            onClick={() => navigate(`/cars/${selectedCar.id}`)}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-6"
          >
            <ArrowLeft size={18} />
            Back to Car Details
          </button>

          <span className="text-xs font-bold tracking-[2px] text-orange-500">
            DRIVORA RESERVATIONS
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
            Complete Your Booking
          </h1>

          <p className="text-gray-500 mt-3">
            Enter your details and confirm your rental request.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-8 items-start">

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100"
          >

            {/* Personal Information */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <User className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Your contact details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <label className="booking-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="booking-input"
                  />

                  {errors.name && (
                    <p className="booking-error">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="booking-label">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="booking-input-icon" size={18} />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="booking-input pl-11"
                    />
                  </div>

                  {errors.email && (
                    <p className="booking-error">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="booking-label">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="booking-input-icon" size={18} />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="booking-input pl-11"
                    />
                  </div>

                  {errors.phone && (
                    <p className="booking-error">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MapPin className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Pickup & Drop-off
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Where should we arrange your vehicle?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="booking-label">
                    Pickup Location
                  </label>

                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    className="booking-input"
                  />

                  {errors.pickupLocation && (
                    <p className="booking-error">
                      {errors.pickupLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label className="booking-label">
                    Drop-off Location
                  </label>

                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    placeholder="Enter drop-off location"
                    className="booking-input"
                  />

                  {errors.dropoffLocation && (
                    <p className="booking-error">
                      {errors.dropoffLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <CalendarDays className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Rental Schedule
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Select your rental dates and times
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="booking-label">
                    Pickup Date
                  </label>

                  <input
                    type="date"
                    name="pickupDate"
                    min={today}
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="booking-input"
                  />

                  {errors.pickupDate && (
                    <p className="booking-error">
                      {errors.pickupDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="booking-label">
                    Drop-off Date
                  </label>

                  <input
                    type="date"
                    name="dropoffDate"
                    min={formData.pickupDate || today}
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    className="booking-input"
                  />

                  {errors.dropoffDate && (
                    <p className="booking-error">
                      {errors.dropoffDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="booking-label">
                    Pickup Time
                  </label>

                  <div className="relative">
                    <Clock className="booking-input-icon" size={18} />

                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="booking-input pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="booking-label">
                    Drop-off Time
                  </label>

                  <div className="relative">
                    <Clock className="booking-input-icon" size={18} />

                    <input
                      type="time"
                      name="dropoffTime"
                      value={formData.dropoffTime}
                      onChange={handleChange}
                      className="booking-input pl-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="search-button w-full flex items-center justify-center gap-2"
            >
              Confirm Booking Request
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              <ShieldCheck size={15} className="inline mr-1 text-green-600" />
              Your information is used for this demo booking only.
            </p>
          </form>

          {/* Booking Summary */}
          <aside className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-gray-100 lg:sticky lg:top-24">

            <h2 className="text-xl font-black text-gray-900 mb-6">
              Booking Summary
            </h2>

            <div className="rounded-xl overflow-hidden bg-gray-100 mb-5">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-52 object-cover"
              />
            </div>

            <div className="flex justify-between items-start gap-3 mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedCar.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedCar.model}
                </p>
              </div>

              <span className="text-orange-500 font-bold flex items-center gap-1 text-sm">
                ★ {selectedCar.rating}
              </span>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <strong>{selectedCar.category}</strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Daily rental</span>
                <strong>{formatPrice(selectedCar.price)}</strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rental duration</span>
                <strong>
                  {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                </strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pickup</span>
                <strong className="text-right max-w-[55%]">
                  {formData.pickupDate || "Not selected"}
                </strong>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Drop-off</span>
                <strong className="text-right max-w-[55%]">
                  {formData.dropoffDate || "Not selected"}
                </strong>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-6">
              <div className="flex justify-between items-center gap-3">
                <span className="font-bold text-gray-700">
                  Estimated Total
                </span>

                <strong className="text-2xl text-orange-500">
                  {formatPrice(total)}
                </strong>
              </div>

              <p className="text-xs text-gray-400 mt-3 leading-5">
                Estimated using the daily rental rate multiplied
                by the number of rental days. Additional charges,
                taxes, and payment are not included in this demo.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
