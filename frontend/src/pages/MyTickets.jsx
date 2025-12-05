import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin } from 'lucide-react';

const MyTickets = () => {
  const user = {
    name: 'Avery Smith',
    usn: '1NT21CS001',
    college: 'NIT Surathkal'
  };

  const pastEvents = [
    {
      id: 1,
      title: 'RoboWars 2024',
      college: 'NIT Surathkal',
      status: 'Attended',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400'
    },
    {
      id: 2,
      title: 'Coding Challenge 2023',
      college: 'BMSCE',
      status: 'Attended',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
    },
    {
      id: 3,
      title: 'RoboWars 2024',
      college: 'NIT Surathkal',
      status: 'Attended',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400'
    },
    {
      id: 4,
      title: 'Coding Challenge 2023',
      college: 'NIT Surathkal',
      status: 'Attended',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* User Profile Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong p-8 rounded-2xl neon-border-purple mb-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-cyan flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-400">USN: {user.usn}</p>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              <MapPin size={16} />
              <span>College: {user.college}</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg glass border-2 border-cyber-cyan text-cyber-cyan font-semibold hover:bg-cyber-cyan hover:text-white transition-all shadow-neon-cyan"
        >
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Past Events Section */}
      <h2 className="text-3xl font-bold mb-6">Past Events</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pastEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass rounded-2xl overflow-hidden neon-border-cyan cursor-pointer group"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className="glass-strong px-3 py-1 rounded-full text-xs text-green-400 border border-green-400">
                  {event.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} />
                <span>{event.college}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
