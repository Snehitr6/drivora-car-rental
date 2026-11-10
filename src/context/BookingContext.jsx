
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BookingContext = createContext(null);

const initialBooking = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  dropoffDate: "",
  pickupTime: "",
  dropoffTime: "",
  carId: null,
  customer: {},
  bookingId: "",
  total: 0,
  days: 1,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    try {
      const saved = localStorage.getItem("drivoraBooking");
      return saved
        ? { ...initialBooking, ...JSON.parse(saved) }
        : initialBooking;
    } catch {
      return initialBooking;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("drivoraBooking", JSON.stringify(booking));
    } catch (error) {
      console.error("Unable to save booking:", error);
    }
  }, [booking]);

  // Merge new booking details without removing existing details
  const updateBooking = (updates) => {
    setBooking((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  const clearBooking = () => {
    setBooking(initialBooking);
    localStorage.removeItem("drivoraBooking");
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}
