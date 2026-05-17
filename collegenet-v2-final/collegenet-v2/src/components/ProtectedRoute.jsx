// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const authed = sessionStorage.getItem('ctf_authed') === 'true';
  return authed ? <Outlet /> : <Navigate to="/" replace />;
}
