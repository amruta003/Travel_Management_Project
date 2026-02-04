import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcaseRolling,
  faCalendarCheck,
  faCreditCard,
  faCompass,
  faArrowRight,
  faSpinner,
  faHistory,
  faMapMarkerAlt,
  faMagic,
  faGlobeAmericas,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [user, setUser] = useState({ name: "Explorer", id: null });
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      // Backend returns firstName/lastName, combining for display
      const fullName = userObj.firstName ? `${userObj.firstName} ${userObj.lastName || ""}`.trim() : userObj.name || "Explorer";
      setUser({ name: fullName, id: userObj.id });
      fetchDashboardData(userObj.id);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchDashboardData = async (userId) => {
    try {
      setLoading(true);
      const [pkgsRes, bookingsRes] = await Promise.all([
        api.get(`/api/packages`),
        api.get(`/api/bookings/user/${userId}`)
      ]);

      setPackages(pkgsRes.data?.slice(0, 4) || []);
      setBookings(bookingsRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalBookings: bookings.length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    totalSpent: bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0)
  };

  const getStatusBadge = (status) => {
    const styles = {
      CONFIRMED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      CANCELLED: "bg-rose-500/10 text-rose-500 border-rose-500/20"
    };
    return styles[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0A0B1A]">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="font-black text-blue-400 tracking-[0.4em] uppercase text-[10px]">Synchronizing Itinerary</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-gray-950 font-sans transition-colors duration-500">

      {/* 🔹 Cinematic Greeting Section (Integrated, No Cards) */}
      <div className="relative overflow-hidden bg-[#0A0B1A] py-24 px-6 sm:px-12 md:py-36">
        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center space-y-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
            <FontAwesomeIcon icon={faGlobeAmericas} className="text-sm" /> Odyssey Travel Portal
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Hello, <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-[length:200%_auto] animate-gradient text-glow">
                {user.name}
              </span>
            </span>
          </h1>

          <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-medium leading-relaxed opacity-80">
            Exploration is the essence of the human spirit. Track your past adventures and ignite your next one here.
          </p>

          <div className="flex flex-wrap gap-5 justify-center pt-4">
            <button
              onClick={() => navigate("/user/browse-packages")}
              className="group relative px-12 py-5 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white flex items-center gap-3 overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              Find Your Place <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Integrated Stats Bar (Transparent Design) */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#111222]/80 backdrop-blur-3xl rounded-[3rem] border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          <div className="p-12 flex flex-col items-center text-center group">
            <div className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform">{stats.totalBookings}</div>
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] opacity-60">Experiences Logged</div>
          </div>
          <div className="p-12 flex flex-col items-center text-center group">
            <div className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform">{stats.confirmed}</div>
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] opacity-60">Verified Bookings</div>
          </div>
          <div className="p-12 flex flex-col items-center text-center group">
            <div className="text-5xl font-black text-blue-500 mb-2 tracking-tighter group-hover:scale-110 transition-transform">₹{stats.totalSpent.toLocaleString()}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] opacity-60">Lifetime Value</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 space-y-32">

        {/* 🔹 Interactive Package Grid (Border-only Cards) */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4 justify-center md:justify-start">
                New Experiences <FontAwesomeIcon icon={faMagic} className="text-blue-500 text-base" />
              </h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Curated Destinations Just For You</p>
            </div>
            <button
              onClick={() => navigate("/user/browse-packages")}
              className="px-8 py-3 rounded-full border-2 border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Browse Gallery
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.packageId}
                onClick={() => navigate(`/user/book-package/${pkg.packageId}`)}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/30">
                  <img
                    src={pkg.imageUrl ? `${import.meta.env.VITE_API_URL}${pkg.imageUrl}` : "https://images.unsplash.com/photo-1519046904884-53103b34b206"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                    alt={pkg.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                  <div className="absolute inset-x-8 bottom-8 text-white space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{pkg.destination}</div>
                    <h3 className="font-black text-2xl leading-none uppercase tracking-tighter">{pkg.title}</h3>
                    <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      <span className="font-black text-lg text-blue-300">₹{pkg.price}</span>
                      <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 Clean Booking Table (Integrated Layout) */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Activity Ledger</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-100 to-transparent"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] border-b border-gray-100">
                  <th className="px-6 py-8">Ref ID</th>
                  <th className="px-6 py-8">Destination Journey</th>
                  <th className="px-6 py-8">Scheduled Date</th>
                  <th className="px-6 py-8 text-right">Trip Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {bookings.length > 0 ? bookings.slice(0, 5).map((b) => (
                  <tr key={b.bookingId} className="group hover:bg-white transition-all">
                    <td className="px-6 py-10">
                      <span className="text-xs font-black text-gray-300 group-hover:text-blue-600 transition-colors">B-{b.bookingId}</span>
                    </td>
                    <td className="px-6 py-10">
                      <div className="font-black text-gray-900 uppercase tracking-tighter text-base group-hover:translate-x-2 transition-transform">{b.packageTitle}</div>
                    </td>
                    <td className="px-6 py-10 text-xs font-black text-gray-500 uppercase tracking-widest">{b.travelDate}</td>
                    <td className="px-6 py-10 text-right">
                      <span className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-32 text-center">
                      <FontAwesomeIcon icon={faSuitcaseRolling} size="3x" className="text-gray-100 mb-6" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">No History Found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 🔹 Simplified Floating Actions (No Cards) */}
        <div className="flex flex-wrap justify-between items-center bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl gap-8">
          <div className="space-y-1">
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Need Platform Assistance?</h4>
            <p className="text-gray-400 text-sm font-medium">Connect with our support concierge for personalized help.</p>
          </div>
          <button
            onClick={() => navigate("/user/support")}
            className="px-10 py-5 bg-[#0A0B1A] hover:bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
