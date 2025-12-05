import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import MagicPassword from './MagicPassword';
import TicketModal from './TicketModal';
import axios from 'axios';

const EventCard = ({ event }) => {
  const [showMagicPassword, setShowMagicPassword] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleRegisterClick = () => {
    if (event.isMagicEvent) {
      setShowMagicPassword(true);
    } else {
      setShowNameInput(true);
    }
  };

  const handleMagicSuccess = () => {
    setShowMagicPassword(false);
    setShowNameInput(true);
  };

  const handleRegistration = async () => {
    if (!studentName.trim()) return;

    try {
      const response = await axios.post('/api/register', {
        eventId: event._id,
        studentName: studentName
      });

      setTicketData({
        ...response.data,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.college
      });
      setShowNameInput(false);
      setShowTicket(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="glass rounded-2xl overflow-hidden neon-border-cyan group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image || `https://source.unsplash.com/800x400/?${event.title}`}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 gradient-text">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span className="text-sm">{event.college}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Users size={16} />
              <span className="text-sm">Seats Left: {event.seats}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRegisterClick}
            className="w-full py-3 rounded-lg glass-strong border-2 border-cyber-cyan text-cyber-cyan font-semibold hover:bg-cyber-cyan hover:text-white transition-all shadow-neon-cyan"
          >
            Register - {event.seats} Seats Left
          </motion.button>
        </div>
      </motion.div>

      {showMagicPassword && (
        <MagicPassword onSuccess={handleMagicSuccess} />
      )}

      {showNameInput && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong p-8 rounded-2xl neon-border-purple max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Enter Your Details
            </h2>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-cyber-cyan outline-none mb-4"
            />
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegistration}
                className="flex-1 py-3 rounded-lg bg-cyber-cyan text-white font-semibold shadow-neon-cyan"
              >
                Confirm Registration
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNameInput(false)}
                className="px-6 py-3 rounded-lg glass border border-white/20"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {showTicket && ticketData && (
        <TicketModal
          ticketData={ticketData}
          onClose={() => setShowTicket(false)}
        />
      )}
    </>
  );
};

export default EventCard;
