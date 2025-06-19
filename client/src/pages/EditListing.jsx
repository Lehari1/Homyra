import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    image: '',
    amenities: '',
    available_from: null,
    available_to: null
  });

  // Fetch listing data to prefill
  useEffect(() => {
   fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/${id}`)
      .then(res => res.json())
      .then(data =>
        setListing({
          ...data,
          amenities: data.amenities ? data.amenities.join(', ') : '',
          available_from: data.available_from ? new Date(data.available_from) : null,
          available_to: data.available_to ? new Date(data.available_to) : null
        })
      );
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedListing = {
      ...listing,
      price: Number(listing.price),
      amenities: listing.amenities.split(',').map((a) => a.trim()),
      available_from: listing.available_from,
      available_to: listing.available_to
    };

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/listings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedListing)
    });

    if (res.ok) {
      alert("Listing updated!");
      navigate('/host');
    } else {
      alert("Failed to update listing");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={listing.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={listing.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={listing.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={listing.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={listing.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        {/* New Fields */}
        <input
          type="text"
          name="amenities"
          value={listing.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma-separated)"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Available From</label>
            <DatePicker
              selected={listing.available_from}
              onChange={(date) => setListing(prev => ({ ...prev, available_from: date }))}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Available To</label>
            <DatePicker
              selected={listing.available_to}
              onChange={(date) => setListing(prev => ({ ...prev, available_to: date }))}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
}
