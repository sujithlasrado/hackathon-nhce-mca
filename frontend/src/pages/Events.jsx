import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('NIT Surathkal');
  const [loading, setLoading] = useState(true);

  const colleges = [
    { name: 'NIT Surathkal', icon: '⚙️' },
    { name: 'BMSCE', icon: '🎓' },
    { name: 'RVCE', icon: '🏛️' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Use mock data if API fails
      setEvents([
        {
          _id: '1',
          title: 'Hackathon 2025',
          college: 'NIT Surathkal',
          date: '2025-10-26T10:00:00',
          description: 'Hackathon 2025 is a unneqrty whoektnhub becamed opportunity, pulls and exprore to collaplining team sequires.',
          seats: 3,
          isMagicEvent: true,
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
        },
        {
          _id: '2',
          title: 'Battle of Bands',
          college: 'BMSCE',
          date: '2025-10-27T18:00:00',
          description: 'Ultimate music showdown featuring the best college bands competing for glory.',
          seats: 150,
          isMagicEvent: false,
          image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'
        },
        {
          _id: '3',
          title: 'RoboWars 2024',
          college: 'NIT Surathkal',
          date: '2025-11-15T14:00:00',
          description: 'Battle robots in an epic arena showdown. Build, fight, and conquer!',
          seats: 50,
          isMagicEvent: false,
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => event.college === selectedCollege);

  return (
    <div className="max-w-7xl mx-auto">
      {/* College Filter Tabs */}
      <div className="flex gap-4 mb-8 justify-center">
        {colleges.map((college) => (
          <motion.button
            key={college.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCollege(college.name)}
            className={`
              px-8 py-3 rounded-full font-semibold transition-all
              ${selectedCollege === college.name
                ? 'glass-strong neon-border-purple shadow-neon-purple'
                : 'glass border border-white/10 text-gray-400 hover:text-white'
              }
            `}
          >
            <span className="mr-2">{college.icon}</span>
            {college.name}
          </motion.button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center text-gray-400">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && !loading && (
        <div className="text-center text-gray-400 mt-12">
          No events found for {selectedCollege}
        </div>
      )}
    </div>
  );
};

export default Events;
