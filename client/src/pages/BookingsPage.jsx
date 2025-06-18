import React, { useEffect, useState } from 'react';

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

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
        <p className="text-gray-500 text-center">You haven’t made any bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map(b => (
            <div key={b.id} className="border rounded-lg shadow p-4">
              <img src={b.image} alt={b.title} className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="text-xl font-semibold">{b.title}</h2>
              <p className="text-gray-600">{b.location}</p>
              <p className="text-sm mt-1">🗓️ {b.check_in} → {b.check_out}</p>
              <p className="text-sm">👥 {b.guests} guest(s)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
