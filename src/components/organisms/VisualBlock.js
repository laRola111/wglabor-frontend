// RUTA: src/components/organisms/VisualBlock.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FaFileAlt, FaUserTie, FaHandshake, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mapeo de íconos para poder pasarlos como string desde el Server Component
const iconMap = {
  FaFileAlt: FaFileAlt,
  FaUserTie: FaUserTie,
  FaHandshake: FaHandshake,
};

export default function VisualBlock({ title, description, iconName, extendedContent, imageUrl, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <motion.div
      layout // Anima los cambios de tamaño
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative p-8 rounded-2xl shadow-xl border-2 border-dark-border bg-gradient-to-br from-dark-surface to-dark-background transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/50 overflow-hidden flex flex-col"
      {...props}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* --- CONTENIDO SIEMPRE VISIBLE --- */}
        <div className="flex items-center space-x-4 mb-4">
          {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={32} />}
          <h3 className="text-2xl font-extrabold text-dark-text leading-tight">{title}</h3>
        </div>
        <p className="text-md text-dark-text-muted">{description}</p>
        
        {/* --- CONTENIDO EXPANDIBLE --- */}
        <div className="flex flex-col flex-grow justify-end mt-4">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto', marginTop: '1rem' },
                  collapsed: { opacity: 0, height: 0, marginTop: '0rem' }
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                {imageUrl && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                    <Image 
                      src={imageUrl} 
                      alt={title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="prose prose-invert prose-sm text-dark-text-muted prose-p:text-dark-text-muted prose-ul:text-dark-text-muted prose-ol:text-dark-text-muted">
                  {extendedContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="mt-6 flex items-center justify-center text-accent-primary font-semibold hover:underline transition-colors focus:outline-none w-full text-sm"
            aria-expanded={isOpen}
          >
            {isOpen ? 'Leer menos' : 'Leer más'}
            {isOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}