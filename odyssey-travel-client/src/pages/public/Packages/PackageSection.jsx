import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PackageCard from "../../../components/PackageCard/PackageCard";


function PakageSection() {
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
    }
  ]
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/packages")
  }

  return (
    <div className="px-6 md:px-16 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-[80px] font-extrabold ">Holiday Packages</h2>
        <p className="text-gray-600 text-3xl">Indulge in unforgettable adventure with special tour plans.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {tourPackages.map((pkg, index) => (
          <PackageCard key={index} title={pkg.title} price={pkg.price} desc={pkg.desc} img={pkg.img} />
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-10">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 " onClick={handleButton}>
          Show All Packages
        </button>
      </div>
    </div>
  );
}




export default PakageSection