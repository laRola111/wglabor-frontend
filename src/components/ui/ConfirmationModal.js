// RUTA: src/components/ui/ConfirmationModal.js
'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  variant = 'danger'
}) {
  const variants = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-700',
    },
    primary: {
      icon: 'text-accent-primary',
      button: 'bg-accent-primary hover:bg-accent-hover',
    }
  };
  const selectedVariant = variants[variant] || variants.danger;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-dark-surface rounded-lg border border-dark-border w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-dark-background sm:mx-0 sm:h-10 sm:w-10 ${selectedVariant.icon}`}>
                <FaExclamationTriangle size={20} />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-dark-text">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-dark-text-muted">{children}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button onClick={onConfirm} className={selectedVariant.button}>
                {confirmText}
              </Button>
              <Button onClick={onClose} className="mr-3 bg-dark-background hover:bg-dark-border !text-dark-text-muted">
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}