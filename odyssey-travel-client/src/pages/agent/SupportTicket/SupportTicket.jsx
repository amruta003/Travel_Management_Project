import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faCircleNotch,
  faExclamationTriangle,
  faCheckCircle,
  faTicketAlt,
  faFilter,
  faCalendarAlt,
  faUserTag,
  faChevronDown,
  faSearch,
  faBolt
} from "@fortawesome/free-solid-svg-icons";

const SupportTicket = () => {
  const [agentId, setAgentId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setAgentId(userObj.id);
      fetchTickets(userObj.id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchTickets = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/support/agent/${userId}`
      );
      setTickets(res.data || []);
      setErrorMessage("");
    } catch (err) {
      console.error("Fetch tickets error:", err);
      setErrorMessage("Unable to sync support stream.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ticketId, newStatus) => {
    try {
      setUpdatingId(ticketId);
      await axios.put(
        `http://localhost:8080/api/support/${ticketId}/status/${newStatus}`
      );

      setSuccessMessage(`Ticket #${ticketId} updated to ${newStatus} ✅`);
      setErrorMessage("");
      fetchTickets(agentId);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Update status error:", err);
      setErrorMessage("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "OPEN": return { label: "Open", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30" };
      case "IN_PROGRESS": return { label: "In Progress", color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30" };
      case "RESOLVED": return { label: "Resolved", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30" };
      case "CLOSED": return { label: "Closed", color: "text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800" };
      default: return { label: status, color: "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700" };
    }
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 dark:bg-gray-950">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest text-center">Syncing Command Center</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-gray-950 p-4 md:p-10 font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/50 transition-colors duration-500">

      {/* 🔹 Glassmorphism Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm dark:shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
              <FontAwesomeIcon icon={faHeadset} className="animate-pulse" /> Agent Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Support <span className="text-indigo-600 italic">Queue</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-md">
              Monitor and resolve travel inquiries with the high-performance command suite.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Seach tickets..."
                className="bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 focus:bg-white dark:focus:bg-slate-800 transition-all w-full md:w-64 dark:text-white"
              />
            </div>
            <button onClick={() => fetchTickets(agentId)} className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-200 transition-all text-slate-600 dark:text-slate-400 active:scale-95 shadow-sm">
              <FontAwesomeIcon icon={faCircleNotch} className={`${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* 🔹 Notifications */}
        {(errorMessage || successMessage) && (
          <div className={`p-5 rounded-3xl border animate-slide-in flex items-center gap-4 ${errorMessage ? "bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 text-rose-700 dark:text-rose-400" : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20 text-emerald-700 dark:text-emerald-400"
            }`}>
            <FontAwesomeIcon icon={errorMessage ? faExclamationTriangle : faCheckCircle} size="lg" />
            <span className="text-xs font-bold uppercase tracking-widest">{errorMessage || successMessage}</span>
          </div>
        )}

        {/* 🔹 Main Ledger */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-900/5 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] border-b border-slate-100 dark:border-slate-800">
                  <th className="px-10 py-8">Ticket Manifest</th>
                  <th className="px-10 py-8">Topic & Context</th>
                  <th className="px-10 py-8">Temporal Log</th>
                  <th className="px-10 py-8 text-right">Workflow Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {tickets.length > 0 ? [...tickets].reverse().map((t) => {
                  const status = getStatusConfig(t.status);
                  return (
                    <tr key={t.ticketId} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                      <td className="px-10 py-12 align-top">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black text-slate-300 dark:text-slate-700">#00{t.ticketId}</span>
                            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-lg text-[8px] animate-bounce">
                              <FontAwesomeIcon icon={faBolt} />
                            </div>
                          </div>
                          <div className={`w-fit px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${t.priority === 'HIGH' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30 text-rose-500 dark:text-rose-400' :
                            t.priority === 'MEDIUM' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400' :
                              'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                            {t.priority} Priority
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-12 align-top max-w-md">
                        <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">
                          {t.subject}
                        </h4>
                        {t.packageTitle && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-[9px] font-black rounded uppercase border border-blue-100 dark:border-blue-800/50">
                              Pkg: {t.packageTitle}
                            </span>
                            <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter">
                              Ref: #{t.bookingId}
                            </span>
                          </div>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2 italic">
                          "{t.description}"
                        </p>
                      </td>
                      <td className="px-10 py-12 align-top">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xs">
                              <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-400" />
                            </div>
                            {new Date(t.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xs">
                              <FontAwesomeIcon icon={faUserTag} className="text-rose-400" />
                            </div>
                            Escalated
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-12 text-right align-top">
                        <div className="flex flex-col items-end gap-4">
                          <div className={`px-5 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest shadow-sm ${status.color}`}>
                            {status.label}
                          </div>

                          <div className="relative group/select w-full max-w-[200px]">
                            <select
                              value={t.status}
                              onChange={(e) => updateStatus(t.ticketId, e.target.value)}
                              disabled={updatingId === t.ticketId}
                              className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-500 focus:outline-none cursor-pointer transition-all disabled:opacity-50 pr-12 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm"
                            >
                              <option value="OPEN">Mark as Open</option>
                              <option value="IN_PROGRESS">Transition Progress</option>
                              <option value="RESOLVED">Finalize Resolve</option>
                              <option value="CLOSED">Archive Close</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">
                              <FontAwesomeIcon icon={faChevronDown} size="sm" />
                            </div>
                            {updatingId === t.ticketId && (
                              <div className="absolute -left-2 -top-2">
                                <FontAwesomeIcon icon={faCircleNotch} spin className="text-indigo-600 text-lg" />
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="4" className="px-10 py-40 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-200 dark:text-slate-700 mb-6">
                        <FontAwesomeIcon icon={faTicketAlt} size="3x" />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">No active manifestations</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔹 Footer Visual */}
        <div className="flex justify-center pb-20 pt-10">
          <div className="flex items-center gap-6 opacity-30">
            <div className="h-[1px] w-20 bg-slate-400 dark:bg-slate-800"></div>
            <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-slate-400 dark:text-slate-600 text-center">Odyssey Command Interface v2.0</p>
            <div className="h-[1px] w-20 bg-slate-400 dark:bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
