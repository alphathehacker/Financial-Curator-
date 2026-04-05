import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Bell } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`p-[16px_24px] rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl border flex items-center gap-4 min-w-[280px] ${
                toast.type === 'success' 
                  ? 'bg-card/90 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-card/90 border-rose-500/20 text-rose-600 dark:text-rose-400'
              }`}>
                {toast.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <p className="text-[13px] font-[900] tracking-tight flex-1">{toast.message}</p>
                <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
                  <X className="w-4 h-4 opacity-40 hover:opacity-100" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
