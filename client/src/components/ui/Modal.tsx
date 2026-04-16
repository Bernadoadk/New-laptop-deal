import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl premium-card p-10 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{title}</h2>
              <button 
                onClick={onClose} 
                className="p-3 bg-white/5 hover:bg-white/10 text-nld-muted hover:text-white rounded-xl transition-all border border-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="scrollbar-hide">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
