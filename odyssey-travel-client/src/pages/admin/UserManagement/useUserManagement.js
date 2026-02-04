import { useState, useEffect } from "react";
import api from "../../../api/axios";

// Removed hardcoded URL const
// const API_URL = "http://localhost:8080/api/v1/users";

export default function useUserManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to load users from backend
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Fetch only CLIENT role users
            const response = await api.get("/api/v1/users/role/CLIENT");
            // Map backend data to frontend format
            const mappedUsers = response.data.map(user => ({
                id: user.id,
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
                email: user.email,
                blocked: !user.active // if active is true, blocked is false
            }));
            setUsers(mappedUsers);
        } catch (error) {
            alert("Error: Could not get users.");
        }
        setLoading(false);
    };

    // Load users when page opens
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to block or unblock a user
    const handleToggleBlock = async (id, currentBlockedStatus) => {
        try {
            await api.put(`/api/v1/users/${id}/block?blocked=${!currentBlockedStatus}`);
            fetchUsers(); // Refresh the list after update
        } catch (error) {
            console.error("Block/Unblock error:", error);
            alert(`Error: Could not update user status. ${error.response?.data?.message || error.message}`);
        }
    };

    // Filter users based on search input
    const filteredUsers = users.filter((u) => {
        return (
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return {
        users,
        searchTerm,
        setSearchTerm,
        loading,
        fetchUsers,
        handleToggleBlock,
        filteredUsers,
    };
}
