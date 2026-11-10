
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { cars } from "../data/cars";
import CarCard from "../components/CarCard";

export default function Cars() {
  const [params] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [brand, setBrand] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(20000);

  const brands = [...new Set(cars.map((car) => car.brand))];

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      return (
        `${car.name} ${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || car.category === category) &&
        (brand === "All" || car.brand === brand) &&
        (transmission === "All" || car.transmission === transmission) &&
        car.price <= maxPrice
      );
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, category, brand, transmission, maxPrice, sort]);

  return (
    <main className="listing-page">
      <section className="page-banner">
        <div className="container-main">
          <p className="eyebrow">OUR CAR COLLECTION</p>
          <h1>Find Your Perfect <span>Ride.</span></h1>
          <p>Choose from our premium collection of rental vehicles.</p>
        </div>
      </section>

      <section className="container-main listing-content">
        <div className="filter-panel">
          <div className="filter-title">
            <SlidersHorizontal />
            <h2>Find Your Car</h2>
          </div>

          <input
            className="filter-input"
            placeholder="Search cars or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["All", "Luxury", "SUV", "Sedan", "Sports"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>

          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="All">All Brands</option>
            {brands.map((v) => <option key={v}>{v}</option>)}
          </select>

          <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
            <option value="All">All Transmissions</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>

          <div className="price-filter">
            <label>Maximum daily price: ₹{maxPrice.toLocaleString("en-IN")}</label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="listing-heading">
          <div>
            <h2>Available Collection</h2>
            <p>{filteredCars.length} cars found</p>
          </div>
        </div>

        {filteredCars.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={38} />
            <h3>No cars found</h3>
            <p>Try changing your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setBrand("All");
                setTransmission("All");
                setMaxPrice(20000);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
