import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAgentApproval = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all users with role 'AGENT'
    const fetchAgents = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/v1/users/role/agent");
            const mappedAgents = response.data.map(agent => ({
                userId: agent.id,
                name: `${agent.firstName || ""} ${agent.lastName || ""}`.trim() || agent.email,
                email: agent.email,
                active: agent.active
            }));
            setAgents(mappedAgents);
            setError(null);
        } catch (error) {
            console.error("Error fetching agents:", error);
            setError("Failed to load agents. Is your backend running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    // Activate an agent
    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/users/${id}/status/true`);
            toast.success("Agent activated successfully");
            fetchAgents(); // Refresh the list to show updated status
        } catch (error) {
            console.error("Error activating agent", error);
            toast.error("Failed to activate agent");
        }
    };

    // Inactivate/Reject an agent
    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/users/${id}/status/false`);
            toast.success("Agent inactivated successfully");
            fetchAgents(); // Refresh the list
        } catch (error) {
            console.error("Error inactivating agent", error);
            toast.error("Failed to inactivate agent");
        }
    };

    return {
        agents,
        loading,
        error,
        handleApprove,
        handleReject
    };
};

export default useAgentApproval;