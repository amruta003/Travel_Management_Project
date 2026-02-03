import React from 'react';
import useAgentApproval from './useAgentApproval';

function AgentApproval() {
  const { agents, loading, error, handleApprove, handleReject } = useAgentApproval();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
        <div className="rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading agents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center border-t-4 border-red-500">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <div className="text-gray-900 dark:text-white text-xl font-bold mb-2">Connection Error</div>
          <div className="text-gray-500 dark:text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Agent Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Review and manage agent activation status.
          </p>
        </div>

        {agents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">No Agents Found</h3>
            <p className="text-gray-500 dark:text-gray-400">There are no users signed up with the agent role yet.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Agent Details</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {agents.map((agent) => (
                    <tr key={agent.userId} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{agent.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{agent.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        {agent.active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-3">
                          {!agent.active ? (
                            <button
                              onClick={() => handleApprove(agent.userId)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none"
                            >
                              Activate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReject(agent.userId)}
                              className="px-4 py-2 bg-gray-100 hover:bg-red-50 dark:bg-gray-700 dark:hover:bg-red-900/20 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-[11px] font-bold rounded-xl transition-all border border-gray-200 dark:border-gray-600"
                            >
                              Inactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentApproval;
