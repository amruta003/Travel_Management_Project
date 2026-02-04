import { useState, useEffect } from "react";
import api from "../../../api/axios";

export default function useUserBookingDetails() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Standardize user retrieval from localStorage
    const savedUser = localStorage.getItem("user");
    const userObj = savedUser ? JSON.parse(savedUser) : null;
    const userId = userObj?.id || null;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/bookings/user/${userId}`);

            const sortedBookings = response.data.sort((a, b) => {

                return b.bookingId - a.bookingId;
            });
            setBookings(sortedBookings);
            setError(null);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load bookings. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return {
        bookings,
        loading,
        error,
        refreshBookings: fetchBookings
    };
}
