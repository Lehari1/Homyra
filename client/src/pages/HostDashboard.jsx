// HostDashboard.jsx src/pages/HostDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        const id = parsed?.user?.id;
        if (id) {
          setHostId(id);
        }
      }
    } catch (err) {
      console.error("❌ Invalid localStorage user:", err);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    if (!hostId) return;

    const fetchListings = async () => {
      try {
       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/host/${hostId}`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching host listings:', error);
      }
    };

    fetchListings();
  }, [hostId]);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user data...
      </div>
    );
  }

  if (!hostId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please log in to view your host dashboard.
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setListings(prev => prev.filter(listing => listing.id !== id));
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

   return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">🏡 Host Dashboard</h1>
          <button
            onClick={() => navigate('/host/add')}
            className="bg-[#4F46E5] text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition"
          >
            + Add New Listing
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center mb-8">
            <h3 className="text-xl font-semibold text-indigo-700">Welcome to your Host Dashboard</h3>
            <p className="text-gray-600">Manage all your properties, bookings, and reviews in one place.</p>
            <img
              src="./manage.jpeg" 
              alt="Dashboard Illustration"
              className="mx-auto w-60 mt-4"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white border rounded-lg shadow hover:shadow-md transition">
                <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">{listing.title}</h2>
                    <span className="text-black font-semibold text-lg underline">₹{listing.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{listing.location}</p>
                  <p className="text-sm text-gray-500 mt-2 h-12 overflow-hidden">{listing.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/host/edit/${listing.id}`)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition"
                      >Edit</button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                    <button className="bg-[#4F46E5] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-indigo-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
