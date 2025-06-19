import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaWifi, FaBriefcase, FaTv, FaSnowflake, FaBath,
  FaDoorOpen, FaCut, FaCamera
} from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const amenityIcons = {
  wifi: <FaWifi className="text-indigo-600" />,
  'dedicated workspace': <FaBriefcase className="text-gray-700" />,
  tv: <FaTv className="text-gray-700" />,
  'air conditioning': <FaSnowflake className="text-blue-400" />,
  bath: <FaBath className="text-pink-500" />,
  'private patio or balcony': <FaDoorOpen className="text-green-600" />,
  'hair dryer': <FaCut className="text-yellow-600" />,
  'exterior security cameras on property': <FaCamera className="text-red-500" />,
};

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/${id}`);
      const data = await res.json();
      const hostRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${data.host_id}`);
      const host = await hostRes.json();
      setListing({ ...data, host_name: host.full_name, host_email: host.email });
    };
    fetchListing();
  }, [id]);

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate - inDate;
    const nights = diffTime / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights : 0;
  };

  const nights = getNights();
  const nightlyRate = listing ? Number(listing.price.replace(/[^\d]/g, '')) : 0;
  const totalPrice = nightlyRate * nights;

  const handleReserve = async () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.user?.id) {
      alert("You must be logged in to book.");
      return;
    }

    const booking = {
      listing_id: listing.id,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      user_id: currentUser.user.id
    };

   const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });

    if (res.ok) {
      alert("Booking successful!");
      window.location.href = "/bookings";
    } else {
      alert("Booking failed. Try again.");
    }
  };

  if (!listing) {
    return <div className="text-center py-16 text-lg text-gray-600">Loading listing details...</div>;
  }

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="rounded-xl overflow-hidden mb-6">
          <img src={listing.image} alt={listing.title} className="w-full h-[450px] object-cover" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{listing.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{listing.location}</p>
        <p className="text-gray-800 leading-relaxed mb-6 text-md">{listing.description}</p>

        {listing.amenities?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {listing.amenities.map((amenity, idx) => {
                const iconKey = amenity.toLowerCase();
                return (
                  <div key={idx} className="flex items-center gap-3">
                    {amenityIcons[iconKey] || <FaTv className="text-gray-400" />}<span className="capitalize font-medium text-gray-800">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Availability</h2>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-gray-500">Available From</p>
              <p className="font-medium">{formatDate(listing.available_from)}</p>
            </div>
            <div>
              <p className="text-gray-500">Available To</p>
              <p className="font-medium">{formatDate(listing.available_to)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-24 border rounded-xl p-6 shadow-md h-fit bg-white">
        <p className="text-2xl font-semibold text-gray-900 mb-1">
          {listing.price} <span className="text-base font-normal text-gray-600">/ night</span>
        </p>

        {checkIn && checkOut ? (
          nights > 0 ? (
            <p className="text-md text-gray-800 mt-1">
              {nights} night{nights > 1 ? 's' : ''} × ₹{nightlyRate.toLocaleString()} = <strong>₹{totalPrice.toLocaleString()}</strong>
            </p>
          ) : (
            <p className="text-sm text-red-500 mt-1">⚠️ Check-out must be after check-in.</p>
          )
        ) : (
          <p className="text-sm text-gray-500 mt-1">Select check-in and check-out dates to calculate total price.</p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <input type="date" className="border rounded p-2" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          <input type="date" className="border rounded p-2" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          <input type="number" min="1" className="border rounded p-2" value={guests} onChange={(e) => setGuests(Number(e.target.value))} placeholder="Guests" />
        </div>

        <button onClick={handleReserve} className="w-full bg-[#5C3BFE] text-white text-lg py-2 mt-4 rounded hover:bg-[#4a2ed9] transition">
          Reserve
        </button>
        <p className="text-xs text-gray-500 mt-2">You won’t be charged yet</p>

        <div className="mt-6 border-t pt-4 text-sm text-gray-700">
          <p>Hosted by <span className="font-semibold">{listing.host_name}</span></p>
          <p className="text-gray-500">Contact: {listing.host_email}</p>
        </div>
      </div>
    </div>
  );
}
