import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
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

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/support/all");
      setTickets(res.data || []);
      setErrorMessage("");
    } catch (err) {
      console.error("Admin fetch tickets error:", err);
      setErrorMessage("Unable to load support stream.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ticketId, newStatus) => {
    try {
      setUpdatingId(ticketId);
      await api.put(
        `/api/support/${ticketId}/status/${newStatus}`
      );
      setSuccessMessage(`Ticket #${ticketId} updated to ${newStatus} ✅`);
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTickets();
    } catch (err) {
      console.error("Admin update status error:", err);
      setErrorMessage("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "OPEN": return "text-blue-600 bg-blue-50 border-blue-100";
      case "IN_PROGRESS": return "text-amber-600 bg-amber-50 border-amber-100";
      case "RESOLVED": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "CLOSED": return "text-gray-500 bg-gray-50 border-gray-100";
      default: return "text-gray-400 bg-gray-50 border-transparent";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH": return "text-rose-600";
      case "MEDIUM": return "text-amber-600";
      case "LOW": return "text-emerald-600";
      default: return "text-gray-400";
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.ticketId).includes(searchTerm);
    const matchesFilter = filterStatus === "ALL" || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              Global Support Stream
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and resolve user issues across the entire platform.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="text-right border-r border-gray-100 pr-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Tickets</p>
                <p className="text-xl font-black text-gray-900">{tickets.filter(t => t.status !== 'CLOSED' && t.status !== 'RESOLVED').length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faBolt} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2 relative group">
            <FontAwesomeIcon icon={faSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by ID, Subject or Description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700"
            />
          </div>

          <div className="relative group">
            <FontAwesomeIcon icon={faFilter} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-14 pr-10 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none appearance-none cursor-pointer font-medium text-gray-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          </div>

          <button
            onClick={fetchTickets}
            className="py-4 bg-white border border-gray-200 rounded-2xl shadow-sm font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faCircleNotch} spin={loading} /> Refresh Stream
          </button>
        </div>

        {/* Messages */}
        {(errorMessage || successMessage) && (
          <div className={`mb-8 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm border ${errorMessage ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
            }`}>
            <FontAwesomeIcon icon={errorMessage ? faExclamationTriangle : faCheckCircle} />
            {errorMessage || successMessage}
          </div>
        )}

        {/* Stream */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Syncing Stream...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] py-24 flex flex-col items-center text-center px-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6 text-4xl">
              <FontAwesomeIcon icon={faTicketAlt} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4 underline decoration-gray-100 decoration-8 underline-offset-4">Stream is Clear</h3>
            <p className="text-gray-500 max-w-sm">No support requests match your current filters. Take a break!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.ticketId} className="group bg-white border border-gray-200 rounded-[2.5rem] p-6 pr-8 transition-all hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col md:flex-row items-start md:items-center gap-6">

                {/* ID & Priority */}
                <div className="flex flex-row md:flex-col items-center justify-center gap-2 min-w-[100px] border-r border-gray-100 pr-6">
                  <span className="text-gray-300 font-black text-xs uppercase tracking-tighter">REF</span>
                  <span className="text-2xl font-black text-gray-900 tracking-tighter italic">#{ticket.ticketId}</span>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${getPriorityColor(ticket.priority)} mt-1`}>
                    {ticket.priority}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300" /> {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{ticket.subject}</h4>
                  {ticket.packageTitle && (
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-black rounded uppercase border border-gray-200">
                        Package: {ticket.packageTitle}
                      </span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                        Booking: #{ticket.bookingId}
                      </span>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2 italic">"{ticket.description}"</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <div className="relative flex-1 md:flex-initial">
                    <select
                      value={ticket.status}
                      disabled={updatingId === ticket.ticketId}
                      onChange={(e) => updateStatus(ticket.ticketId, e.target.value)}
                      className="w-full md:w-44 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer appearance-none pr-10 hover:bg-white hover:border-blue-400 transition-all"
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SupportTickets;
