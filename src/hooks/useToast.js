// RUTA: src/hooks/useToast.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

// AJUSTE: Añadimos 'FaTimes' a la importación y todos los hooks necesarios de React.
import { createContext, useContext, useState, useCallback, useEffect, useMemo, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Componente Individual de la Notificación (Toast)
const ToastNotification = ({ id, message, type, onClose }) => {
  const icon = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaExclamationTriangle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  }[type || 'info'];

  const borderColor = {
    success: 'border-green-500',
    error: 'border-red-500',
    info: 'border-blue-500',
  }[type || 'info'];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="pointer-events-auto flex items-center gap-3 p-4 rounded-lg shadow-lg bg-dark-surface border-l-4 w-full max-w-sm"
      style={{ borderColor: borderColor.split('-')[1] }} // Usar style para colores dinámicos
    >
      {icon}
      <p className="flex-grow text-sm text-dark-text">{message}</p>
      <button onClick={() => onClose(id)} className="text-dark-text-muted hover:text-white transition-colors">
        <FaTimes size={14} />
      </button>
    </motion.div>
  );
};

// Proveedor Global del Contexto (ToastProvider)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now(); // Un ID simple es suficiente aquí
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  
  const value = useMemo(() => ({
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    info: (message) => addToast(message, 'info'),
  }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastNotification
              key={toast.id}
              {...toast}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}