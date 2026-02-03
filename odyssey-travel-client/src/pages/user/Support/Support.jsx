import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faPaperPlane,
  faTicketAlt,
  faCircleNotch,
  faExclamationCircle,
  faCheckCircle,
  faHistory,
  faClock,
  faSortAmountUp,
  faConciergeBell
} from "@fortawesome/free-solid-svg-icons";

const Support = () => {
  const [userId, setUserId] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const serverUrl = "http://localhost:8080";

  const fetchTickets = async (id) => {
    try {
      const [ticketsRes, bookingsRes] = await Promise.all([
        axios.get(`${serverUrl}/api/support/user/${id}`),
        axios.get(`${serverUrl}/api/bookings/user/${id}`)
      ]);
      setTickets(ticketsRes.data || []);
      setBookings(bookingsRes.data || []);
      setErrorMessage("");
    } catch (err) {
      console.error("Fetch support data error:", err);
      setErrorMessage("Unable to sync support stream.");
    } finally {
      setInitLoading(false);
    }
  };

  const raiseTicket = async () => {
    if (!subject || !description) {
      setErrorMessage("Please complete both fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${serverUrl}/api/support`, {
        userId,
        subject,
        description,
        priority,
        bookingId: selectedBookingId || null
      });

      setSuccessMessage("Request logged successfully! 🎉");
      setErrorMessage("");
      setSubject("");
      setDescription("");
      setPriority("LOW");
      fetchTickets(userId);
    } catch (err) {
      console.error("Raise ticket error:", err);
      setErrorMessage("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setUserId(userObj.id);
      fetchTickets(userObj.id);
    } else {
      setInitLoading(false);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN": return "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "IN_PROGRESS": return "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "RESOLVED": return "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "CLOSED": return "text-slate-400 bg-slate-500/10 border-slate-500/20";
      default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  if (initLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFF] dark:bg-[#0A0B1A] text-slate-900 dark:text-white transition-colors duration-500">
        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="mb-4 text-blue-500" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Initializing Support</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#0A0B1A] text-slate-600 dark:text-gray-300 pb-20 selection:bg-rose-500/30 transition-colors duration-500">

      {/* 🔹 Unified Hero & Context */}
      <div className="relative pt-24 pb-16 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-600/10 dark:bg-rose-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/10 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
            <FontAwesomeIcon icon={faConciergeBell} /> Personalized Assistance
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            We're On <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700 dark:from-rose-400 dark:to-rose-600">Standby</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-lg font-medium opacity-80 leading-relaxed max-w-xl mx-auto">
            Your journey's comfort is our priority. Describe your request below, and our specialized concierge team will respond momentarily.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">

        {/* 🔹 Form Section (Integrated Backdrop) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/70 dark:bg-[#111222]/50 backdrop-blur-3xl p-10 rounded-[3rem] border border-white dark:border-white/10 shadow-2xl space-y-10 transition-colors">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Voice Your Concern</h2>
              <p className="text-slate-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Direct line to support</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Related Booking (Optional)</label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white focus:border-rose-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">General Inquiry / No Booking</option>
                  {bookings.map(b => (
                    <option key={b.bookingId} value={b.bookingId}>
                      Booking #{b.bookingId} - {b.packageTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Transmission Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Booking Change Request"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-gray-600 focus:border-rose-500/50 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Detail Description</label>
                <textarea
                  placeholder="Tell us everything..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-gray-600 focus:border-rose-500/50 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Severity / Urgency</label>
                <div className="grid grid-cols-3 gap-3">
                  {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`py-3 rounded-xl text-[10px] font-black tracking-widest transition-all border ${priority === p ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-400 dark:text-gray-500 hover:border-rose-500/30"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={raiseTicket}
                disabled={loading}
                className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-[#0A0B1A] rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white active:scale-95 disabled:opacity-50 mt-4 shadow-xl"
              >
                {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : (
                  <>Transmit Request <FontAwesomeIcon icon={faPaperPlane} /></>
                )}
              </button>

              {(errorMessage || successMessage) && (
                <div className={`mt-6 p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border animate-fade-in ${errorMessage ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  }`}>
                  {errorMessage || successMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🔹 History Section (Clean Continuous Workflow) */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">Support Log</h2>
            <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10"></div>
          </div>

          <div className="space-y-6">
            {tickets.length > 0 ? [...tickets].reverse().map((t) => (
              <div key={t.ticketId} className="group relative bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-rose-500/20 dark:hover:border-white/10 p-8 rounded-[2.5rem] transition-all duration-300 hover:shadow-xl dark:hover:bg-white/[0.07]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${t.status === 'OPEN' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' :
                      t.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                    <span className="text-[10px] font-black text-slate-300 dark:text-gray-600 uppercase tracking-widest">Archive Ref #{t.ticketId}</span>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${getStatusColor(t.status)}`}>
                    {t.status}
                  </span>
                </div>

                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic mb-3 transition-colors group-hover:text-rose-600 dark:group-hover:text-rose-400">
                  {t.subject}
                </h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 opacity-70 group-hover:opacity-100 italic">
                  "{t.description}"
                </p>

                <div className="flex flex-wrap items-center gap-8 border-t border-slate-50 dark:border-white/5 pt-8">
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                    <FontAwesomeIcon icon={faClock} className="text-rose-500" /> {new Date(t.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                    <FontAwesomeIcon icon={faSortAmountUp} className="text-blue-500" /> {t.priority} Impact
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-24 flex flex-col items-center text-center space-y-6 border border-slate-100 dark:border-white/5 rounded-[3rem] bg-white dark:bg-white/[0.02]">
                <div className="text-slate-100 dark:text-white/5"><FontAwesomeIcon icon={faTicketAlt} size="5x" /></div>
                <p className="text-[10px] font-black text-slate-300 dark:text-gray-600 uppercase tracking-[0.5em]">Command Stream Empty</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
