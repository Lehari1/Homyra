import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user && user.token ? children : <Navigate to="/login" />;
}