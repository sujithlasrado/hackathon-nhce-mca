import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Registrations', 
      value: '1,240', 
      icon: Users,
      gradient: 'from-cyber-cyan to-cyber-blue'
    },
    { 
      title: 'Total Revenue', 
      value: '₹45,000', 
      icon: DollarSign,
      gradient: 'from-cyber-purple to-cyber-pink'
    },
    { 
      title: 'Check-ins Today', 
      value: '850', 
      icon: CheckCircle,
      gradient: 'from-cyber-cyan to-cyber-purple'
    },
    { 
      title: 'Remaining Seats', 
      value: '120', 
      icon: Calendar,
      gradient: 'from-cyber-pink to-cyber-purple'
    }
  ];

  const chartData = [
    { time: '00:00', registrations: 120 },
    { time: '04:00', registrations: 180 },
    { time: '08:00', registrations: 320 },
    { time: '12:00', registrations: 450 },
    { time: '16:00', registrations: 680 },
    { time: '20:00', registrations: 920 },
    { time: '24:00', registrations: 1240 }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Hackathon 2025',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      registrations: 450,
      revenue: '₹22,500'
    },
    {
      id: 2,
      title: 'Battle of Bands',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
      registrations: 380,
      revenue: '₹15,200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-strong p-6 rounded-2xl neon-border-cyan"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-strong p-8 rounded-2xl neon-border-purple mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Live Registrations (Last 24h)</h2>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp size={20} />
            <span className="font-semibold">+32%</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fill="url(#colorRegistrations)"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#06b6d4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Events */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -5 }}
              className="glass-strong rounded-2xl overflow-hidden neon-border-cyan"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Registrations:</span>
                      <span className="font-semibold text-cyber-cyan">{event.registrations}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="font-semibold text-cyber-purple">{event.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
