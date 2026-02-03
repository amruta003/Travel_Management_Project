import React from "react";
import PackageCard from "../../../components/PackageCard/PackageCard";
import Navbar from "../../../components/Navbar/Navbar";

const tourPackages = [
  {
    title: "Goa Beach Retreat",
    price: "₹12,000 / person",
    desc: "Experience pristine beaches, water sports, and vibrant nightlife.",
    img: "/images/tours/goa.jpg",
  },
  {
    title: "Himalayan Trek Adventure",
    price: "₹25,000 / person",
    desc: "Conquer breathtaking peaks and explore serene monasteries.",
    img: "/images/tours/himalaya.jpg",
  },
  {
    title: "Kerala Backwater Escape",
    price: "₹18,000 / person",
    desc: "Cruise through Kerala's serene backwaters and green landscapes.",
    img: "/images/tours/kerala.jpg",
  },
  {
    title: "Odisha Spiritual Journey",
    price: "₹15,000 / person",
    desc: "A divine coastal getaway with iconic temple experiences.",
    img: "/images/tours/odisha.jpg",
  },
  {
    title: "Rajasthan Cultural Immersion",
    price: "₹20,000 / person",
    desc: "Explore royal palaces, deserts, camel rides & heritage sites.",
    img: "/images/tours/rajasthan.jpg",
  },
  {
    title: "Northeast Nature Escape",
    price: "₹30,000 / person",
    desc: "Discover untouched forests, waterfalls & tribal cultures.",
    img: "/images/tours/northeast.jpg",
  },
  {
    title: "Kashmir Paradise Experience",
    price: "₹22,000 / person",
    desc: "Snow peaks, shikara rides & heavenly landscapes await you.",
    img: "/images/tours/kashmir.jpg",
  },
  {
    title: "Leh–Ladakh Adventure Drive",
    price: "₹35,000 / person",
    desc: "Ride through rugged mountains, lakes & the world's highest passes.",
    img: "/images/tours/ladakh.jpg",
  },
  {
    title: "Andaman Island Escape",
    price: "₹28,000 / person",
    desc: "Snorkeling, beaches, coral reefs & tropical paradise bliss.",
    img: "/images/tours/andaman.jpg",
  },
  {
    title: "Meghalaya Rainforest Trails",
    price: "₹27,000 / person",
    desc: "Witness living root bridges, caves & scenic waterfalls.",
    img: "/images/tours/meghalaya.jpg",
  },
  {
    title: "Sikkim Mountain Discovery",
    price: "₹24,000 / person",
    desc: "Explore monasteries, lakes & snow-laden mountains.",
    img: "/images/tours/sikkim.jpg",
  },
  {
    title: "Varanasi Spiritual Tour",
    price: "₹12,999 / person",
    desc: "Experience holy ghats, Ganga Aarti & cultural richness.",
    img: "/images/tours/varanasi.jpg",
  },
  {
    title: "Tamil Nadu Heritage Circuit",
    price: "₹16,500 / person",
    desc: "Visit ancient temples, heritage towns & cultural sites.",
    img: "/images/tours/tamilnadu.jpg",
  },
  {
    title: "Maharashtra Konkan Trail",
    price: "₹14,000 / person",
    desc: "Beaches, seafood, forts & lush coastal beauty.",
    img: "/images/tours/konkan.jpg",
  },
  {
    title: "Golden Triangle Tour",
    price: "₹19,500 / person",
    desc: "Delhi, Agra & Jaipur—India’s most iconic travel circuit.",
    img: "/images/tours/golden-triangle.jpg",
  },
  {
    title: "Mysore & Coorg Retreat",
    price: "₹18,500 / person",
    desc: "Coffee estates, royal palaces & misty hills.",
    img: "/images/tours/coorg.jpg",
  },
  {
    title: "Hyderabad Heritage Walk",
    price: "₹10,500 / person",
    desc: "Charminar, Golconda Fort & delicious Hyderabadi cuisine.",
    img: "/images/tours/hyderabad.jpg",
  },
  {
    title: "Pondicherry French Escape",
    price: "₹13,000 / person",
    desc: "French-style streets, beaches & calm seaside cafés.",
    img: "/images/tours/pondy.jpg",
  },
  {
    title: "Uttarakhand Nature Retreat",
    price: "₹21,000 / person",
    desc: "Hill stations, rivers, treks & wildlife sanctuaries.",
    img: "/images/tours/uttarakhand.jpg",
  },
  {
    title: "Gir Forest Wildlife Safari",
    price: "₹23,000 / person",
    desc: "Explore India's lion reserve with guided safaris.",
    img: "/images/tours/gir.jpg",
  },
];

function TourPackages() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-20 py-16 bg-gray-50 dark:bg-gray-900 min-h-screen mt-[80px]">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Featured Tour Packages
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Explore our best curated travel experiences across India & beyond.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {tourPackages.map((pkg, index) => (
            <PackageCard key={index} title={pkg.title} price={pkg.price} desc={pkg.desc} img={pkg.img} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TourPackages;
