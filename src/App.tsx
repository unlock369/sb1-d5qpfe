import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/context/AuthContext';
import { RequireAuth } from './lib/middleware/auth';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import PeoplePage from './pages/PeoplePage';
import MilestonesPage from './pages/MilestonesPage';
import RecentPage from './pages/RecentPage';
import FavoritesPage from './pages/FavoritesPage';
import SharedPage from './pages/SharedPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          } />
          <Route path="/calendar" element={
            <RequireAuth>
              <CalendarPage />
            </RequireAuth>
          } />
          <Route path="/people" element={
            <RequireAuth>
              <PeoplePage />
            </RequireAuth>
          } />
          <Route path="/milestones" element={
            <RequireAuth>
              <MilestonesPage />
            </RequireAuth>
          } />
          <Route path="/recent" element={
            <RequireAuth>
              <RecentPage />
            </RequireAuth>
          } />
          <Route path="/favorites" element={
            <RequireAuth>
              <FavoritesPage />
            </RequireAuth>
          } />
          <Route path="/shared" element={
            <RequireAuth>
              <SharedPage />
            </RequireAuth>
          } />
          <Route path="/settings" element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          } />
          <Route path="/help" element={
            <RequireAuth>
              <HelpPage />
            </RequireAuth>
          } />
          <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          } />
          <Route path="/upload" element={
            <RequireAuth>
              <UploadPage />
            </RequireAuth>
          } />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}