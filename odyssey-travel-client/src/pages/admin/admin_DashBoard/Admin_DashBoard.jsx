import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend
} from "recharts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTie,
  faBoxOpen,
  faHourglassHalf,
  faUserEdit,
  faClipboardCheck,
  faCheckCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

function Admin_DashBoard() {


  const [liveStats, setLiveStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalCustomers: 0,
    totalAgents: 0,
    totalPackages: 0,
    pendingApprovals: 0
  });

  const stats = [
    { title: "Total Users", value: liveStats.totalCustomers.toLocaleString(), icon: faUsers },
    { title: "Total Agents", value: liveStats.totalAgents.toLocaleString(), icon: faUserTie },
    { title: "Total Packages", value: liveStats.totalPackages.toLocaleString(), icon: faBoxOpen },
    { title: "Pending Approvals", value: liveStats.pendingApprovals.toLocaleString(), icon: faHourglassHalf },
  ];

  const analytics = [
    { title: "Total Bookings", value: liveStats.totalBookings.toLocaleString(), icon: faUsers },
    { title: "Total Revenue", value: `₹${liveStats.totalRevenue.toLocaleString()}`, icon: faChartBar },
    { title: "Avg Rating", value: "4.8 ★", icon: faClipboardCheck },
    { title: "System Health", value: "99.9%", icon: faCheckCircle },
  ];

  const actions = [
    { title: "Edit New User", desc: "Edit and delete the user traveler.", icon: faUserEdit },
    { title: "Review Agents", desc: "Process applications from new travel agents.", icon: faClipboardCheck },
    { title: "Approve Packages", desc: "Authorize new travel packages for listing.", icon: faCheckCircle },
    { title: "Generate Reports", desc: "Access and create detailed system reports.", icon: faChartBar },
  ];

  const yoyData = liveStats.yoyData || [];
  const revenueData = liveStats.revenueData || [];

  const locationData = [
    { name: "Goa", visits: 400 },
    { name: "Manali", visits: 350 },
    { name: "Kashmir", visits: 280 },
    { name: "Jaipur", visits: 200 },
    { name: "Kerala", visits: 450 },
  ];


  const [dateTime, setDateTime] = useState("");
  const adminName = "Admin";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/stats/admin");
        if (res.data) setLiveStats(res.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };
    fetchStats();



    const timer = setInterval(() => {
      const now = new Date();

      const formatted = now.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setDateTime(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, {adminName}!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {dateTime}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        {analytics.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-600 dark:text-gray-300 font-medium">{item.title}</h2>
              <FontAwesomeIcon icon={item.icon} className="text-gray-400 dark:text-gray-300 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        {/* Year-over-Year Comparison */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Year-over-Year Comparison</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={yoyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Bookings" />
              <Line type="monotone" dataKey="customers" stroke="#82ca9d" name="Customers" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Most Popular Travel Locations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={locationData}
              dataKey="visits"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Admin_DashBoard;
