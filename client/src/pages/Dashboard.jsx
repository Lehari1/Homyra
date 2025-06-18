// src/pages/Dashboard.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import { listings, destinations } from '../data/SampleListings';


export default function Dashboard() {

 const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log("📦 currentUser in Dashboard:", currentUser);
const userName = currentUser?.user?.full_name || 'Guest';

  return (
    <div className="px-6 py-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Welcome, {userName} 👋</h2>
        <h1 className="text-3xl font-bold mt-2">Find your next stay</h1>
      </div>
      {/* Search Bar */}
      <div className="mt-6">
        <SearchBar />
      </div>

      {/* Destinations */}
      <h2 className="text-2xl font-semibold mt-10 mb-6">Explore Destinations</h2>
      <div className="flex justify-center gap-10">
        {destinations.map((d) => (
          <div key={d.name} className="text-center">
            <img src={d.image} alt={d.name} className="w-24 h-24 rounded-full object-cover mx-auto" />
            <p className="mt-2 font-medium">{d.name}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <h2 className="text-2xl font-semibold mt-10 mb-6">Popular Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.title} className="border rounded-lg overflow-hidden shadow">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-left">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{listing.title}</h3>
                <button className="bg-[#5847E9] text-white px-4 py-1 rounded-md text-sm">Book</button>
              </div>
              <p className="text-gray-600">{listing.location}</p>
              <p className="font-semibold mt-1">{listing.price}</p>
              <p className="text-sm text-gray-500 mt-2">{listing.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
