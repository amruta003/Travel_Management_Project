import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faTags,
  faMoneyBillWave,
  faHeadset,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

function ServiceSection() {
  const services = [
    {
      icon: faTicket,
      title: "Easy Booking",
      desc: "We offer easy and convenient bookings with attractive offers.",
    },
    {
      icon: faTags,
      title: "Lowest Price",
      desc: "We ensure low rates on hotel reservations, holiday packages, and flights.",
    },
    {
      icon: faMoneyBillWave,
      title: "Instant Refund",
      desc: "Get instant refunds effortlessly on your travel bookings.",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      desc: "Get assistance anytime for travel-related queries. We’re happy to help.",
    },
    {
      icon: faBolt,
      title: "Exciting Deals",
      desc: "Enjoy great deals on flights, hotels, buses, car rentals, and tour packages.",
    },
  ];

  return (
    <section id="service_section" className="px-6 md:px-16 py-16">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-12 text-center">
        Why Book With Us?
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-center gap-10 relative">

        {services.map((service, index) => (
          <div key={index} className="relative px-6">

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <FontAwesomeIcon
                icon={service.icon}
                className="text-blue-500 text-5xl"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>

            {/* DIVIDERS (Desktop only) */}
            {index !== services.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-4 h-20 w-[1px] bg-gray-300"></div>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}

export default ServiceSection;

