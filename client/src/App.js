import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BrothersPage from './pages/BrothersPage';
import LoginPage from './pages/LoginPage';
import RushPage from './pages/RushPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ErrorPage from './pages/ErrorPage';
import StorePage from './pages/auth-pages/StorePage';
import AccountPage from './pages/auth-pages/AccountPage';
import SchedulePage from './pages/auth-pages/SchedulePage';
import ImportantPage from './pages/auth-pages/ImportantPage';
import AnnouncementsPage from './pages/auth-pages/AnnouncementsPage';
import AddAnnouncementPage from './pages/auth-pages/AddAnnouncementPage';
import { ProtectedRoutes, LoggedInRoutes } from './components/VerifyAuth';
import Footer from './components/Footer';

function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isResetPasswordPage = location.pathname.startsWith('/reset-password/');
  const shouldShowFooter = !(isLoginPage || isSignupPage || isForgotPasswordPage || isResetPasswordPage);

  return (
    <div>
      <Navbar isLoginPage={isLoginPage} isSignupPage={isSignupPage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/brothers" element={<BrothersPage />} />
        <Route path="/rush" element={<RushPage />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token/:id" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/store" element={<StorePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/important" element={<ImportantPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/add-announcement" element={<AddAnnouncementPage />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
