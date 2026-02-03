import React, { useState } from 'react';
import useUserBookingDetails from './useUserBookingDetails';

function UserBookingDetails() {
  const { bookings, loading, error } = useUserBookingDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const itemsPerPage = 6;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'PENDING': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'CANCELLED': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
    }
  };

  const filteredBookings = bookings
    .filter((b) => b.status !== 'COMPLETED')
    .filter((b) =>
      searchTerm === ""
        ? true
        : String(b.bookingId).includes(searchTerm) ||
        b.packageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.destination?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading your travels...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-6 text-center">
      <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-full flex items-center justify-center mb-4">
        <i className="bi bi-exclamation-triangle-fill text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">{error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none font-semibold">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-100 pb-20">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">My Bookings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage all your travel experiences in one place</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-72 group">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Search by package or ID..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Total Bookings</p>
                <p className="text-xl font-black text-gray-900 dark:text-white leading-tight">{bookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        {paginatedBookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-16 text-center border-2 border-dashed border-gray-100 dark:border-gray-700 transition-all">
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-briefcase text-4xl text-gray-300 dark:text-gray-600"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No trips found here</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
              {searchTerm ? "We couldn't find any matches for your search." : "Ready to start your next adventure? Browse our exclusive packages!"}
            </p>
            {!searchTerm && (
              <a href="/user/browse-packages" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all hover:shadow-xl hover:shadow-indigo-500/20">
                Explore Packages <i className="bi bi-arrow-right"></i>
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="group bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Header Section (Unified) */}
                <div className="p-6 pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)} shadow-sm`}>
                      {booking.status}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Booking ID</p>
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">#{booking.bookingId}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      <i className="bi bi-geo-alt-fill"></i> {booking.destination || 'Global'}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">{booking.packageTitle}</h3>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 pt-2 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50 dark:border-gray-700/50">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Travel Date</p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {new Date(booking.travelDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="bi bi-people-fill text-indigo-500"></i>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Travelers</span>
                      </div>
                      <p className="font-black text-gray-900 dark:text-white">{booking.travelers}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="bi bi-clock-fill text-indigo-500"></i>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Duration</span>
                      </div>
                      <p className="font-black text-gray-900 dark:text-white">{booking.duration || 'Flexible'} Days</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Paid</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">₹{booking.totalAmount?.toLocaleString('en-IN') || '0'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all hover:rotate-12 active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                      <i className="bi bi-arrow-up-right text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white dark:bg-gray-800 text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-500"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedBooking(null)}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all z-10"
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl">
                    <i className="bi bi-ticket-perforated-fill"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Booking Overview</h2>
                    <p className="text-gray-500 font-medium">#{selectedBooking.bookingId} • Confirmed Trip</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                          <i className="bi bi-person"></i>
                        </div>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{selectedBooking.contactFullName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                          <i className="bi bi-envelope"></i>
                        </div>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{selectedBooking.contactEmail}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                          <i className="bi bi-telephone"></i>
                        </div>
                        <p className="font-bold text-gray-700 dark:text-gray-300">{selectedBooking.contactNumber}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">Pricing Breakdown</h3>
                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Base Fare ({selectedBooking.travelers} Guests)</span>
                        <span className="font-bold">₹{(selectedBooking.totalAmount * 0.82).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-500">Taxes & Fees</span>
                        <span className="font-bold text-emerald-500">+₹{(selectedBooking.totalAmount * 0.18).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white">Total Amount</span>
                        <span className="text-2xl font-black text-indigo-600">₹{selectedBooking.totalAmount?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </section>
                </div>

                {selectedBooking.companions && selectedBooking.companions.length > 0 && (
                  <section className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">Co-Travelers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedBooking.companions.map((companion, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-xl">
                            {companion.gender === 'M' ? '🧔' : '👩'}
                          </div>
                          <div>
                            <p className="font-black text-gray-900 dark:text-white">{companion.fullName}</p>
                            <p className="text-xs text-gray-500">{companion.age} Yrs • {companion.relation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {selectedBooking.specialRequest && (
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">Special Requests</h3>
                    <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20">
                      <p className="text-amber-800 dark:text-amber-300 font-medium italic">"{selectedBooking.specialRequest}"</p>
                    </div>
                  </section>
                )}

                <div className="mt-12">
                  <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-[2rem] transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                    Download Payment Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookingDetails;