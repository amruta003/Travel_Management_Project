import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import amritsar from '../../assets/images/golden-temple-amritsar-punjab.jpg'
import delhi from '../../assets/images/red-fort-delhi.jpg'
import varanasi from '../../assets/images/dashashwamedh-ghat-varanasi-uttar-pradesh-city-hero.jpeg'
import dwarka from '../../assets/images/dwarkadish-temple-dwarka.jpg'
import udaipur from '../../assets/images/city-palace-udaipur-rajasthan.jpeg'
import gangtok from '../../assets/images/monastery-gangtok-sikkim.jpg'
import darjeeling from '../../assets/images/darjeeling-westbengal.jpg'
import shrinagar from '../../assets/images/dal-lake-srinagar-jammu-&-kashmir.jpg'
import goa from '../../assets/images/beach-goacity.jpg'

function Destination() {

  const slides = [
    { city: "Amritsar", img: amritsar },
    { city: "Delhi", img: delhi },
    { city: "Varanasi", img: varanasi },
    { city: "Dwarka", img: dwarka },
    { city: "Udaipur", img: udaipur },
    { city: "Gangtok", img: gangtok },
    { city: "Darjeeling", img: darjeeling },
    { city: "Shrinagar", img: shrinagar },
    { city: "Goa", img: goa },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000); 
    return () => clearInterval(timer);
  }, [index]);
  return (
    <div className="relative w-full h-[650px] overflow-hidden mt-[80px]">
      {/* Background Image */}
      <img
        src={slides[index].img}
        alt={slides[index].city}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

      {/* Heading */}
      <div className="absolute top-24 w-full text-center text-white">
        <h1 className="text-[80px] font-extrabold uppercase tracking-wide">DESTINATIONS</h1>
        <p className="text-3xl mt-2 opacity-90">for every bucket list</p>
      </div>

      {/* Slide Content */}
      <div className="absolute bottom-24 w-full text-center text-white">
        <div className="flex items-center justify-center gap-6 text-3xl font-bold">
          <button onClick={prevSlide} className="hover:text-red-400 transition">
            <FontAwesomeIcon icon={faArrowDown} rotation={90} />
          </button>

          <span>{slides[index].city}</span>

          <button onClick={nextSlide} className="hover:text-red-400 transition">
            <FontAwesomeIcon icon={faArrowDown} rotation={270} />
          </button>
        </div>

        <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-medium">
          Get Started <FontAwesomeIcon icon={faArrowDown} rotation={270} />
        </button>
      </div>
    </div>

  )
}

export default Destination