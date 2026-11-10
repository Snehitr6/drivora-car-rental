
import { Star, Quote, ArrowRight, BadgeCheck } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Bengaluru, India",
    car: "BMW 5 Series",
    date: "October 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Excellent experience with DRIVORA! The BMW was in perfect condition, pickup was smooth, and the entire booking process was effortless.",
  },
  {
    id: 2,
    name: "Priya Reddy",
    location: "Hyderabad, India",
    car: "Hyundai Creta",
    date: "September 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Booked a Creta for a family trip. The car was clean, comfortable, and delivered on time. Definitely a great rental experience.",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    location: "Mumbai, India",
    car: "Toyota Fortuner",
    date: "September 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "The Fortuner was amazing for our weekend road trip. Great vehicle quality and a simple booking experience. Highly recommended!",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    location: "Pune, India",
    car: "Mercedes-Benz C-Class",
    date: "August 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=44",
    review:
      "Loved the premium experience. The car was beautiful, the interiors were spotless, and everything went exactly as expected.",
  },
  {
    id: 5,
    name: "Vikram Rao",
    location: "Chennai, India",
    car: "Mahindra Thar",
    date: "August 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=13",
    review:
      "Took the Thar for an adventure trip. It was a fantastic experience. The vehicle was ready on time and performed perfectly.",
  },
  {
    id: 6,
    name: "Ananya Das",
    location: "Delhi, India",
    car: "Tesla Model 3",
    date: "July 2026",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=49",
    review:
      "A smooth and comfortable experience from start to finish. Loved the electric car experience and the simple booking process.",
  },
];

function ReviewStars({ rating }) {
  return (
    <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={15}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container-main">

        {/* Section Heading */}
        <div className="testimonials-heading" data-reveal="left">
          <div className="testimonials-heading-content">
            <span className="section-tag">
              CUSTOMER STORIES
            </span>

            <h2>
              Don't just take our <span>word for it.</span>
            </h2>

            <p>
              Discover what customers say about their journeys
              with DRIVORA. Great cars, smooth bookings, and
              memorable experiences.
            </p>
          </div>

          <div className="review-summary">
            <div className="review-score">4.9</div>

            <div className="review-summary-details">
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p>Excellent customer experience</p>
              <span>Sample rating</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <article
              className="testimonial-card"
              key={review.id}
              data-reveal="zoom"
              data-delay={String((index % 3) * 100)}
            >
              <div className="testimonial-card-top">
                <div className="testimonial-quote-wrapper">
                  <Quote
                    size={27}
                    className="testimonial-quote"
                  />
                </div>

                <ReviewStars rating={review.rating} />
              </div>

              <p className="testimonial-review">
                "{review.review}"
              </p>

              {/* Rented Vehicle */}
              <div className="testimonial-car">
                <div>
                  <span>RENTED VEHICLE</span>
                  <strong>{review.car}</strong>
                </div>

                <div className="testimonial-car-icon">
                  <span>DRIVORA</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="testimonial-user">
                <img
                  src={review.image}
                  alt={review.name}
                  loading="lazy"
                />

                <div className="testimonial-user-info">
                  <h4>{review.name}</h4>
                  <p>{review.location}</p>
                </div>

                <span className="testimonial-verified">
                  <BadgeCheck size={14} />
                  Sample
                </span>
              </div>

              <div className="testimonial-date">
                {review.date}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="testimonials-bottom"
          data-reveal="right"
        >
          <div>
            <h3>Ready for your next journey?</h3>
            <p>
              Find your perfect car and make every journey memorable.
            </p>
          </div>

          <a href="/cars" className="testimonials-cta">
            Explore Our Cars
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
