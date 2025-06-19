import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get('location');
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const guests = queryParams.get('guests');
  

  const handleSearch = () => {
    if (!location) return alert('Please enter a destination');
    const query = new URLSearchParams({
      location,
      checkIn: checkIn ? checkIn.toISOString().split('T')[0] : '',
      checkOut: checkOut ? checkOut.toISOString().split('T')[0] : '',
      guests
    }).toString();
    navigate(`/search?${query}`);
  };
 
  useEffect(() => {
    const fetchListings = async () => {
     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/search?location=${searchLocation}`);
      const data = await res.json();
      setResults(data);
    };

    if (searchLocation) {
      fetchListings();
    }
  }, [searchLocation]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>

      {results.length === 0 ? (
        <p>No listings found for "{searchLocation}".</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((listing) => (
            <div
              key={listing.id}
              onClick={() => navigate(`/listing/${listing.id}`)}
              className="cursor-pointer border rounded shadow-md p-4 hover:shadow-lg transition"
            >
              <img src={listing.image} className="w-full h-48 object-cover rounded" />
              <h2 className="font-bold text-lg mt-2">{listing.title}</h2>
              <p className="text-gray-500">{listing.location}</p>
              <p className="font-semibold">₹{listing.price} / night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
