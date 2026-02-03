import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const userObj = JSON.parse(savedUser);
    fetchPackages(userObj.id);
  }, [navigate]);

  const fetchPackages = async (userId) => {
    try {
      const resp = await axios.get(`http://localhost:8080/api/packages/agent/${userId}`);
      setPackages(resp.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Packages</h2>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">Package Title</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {packages.map((pkg) => (
                <tr key={pkg.packageId} className="border-b">
                  <td className="py-2">{pkg.title}</td>
                  <td>{pkg.destination}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded ${pkg.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td>₹{pkg.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyPackages;
