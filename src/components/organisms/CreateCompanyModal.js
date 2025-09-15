// RUTA: src/components/organisms/CreateCompanyModal.js (VERIFICAR O REEMPLAZAR)
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
// Esta importación ahora funcionará correctamente
import { createCompanyAction } from '@/actions/companies';

export default function CreateCompanyModal({ isOpen, onClose, onCompanyCreated }) {
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Llamamos a la acción correcta para el modal
    const result = await createCompanyAction(companyName);

    if (result.success) {
      onCompanyCreated(result.company);
      setCompanyName('');
      onClose();
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

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
            className="bg-dark-surface rounded-lg border border-dark-border w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-dark-text">Create New Company</h3>
              <button onClick={onClose} className="text-dark-text-muted hover:text-white"><FaTimes/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="mt-1 w-full"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              <div className="mt-6 flex justify-end gap-4">
                <Button type="button" onClick={onClose} className="bg-dark-background hover:bg-dark-border !text-dark-text-muted">Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create'}</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}