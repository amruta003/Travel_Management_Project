import { useEffect, useRef } from "react";
import "./Itinerary.css";

import backgroundImg from "../../assets/images/attraction-bg.jpg";

import anamudi from "../../assets/images/itinerary/anamudi-peak-munnar-kerala.jpg";
import anjuna from "../../assets/images/itinerary/anjuna-beach-goa.jpg";
import babaBaidyanathDham from "../../assets/images/itinerary/baba-baidyanath-dham-deoghar-odisha.jpg";
import deviTemple from "../../assets/images/itinerary/devi-temple-mysuru-karnataka.jpg";
import gulmargMeadows from "../../assets/images/itinerary/gulmarg-meadows-srinagar-jammu-and-kashmir.jpg";
import nurmahal from "../../assets/images/itinerary/nurmahal-jalandhar-punjab.jpg";
import kadriManjunathaTemple from "../../assets/images/itinerary/kadri-manjunatha-temple-mangalore-karnataka.jpg";
import shivaStatue from "../../assets/images/itinerary/shiva-statue-coimbatore-tamil-nadu.jpg";
import shriRamanathaswamy from "../../assets/images/itinerary/shri-ramanathaswamy-temple.jpg";
import shriRamTemple from "../../assets/images/itinerary/Ayodhya_Ram_Mandir.jpg";

const itineraries = [
  {
    days: "2 Days",
    city: "Deoghar",
    title: "Deoghar: The Abode of God",
    img: babaBaidyanathDham,
  },
  {
    days: "2 Days",
    city: "Karnatak",
    title: "48 Hours In Delhi",
    img: deviTemple,
  },
  {
    days: "2 Days",
    city: "Mangalore",
    title: "A scenic exploration of coastal Mangalore",
    img: kadriManjunathaTemple,
  },
  {
    days: "2 Days",
    city: "Jalandhar",
    title: "Jalandhar: cultural expedition through Punjab’s heart",
    img: nurmahal,
  },
  {
    days: "2 Days",
    city: "Ayodhya",
    title: "A spiritual getaway in Ayodhya",
    img: shriRamTemple,
  },
  {
    days: "2 Days",
    city: "Coimbatore",
    title: "A 2-days sojourun of Coimbatore delights",
    img: shivaStatue,
  },
  {
    days: "2 Days",
    city: "Munnar",
    title: "A 2-day tour to in Munnar",
    img: anamudi,
  },
  {
    days: "2 Days",
    city: "Goa",
    title: "Goa chronicles: Legends, History, and heritage unveiled",
    img: anjuna,
  },
  {
    days: "2 Days",
    city: "Gulbarga",
    title: "48-hours in Gulbarga: unveiling hidden gems",
    img: gulmargMeadows,
  },
  {
    days: "2 Days",
    city: "Rameshwaram",
    title: "Explore Rameshwaram's spiritual tapestry",
    img: shriRamanathaswamy,
  },
];

function Itinerary() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-16 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mb-10">
        <h2 className="text-[80px] font-extrabold text-blue-400">ITINERARIES</h2>
        <p className="text-gray-600 text-3xl">that beckon every traveller</p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-14 px-12 pt-10 scrollbar-none scroll-smooth "
        >
          {itineraries.map((item) => (
            <div
              key={item.city}
              className="w-[300px] flex-shrink-0 text-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-[50px]"
            >
              <img
                src={item.img}
                className="w-[280px] h-[330px] object-cover rounded-[10%]"
                alt={item.city}
              />

              <p className="mt-4 font-bold text-red-600 text-lg">
                {item.days}
                <br />
                <span className="text-black font-semibold">{item.city}</span>
              </p>

              <p className="mt-2 text-base font-semibold">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={scrollLeft}
            className="bg-white shadow px-5 py-3 rounded-full text-xl"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="bg-white shadow px-5 py-3 rounded-full text-xl"
          >
            →
          </button>
        </div>

        <div className="text-center mt-10">
          <button className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Itinerary;
