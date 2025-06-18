// src/components/PopularListings.jsx
import React from 'react';

const listings = [
  { image: "/lol1.jpeg", title: "Luxury Stay in Kerala", price: "₹4,500/night" },
  { image: "/lol2.jpeg", title: "Villa in Jaipur", price: "₹6,000/night" },
  { image: "/lol3.jpeg", title: "Beachfront Room", price: "₹5,000/night" },
];

export default function PopularListings() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Popular Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((item, idx) => (
          <div key={idx} className="rounded overflow-hidden shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
