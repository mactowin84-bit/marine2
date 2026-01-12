import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Prices from './pages/Prices';
import Vacancies from './pages/Vacancies';
import Documents from './pages/Documents';
import Licenses from './pages/Licenses';
import Contacts from './pages/Contacts';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes wrapped in Main Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/prices" element={<Layout><Prices /></Layout>} />
            <Route path="/vacancies" element={<Layout><Vacancies /></Layout>} />
            <Route path="/documents" element={<Layout><Documents /></Layout>} />
            <Route path="/licenses" element={<Layout><Licenses /></Layout>} />
            <Route path="/contacts" element={<Layout><Contacts /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;