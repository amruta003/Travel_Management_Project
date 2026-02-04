import React, { useEffect, useState } from 'react';
import api from "../../../api/axios";
import { useNavigate } from 'react-router-dom';

function BookingOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const userObj = JSON.parse(savedUser);
    fetchBookings(userObj.id);
  }, [navigate]);

  const fetchBookings = async (userId) => {
    try {
      const resp = await api.get(`/api/bookings/agent/${userId}`);
      setBookings(resp.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Bookings Overview</h2>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">Booking ID</th>
                <th>User</th>
                <th>Package</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.map((b) => (
                <tr key={b.bookingId} className="border-b">
                  <td className="py-2">#{b.bookingId}</td>
                  <td>{b.contactFullName}</td>
                  <td>{b.packageTitle}</td>
                  <td>{b.travelDate}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingOverview;
