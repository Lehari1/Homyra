import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const hostId = currentUser?.user?.id;

export default function AddListing() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    image: '',
    description: '',
    amenities: '',
    availableFrom: null,
    availableTo: null,
    host_id:  hostId || null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      amenities: form.amenities.split(',').map((a) => a.trim()),
      available_from: form.availableFrom,
      available_to: form.availableTo
    };

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('🏠 Listing added!');
      setForm({
        title: '',
        location: '',
        price: '',
        image: '',
        description: '',
        amenities: '',
        availableFrom: null,
        availableTo: null,
        host_id: 1
      });
    } else {
      alert('❌ Error adding listing');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Add a New Listing</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Basic Info</h3>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Listing Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price per Night"
            type="number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description & Amenities */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Details</h3>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="Amenities (comma separated)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Availability */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Available From</label>
            <DatePicker
              selected={form.availableFrom}
              onChange={(date) => setForm({ ...form, availableFrom: date })}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholderText="Select start date"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Available To</label>
            <DatePicker
              selected={form.availableTo}
              onChange={(date) => setForm({ ...form, availableTo: date })}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholderText="Select end date"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
             + Add Listing
          </button>
        </div>
      </form>
    </div>
  );
}
