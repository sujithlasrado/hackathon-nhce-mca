import React from 'react';
import { motion } from 'framer-motion';

const Registrations = () => {
  const registrations = [
    { id: 1, name: 'John Doe', usn: '1NT21CS001', event: 'Hackathon 2025', college: 'NIT Surathkal', timestamp: '2025-12-05T10:30:00' },
    { id: 2, name: 'Jane Smith', usn: '1BM21CS045', event: 'Battle of Bands', college: 'BMSCE', timestamp: '2025-12-05T11:15:00' },
    { id: 3, name: 'Alex Johnson', usn: '1RV21CS123', event: 'RoboWars 2024', college: 'RVCE', timestamp: '2025-12-05T12:00:00' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 gradient-text">All Registrations</h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong rounded-2xl overflow-hidden neon-border-cyan"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-gray-400 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold">USN</th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold">Event</th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold">College</th>
              <th className="px-6 py-4 text-left text-gray-400 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <motion.tr
                key={reg.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">{reg.name}</td>
                <td className="px-6 py-4 text-gray-400">{reg.usn}</td>
                <td className="px-6 py-4 font-semibold text-cyber-cyan">{reg.event}</td>
                <td className="px-6 py-4 text-gray-400">{reg.college}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(reg.timestamp).toLocaleTimeString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Registrations;
