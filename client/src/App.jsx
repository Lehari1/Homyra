import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import HostDashboard from './pages/HostDashboard';
import Logout from './pages/Logout';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';
import ListingDetails from './pages/ListingDetails';
import DestinationPage from './pages/DestinationPage';
import SearchResults from './pages/SearchResults';
import Bookings from './pages/BookingsPage';
import OAuthSuccess from './pages/OAuthSuccess';

import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public layout and routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* OAuth redirect route */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Dashboard layout and protected routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/host" element={<PrivateRoute><HostDashboard /></PrivateRoute>} />
          <Route path="/host/add" element={<PrivateRoute><AddListing /></PrivateRoute>} />
          <Route path="/host/edit/:id" element={<PrivateRoute><EditListing /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
          
          {/* Public route inside dashboard layout */}
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/destination/:city" element={<DestinationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
