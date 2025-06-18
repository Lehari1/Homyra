// src/components/ExploreDestinations.jsx
import React from 'react';

const destinations = [
  { image: "/cabin.jpeg", title: "Manali" },
  { image: "/beach.jpeg", title: "Goa" },
  { image: "/hill.jpeg", title: "Darjeeling" },
];

export default function ExploreDestinations() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Explore Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <div key={idx} className="rounded overflow-hidden shadow-md">
            <img src={dest.image} alt={dest.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{dest.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
