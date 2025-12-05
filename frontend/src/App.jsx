import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, Calendar, Trophy, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import MyTickets from './pages/MyTickets';
import Registrations from './pages/Registrations';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" className="animate-float">
        <circle cx="20" cy="20" r="18" fill="none" stroke="url(#gradient1)" strokeWidth="2"/>
        <circle cx="20" cy="12" r="3" fill="#8b5cf6"/>
        <circle cx="13" cy="25" r="3" fill="#06b6d4"/>
        <circle cx="27" cy="25" r="3" fill="#ec4899"/>
        <path d="M20 12 L13 25 L27 25 Z" fill="none" stroke="#8b5cf6" strokeWidth="1.5"/>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div>
      <h1 className="text-2xl font-bold">
        InterFest <span className="gradient-text">Hub</span>
      </h1>
    </div>
  </div>
);

const Sidebar = ({ currentPath }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/registrations', icon: User, label: 'Registrations' },
    { path: '/winners', icon: Trophy, label: 'Winners' }
  ];

  return (
    <div className="w-64 min-h-screen glass border-r border-white/10 p-6 fixed left-0 top-0">
      <div className="mb-12">
        <Logo />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'glass-strong shadow-neon-purple text-white'
                    : 'text-gray-400 hover:text-white hover:glass'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const TopNav = () => {
  const [user] = useState({
    name: 'Avery Smith',
    usn: '1NT21CS001',
    college: 'NIT Surathkal'
  });

  return (
    <div className="glass border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <div className="flex gap-8">
        <Link to="/events">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Events
          </motion.span>
        </Link>
        <Link to="/my-tickets">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            My Tickets
          </motion.span>
        </Link>
      </div>
      
      <Link to="/my-tickets">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer glass px-4 py-2 rounded-full"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-cyan flex items-center justify-center">
            <User size={20} />
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const isAdminRoute = ['/dashboard', '/registrations', '/winners'].includes(location.pathname);

  return (
    <div className="flex min-h-screen">
      {isAdminRoute && <Sidebar currentPath={location.pathname} />}
      
      <div className={`flex-1 ${isAdminRoute ? 'ml-64' : ''}`}>
        {!isAdminRoute && <TopNav />}
        
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/winners" element={<div className="text-center text-2xl">Winners Page Coming Soon...</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
