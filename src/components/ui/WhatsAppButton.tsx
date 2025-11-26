'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const timer = setTimeout(() => {
      setShowPopup(true);
      const hideTimer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/2547XXXXXXXX?text=Hi%20Yve%20Collective,%20I'd%20like%20to%20plan%20a%20retreat."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl rounded-full p-4 flex items-center justify-center transition-all duration-300 z-50 w-[60px] h-[60px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20, 
          delay: 1 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="w-7 h-7">
          <path d="M380.9 97.1C339-3.6 228.1-33.8 138.8 9.1 58.7 46.5 11.1 124.2 24.9 207.8L3.4 314.1c-3.4 17.3 12.3 31.4 29.2 26.1l104.4-32.3c75.8 42.2 169.5 23.3 225.3-47.8 49.1-62.9 54.3-151 18.6-216zm-180.1 258c-19.5 0-38.6-4.7-55.7-13.7l-4-2.1-62 19.2 13-62.7-2.6-4.2c-29.9-48-20.4-110.2 21.4-148 37.9-33.8 94.3-40.3 139.4-16.1 42.7 23 69.4 67.7 69.4 115.7 0 72-58.5 131.9-128.5 131.9zm74.8-99.8c-4-2.1-23.7-11.7-27.4-13.1-3.7-1.4-6.4-2.1-9.2 2.1-2.7 4.2-10.6 13.1-13 15.7-2.4 2.6-4.8 2.9-8.8 1-4-2.1-16.9-6.2-32.2-19.7-11.9-10.5-19.9-23.5-22.3-27.5-2.4-4.2-.1-6.3 1.8-8.4 1.8-1.8 4-4.8 6-7.2s2.7-4.2 4-7c1.3-2.6.7-5.2-.3-7.3-1-2.1-9.2-22.3-12.6-30.6-3.3-8.4-6.8-7.2-9.2-7.4-2.4-.1-5.2-.1-8-.1s-7.3 1-11.1 5.2c-3.7 4.2-14.6 14.3-14.6 34.8s14.9 40.3 17 43.1c2.1 2.6 29.4 44.9 71.4 63 42 18.1 42 12.1 49.5 11.3 7.6-.7 23.7-9.8 27.1-19.4 3.3-9.6 3.3-17.8 2.4-19.4-1-1.5-3.6-2.6-7.6-4.7z" />
        </svg>
      </motion.a>

      {/* Popup Message */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed bottom-24 right-6 bg-white shadow-xl rounded-2xl px-5 py-4 z-50 max-w-[280px] border border-gray-100"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-sm text-[#333232]">
                  <span className="font-semibold">Hello!</span> Welcome to{' '}
                  <span className="font-semibold text-[#6F655C]">Yve Collective</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tap to chat with us on WhatsApp
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
