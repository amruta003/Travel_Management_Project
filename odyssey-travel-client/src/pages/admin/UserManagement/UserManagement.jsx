import React from "react";
import useUserManagement from "./useUserManagement";

export default function UserManagement() {
  // We get all the data and functions from our custom hook
  const {
    users,
    searchTerm,
    setSearchTerm,
    loading,
    fetchUsers,
    handleToggleBlock,
    filteredUsers,
  } = useUserManagement();

  return (
    <div className="p-10 dark:bg-gray-800 font-sans max-w-screen mx-auto dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">User Management</h1>

      {/* Control Box: Search and Refresh */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-900 p-4 border dark:border-gray-700 rounded shadow-sm">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border dark:border-gray-600 rounded w-80 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-900 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Refresh List
        </button>
      </div>

      {/* Message if loading */}
      {loading && <p className="text-center font-bold text-blue-500 dark:text-blue-400 mb-4 animate-pulse">Loading Users...</p>}

      {/* Main Table */}
      <div className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4 border-b dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200">ID</th>
              <th className="p-4 border-b dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200">Name</th>
              <th className="p-4 border-b dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200">Email</th>
              <th className="p-4 border-b dark:border-gray-600 font-bold text-gray-700 dark:text-gray-200">Status</th>
              <th className="p-4 border-b dark:border-gray-600 text-center font-bold text-gray-700 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 transition-colors">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.id}</td>
                  <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{user.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="p-4">
                    {user.blocked ? (
                      <span className="text-red-600 dark:text-red-400 font-bold px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded text-xs">Blocked</span>
                    ) : (
                      <span className="text-green-600 dark:text-green-400 font-bold px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded text-xs">Active</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleBlock(user.id, user.blocked)}
                      className={`px-4 py-2 rounded text-white font-bold text-sm transition shadow-sm ${user.blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      {user.blocked ? "Unblock" : "Block User"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500 dark:text-gray-400 italic">
                  No users were found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
