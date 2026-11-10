
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import { BookingProvider } from "./context/BookingContext";
import useScrollReveal from "./hooks/useScrollReveal";
import IntroAnimation from "./components/IntroAnimation";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  useScrollReveal();
  return (
    <BookingProvider>
      <BrowserRouter>
        <IntroAnimation />
        <Layout />
      </BrowserRouter>
    </BookingProvider>
  );
}
