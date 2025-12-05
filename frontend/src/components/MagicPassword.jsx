import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';

const MagicPassword = ({ onSuccess }) => {
  const [sequence, setSequence] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const correctSequence = ['red', 'blue', 'green'];

  const handleButtonClick = (color) => {
    if (isSuccess) return;

    const newSequence = [...sequence, color];
    setSequence(newSequence);

    // Check if sequence matches so far
    const isCorrectSoFar = correctSequence.slice(0, newSequence.length).every(
      (c, i) => c === newSequence[i]
    );

    if (!isCorrectSoFar) {
      // Wrong sequence - shake and reset
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setSequence([]);
      }, 500);
    } else if (newSequence.length === correctSequence.length) {
      // Complete success
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  const buttons = [
    { color: 'red', bg: 'bg-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]', glow: 'shadow-[0_0_30px_rgba(239,68,68,0.8)]' },
    { color: 'blue', bg: 'bg-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.8)]' },
    { color: 'green', bg: 'bg-green-500', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]', glow: 'shadow-[0_0_30px_rgba(34,197,94,0.8)]' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isError ? [1, 1.05, 0.95, 1] : 1, 
          opacity: 1,
          x: isError ? [-10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.5 }}
        className="glass-strong p-10 rounded-2xl neon-border-purple max-w-md w-full"
      >
        {!isSuccess ? (
          <>
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 mx-auto mb-4 text-cyber-purple" />
              <h2 className="text-3xl font-bold mb-2 gradient-text">
                Magic Light Password
              </h2>
              <p className="text-gray-400">
                Click the buttons in the correct sequence
              </p>
            </div>

            <div className="flex justify-center gap-6 mb-8">
              {buttons.map((btn) => {
                const isActive = sequence.includes(btn.color);
                return (
                  <motion.button
                    key={btn.color}
                    onClick={() => handleButtonClick(btn.color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      w-20 h-20 rounded-full ${btn.bg} 
                      ${isActive ? btn.glow : btn.shadow}
                      transition-all duration-300
                    `}
                  />
                );
              })}
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${sequence[i] ? 'bg-cyber-cyan shadow-neon-cyan' : 'bg-gray-700'}
                  `}
                />
              ))}
            </div>

            <p className="text-center text-sm text-gray-500">
              Hint: Red → Blue → Green
            </p>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-24 h-24 mx-auto mb-4 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Access Granted!
            </h2>
            <p className="text-gray-400">
              Proceeding to registration...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MagicPassword;
