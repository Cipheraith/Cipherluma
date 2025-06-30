import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [currentPage, setCurrentPage] = useState<'loading' | 'landing' | 'auth' | 'dashboard' | 'admin'>('loading');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('cipherluma_token');
    const adminToken = localStorage.getItem('cipherluma_admin_token');
    
    if (adminToken) {
      setIsAdmin(true);
      setIsAuthenticated(true);
      setCurrentPage('admin');
    } else if (token) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    } else {
      // Show loading screen for 2 seconds, then landing page
      const timer = setTimeout(() => {
        setCurrentPage('landing');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = (token: string) => {
    // Check if it's an admin login (simple check for demo)
    if (token.includes('admin')) {
      localStorage.setItem('cipherluma_admin_token', token);
      setIsAdmin(true);
      setIsAuthenticated(true);
      setCurrentPage('admin');
    } else {
      localStorage.setItem('cipherluma_token', token);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cipherluma_token');
    localStorage.removeItem('cipherluma_admin_token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentPage('landing');
  };

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  if (currentPage === 'loading') {
    return <LoadingScreen />;
  }

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'auth') {
    return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
  }

  if (currentPage === 'admin' && isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;