import React, { useState, useEffect } from "react";
import axios from "axios";

function TravelPackageApproval() {
  const [pendingPackages, setPendingPackages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch pending packages from backend
  const fetchPending = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/packages/admin/pending");
      setPendingPackages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setMessage("Failed to load pending packages.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // Update package status (APPROVE or REJECT)
  const updateStatus = async (id, status) => {
    try {
      await axios.post(`http://localhost:8080/api/packages/${id}/status/${status}`);
      setMessage(`Package ${status === 'APPROVED' ? 'Approved' : 'Rejected'}!`);
      fetchPending(); // Reload the list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update package.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Package Approval Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Review and manage pending travel packages submitted by agents.
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className="max-w-md mx-auto mb-10 translate-y-0 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-xl text-center font-semibold shadow-sm text-sm">
              {message}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Fetching pending requests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingPackages.length > 0 ? (
              pendingPackages.map((pkg) => (
                <div
                  key={pkg.packageId}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={`http://localhost:8080${pkg.imageUrl}`}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://placehold.co/400x250?text=No+Image" }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                        PENDING
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                        {pkg.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-black text-blue-600 dark:text-blue-400">₹{pkg.price}</span>
                      <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">/ person</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[11px] mb-4 bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg w-fit">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {pkg.destination}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <button
                        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-green-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                        onClick={() => updateStatus(pkg.packageId, "APPROVED")}
                      >
                        Approve
                      </button>

                      <button
                        className="bg-white dark:bg-gray-700 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                        onClick={() => updateStatus(pkg.packageId, "REJECTED")}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
                <p className="text-gray-500 dark:text-gray-400">There are no pending packages requiring your approval right now.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TravelPackageApproval;
