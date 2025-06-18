import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location) return alert('Please enter a location.');
    const queryParams = new URLSearchParams({
      location,
      checkIn: checkIn?.toISOString().split('T')[0] || '',
      checkOut: checkOut?.toISOString().split('T')[0] || '',
      guests
    }).toString();

    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md border border-gray-200 rounded-full max-w-6xl mx-auto px-2 py-2">
      {/* Segments */}
      <div className="flex items-center divide-x divide-gray-300 w-full">
        {/* Where */}
        <div className="px-6 py-2 flex flex-col rounded-l-full bg-gray-100">
          <label className="text-sm font-semibold text-gray-900">Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm text-gray-600 bg-transparent placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Check-in */}
        <div className="px-6 py-2 flex flex-col">
          <label className="text-sm font-semibold text-gray-900">Check in</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            placeholderText="Add dates"
            className="text-sm text-gray-600 bg-transparent focus:outline-none"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>

        {/* Check-out */}
        <div className="px-6 py-2 flex flex-col">
          <label className="text-sm font-semibold text-gray-900">Check out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            placeholderText="Add dates"
            className="text-sm text-gray-600 bg-transparent focus:outline-none"
            dateFormat="dd/MM/yyyy"
            minDate={checkIn || new Date()}
          />
        </div>

        {/* Guests */}
        <div className="px-6 py-2 flex flex-col">
          <label className="text-sm font-semibold text-gray-900">Who</label>
          <input
            type="number"
            min={1}
            placeholder="Add guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="text-sm text-gray-600 bg-transparent placeholder-gray-400 focus:outline-none w-16"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="ml-2 bg-[#5B3DF5] hover:bg-[#4A2FCC] text-white p-3 rounded-full transition"
        title="Search"
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}
