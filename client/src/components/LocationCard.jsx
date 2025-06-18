// src/components/LocationCard.jsx
import React from 'react';

export default function LocationCard({ location }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between">
      <img
        src={location.image}
        alt={location.title}
        className="rounded w-full h-48 object-cover mb-3"
      />
      <h3 className="text-xl font-semibold">{location.title}</h3>
      <p className="text-gray-600 mb-3">{location.price}</p>
      <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition">
        Book Now
      </button>
    </div>
  );
}
