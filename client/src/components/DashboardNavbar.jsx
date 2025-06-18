// src/components/DashboardNavbar.jsx
import { Link } from 'react-router-dom';

export default function DashboardNavbar() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">Homyra</h1>
      <nav className="flex space-x-6 text-gray-700 text-sm font-medium">
        <Link to="/host">Host</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
}
