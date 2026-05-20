// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import StudentRecordPage from './pages/StudentRecordPage';
import SearchPage from './pages/SearchPage';
import NoticesPage from './pages/NoticesPage';
import AdminPage from './pages/AdminPage';
import ClassifiedPage from './pages/ClassifiedPage';
import StegoPage from './pages/StegoPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard"        element={<DashboardPage />} />
        <Route path="/students"         element={<StudentsPage />} />
        <Route path="/students/:id"     element={<StudentRecordPage />} />
        <Route path="/search"           element={<SearchPage />} />
        <Route path="/notices"          element={<NoticesPage />} />
        <Route path="/admin"            element={<AdminPage />} />
        <Route path="/secret"       element={<ClassifiedPage />} />
        <Route path="/stego"            element={<StegoPage />} />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*"   element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
