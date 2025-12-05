import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Calendar, MapPin } from 'lucide-react';
import QRCode from 'qrcode';

const TicketModal = ({ ticketData, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && ticketData.qrCodeData) {
      QRCode.toCanvas(canvasRef.current, ticketData.qrCodeData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#06b6d4',
          light: '#0f172a'
        }
      });
    }
  }, [ticketData]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ticket-${ticketData.eventTitle}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong p-8 rounded-2xl neon-border-cyan max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 gradient-text">
            INTERFEST 2025
          </h2>
          <p className="text-gray-400">OFFICIAL TICKET</p>
        </div>

        <div className="space-y-3 mb-6 text-left">
          <div>
            <p className="text-sm text-gray-400">Event:</p>
            <p className="text-lg font-semibold text-white">{ticketData.eventTitle}</p>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span>{new Date(ticketData.eventDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} />
            <span>{ticketData.eventVenue}</span>
          </div>
        </div>

        {/* QR Code with Laser Scanner Animation */}
        <div className="relative mx-auto w-64 h-64 mb-6 glass rounded-2xl p-4 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
          
          {/* Animated Laser Scan Line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-cyber-cyan shadow-neon-cyan"
            animate={{
              top: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        <div className="space-y-2 mb-6 glass p-4 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-400">Name:</span>
            <span className="font-semibold">{ticketData.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">USN:</span>
            <span className="font-semibold">1NT21CS001</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="w-full py-3 rounded-lg glass-strong border-2 border-cyber-cyan text-cyber-cyan font-semibold hover:bg-cyber-cyan hover:text-white transition-all shadow-neon-cyan flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Download Ticket
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TicketModal;
