import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import odysseyLogo from '../../assets/logo/odyssey_logo.png'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* GRID: Logo + Links + Services + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* LOGO + ABOUT */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="">
                <a href="#" className="flex items-center text-4xl font-bold dark:text-white">
                    <img className="w-[55px] h-auto" src={odysseyLogo} alt="Logo" />
                    <span className="">Odyssey</span>
                </a>
              </div>
              
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Odyssey helps you explore destinations, plan trips, and create unforgettable memories with ease. Travel smarter, travel happier.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                "About",
                "Destinations",
                "Iternaries",
                "Contacts",
                // "Travel Blog",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(" ", "")}`}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white">Legal</h3>
            <ul className="space-y-3 text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/ /g, "")}`}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white">Connect With Us</h3>
            <p className="text-gray-400 mb-4">Follow us for travel inspiration & updates.</p>

            <div className="flex space-x-4">
              {[
                { icon: faTwitter, color: "hover:bg-blue-500" },
                { icon: faInstagram, color: "hover:bg-pink-500" },
                { icon: faLinkedinIn, color: "hover:bg-blue-700" },
                { icon: faFacebookF, color: "hover:bg-blue-600" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 ${item.color}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-white text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-12 mb-6"></div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Odyssey. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built for travelers ✈️</p>
        </div>
      </div>
    </footer>
  );
}
