import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCheckCircle,
  faClock,
  faCalendarCheck,
  faPlus,
  faList,
  faSpinner,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

// Register ChartJS modules
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function Agent_DashBoard() {
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState({ totalEarnings: 0 });

  const serverUrl = "http://localhost:8080"; // Base URL

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      // Backend returns firstName/lastName, combining for display
      const fullName = userObj.firstName ? `${userObj.firstName} ${userObj.lastName || ""}`.trim() : "Agent";
      setUser({ ...userObj, fullName });
      fetchDashboardData(userObj.id);
    }
  }, []);

  const fetchDashboardData = async (userId) => {
    try {
      setLoading(true);

      // Parallel fetching
      const [pkgsRes, bookingsRes, ticketsRes, statsRes] = await Promise.all([
        axios.get(`${serverUrl}/api/packages/agent/${userId}`),
        axios.get(`${serverUrl}/api/bookings/agent/${userId}`),
        axios.get(`${serverUrl}/api/support/agent/${userId}`),
        axios.get(`${serverUrl}/api/stats/agent/${userId}`)
      ]);

      setPackages(pkgsRes.data || []);
      setBookings(bookingsRes.data || []);
      setTickets(ticketsRes.data || []);
      if (statsRes.data) setLiveStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats calculation
  const totalPackages = packages.length;
  const approvedPackages = packages.filter(p => p.status === "APPROVED").length;
  const pendingPackages = packages.filter(p => p.status === "PENDING").length;
  const totalBookings = bookings.length;

  // Chart data extraction (mocking counts by month based on existing data if possible, 
  // or just showing trends based on what we have)
  const chartData = {
    labels: liveStats.monthlyTrend?.map(t => t.month) || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Booking Activity",
        data: liveStats.monthlyTrend?.map(t => t.count) || [0, 0, 0, 0, 0, 0],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } }
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-indigo-600">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p className="mt-4 font-medium animate-pulse text-gray-500">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in p-2">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome, {user?.fullName || "Agent"}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your travel empire from one single view.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/agent/add-package"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg active:scale-95 shadow-indigo-200 dark:shadow-none"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Package
          </Link>
          <Link
            to="/agent/booking-overview"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm active:scale-95"
          >
            <FontAwesomeIcon icon={faList} />
            Bookings
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Packages", value: totalPackages, icon: faBox, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Approved Packages", value: approvedPackages, icon: faCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Pending", value: pendingPackages, icon: faClock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Total Bookings", value: totalBookings, icon: faCalendarCheck, color: "text-indigo-500", bg: "bg-indigo-50" },
          { label: "Est. Earnings", value: `₹${liveStats.totalEarnings.toLocaleString()}`, icon: faCoins, color: "text-rose-500", bg: "bg-rose-50" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white mt-2 tracking-tight">{item.value}</p>
              </div>
              <div className={`${item.bg} p-4 rounded-2xl shadow-inner`}>
                <FontAwesomeIcon icon={item.icon} className={`${item.color} text-2xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8 border-l-4 border-indigo-600 pl-4">
            Analytics Overview
          </h2>
          <div className="h-[320px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Packages */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white border-l-4 border-emerald-500 pl-4">Your Recent Packages</h2>
            <Link to="/agent/my-packages" className="text-indigo-600 font-bold hover:underline text-sm">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-gray-700">
                  <th className="pb-4">Package</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {packages.length > 0 ? packages.slice(0, 5).map((pkg, i) => (
                  <tr key={i} className="text-sm group hover:bg-indigo-50/30 dark:hover:bg-gray-750 transition-colors">
                    <td className="py-5">
                      <div className="font-bold text-gray-800 dark:text-gray-200">{pkg.title}</div>
                      <div className="text-xs text-gray-400 font-medium">{pkg.destination}</div>
                    </td>
                    <td className="py-5 font-mono text-gray-600 dark:text-gray-400">₹{pkg.price}</td>
                    <td className="py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${pkg.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="py-10 text-center text-gray-400 font-medium italic">No packages created yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bookings Overview */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">Live Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-gray-700">
                  <th className="pb-4">Ref</th>
                  <th className="pb-4">Client</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {bookings.length > 0 ? bookings.slice(0, 4).map((b, i) => (
                  <tr key={i} className="text-sm hover:bg-blue-50/30 dark:hover:bg-gray-750 transition-colors">
                    <td className="py-5 font-bold font-mono text-indigo-500">#{b.bookingId}</td>
                    <td className="py-5">
                      <div className="font-bold text-gray-800 dark:text-white">{b.contactFullName}</div>
                      <div className="text-xs text-gray-400">{b.packageTitle}</div>
                    </td>
                    <td className="py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${b.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-800"
                          }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="py-10 text-center text-gray-400 font-medium italic">No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white border-l-4 border-amber-500 pl-4">Assistance Desk</h2>
            <Link to="/agent/support-ticket" className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors">View All Tickets</Link>
          </div>

          <div className="space-y-5">
            {tickets.length > 0 ? tickets.slice(0, 4).map((t, i) => (
              <div
                key={i}
                className="p-5 bg-gray-50 dark:bg-gray-750 border border-transparent dark:border-gray-700 rounded-3xl flex justify-between items-center group transition-all hover:bg-white hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 cursor-pointer"
              >
                <div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 transition-colors line-clamp-1">{t.subject}</div>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase font-black tracking-widest">{t.priority} Priority</div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] uppercase font-black rounded-lg ${t.status === 'CLOSED' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-800'
                  }`}>
                  {t.status}
                </span>
              </div>
            )) : (
              <div className="py-10 text-center text-gray-400 font-medium italic border-2 border-dashed border-gray-50 dark:border-gray-700 rounded-3xl">Active assistance tickets will appear here.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
