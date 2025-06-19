import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  let currentUser = null;
  const storedUser = localStorage.getItem('currentUser');

  try {
    if (storedUser && storedUser !== 'undefined') {
      currentUser = JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Invalid user JSON from localStorage", e);
  }

  const userId = currentUser?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings?user_id=${userId}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please log in to view your bookings.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img
            src="/booking.png" // Place this in your public/ folder
            alt="No bookings"
            className="w-48 h-48 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-semibold text-gray-800">No bookings yet</h2>
          <p className="text-gray-500 mt-2 mb-6">
            Looks like you haven’t booked any stays. Start exploring now!
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            🔍 Explore Listings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map(b => (
            <div key={b.id} className="border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{b.title}</h2>
                <p className="text-sm text-gray-500">{b.location}</p>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>🗓️ {b.check_in} → {b.check_out}</span>
                  <span>👥 {b.guests} guest(s)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
