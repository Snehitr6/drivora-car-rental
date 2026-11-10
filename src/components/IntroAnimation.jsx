
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFront } from "lucide-react";

export default function IntroAnimation() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  const completed = useRef(false);

  useEffect(() => {
    const duration = 5000;
    const startTime = Date.now();
    let exitTimer;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(
        (elapsed / duration) * 100,
        100
      );

      setProgress(percentage);

      if (percentage >= 100 && !completed.current) {
        completed.current = true;
        clearInterval(interval);

        // Automatically navigate to Home
        navigate("/", { replace: true });

        // Start cinematic exit
        setExiting(true);

        exitTimer = setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [navigate]);

  if (!visible) return null;

  return (
    <div className={`drivora-intro ${exiting ? "intro-exit" : ""}`}>
      <div className="intro-background" />
      <div className="intro-overlay" />

      <div className="intro-light intro-light-one" />
      <div className="intro-light intro-light-two" />

      {/* Brand */}
      <div className="intro-top">
        <div className="intro-mini-logo">
          <CarFront size={24} />
          <span>DRIVORA</span>
        </div>
      </div>

      {/* Main Intro */}
      <div className="intro-content">

        <div className="intro-eyebrow">
          <span />
          PREMIUM CAR RENTAL EXPERIENCE
          <span />
        </div>

        <div className="intro-logo-wrap">
          <h1 className="intro-logo">
            DRI<span>VORA</span>
          </h1>

          <div className="intro-logo-line" />
        </div>

        <p className="intro-tagline">
          EVERY JOURNEY HAS A BEGINNING.
          <br />
          <strong>MAKE YOURS UNFORGETTABLE.</strong>
        </p>

        {/* Luxury Car */}
        <div className="intro-car-scene">
          <div className="intro-road" />
          <div className="intro-road-light" />

          <div className="intro-car-image">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90"
              alt="Luxury sports car"
            />
          </div>
        </div>

        {/* Loading */}
        <div className="intro-bottom">
          <div className="intro-loading">
            <div className="intro-loading-info">
              <span>PREPARING YOUR EXPERIENCE</span>
              <strong>{Math.round(progress)}%</strong>
            </div>

            <div className="intro-progress-track">
              <div
                className="intro-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="intro-bottom-text">
            DRIVE YOUR WAY. LIVE YOUR JOURNEY.
          </span>
        </div>
      </div>

      <div className="intro-corner-text">
        EST. FOR THE ROAD AHEAD
      </div>
    </div>
  );
}
