// RUTA: src/components/ui/VisualBlock.js
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FaFileAlt, FaUserTie, FaHandshake, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const iconMap = {
  FaFileAlt: FaFileAlt,
  FaUserTie: FaUserTie,
  FaHandshake: FaHandshake,
};

export default function VisualBlock({ title, description, iconName, extendedContent, imageUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.4 }}
      className="relative p-8 md:p-12 rounded-3xl shadow-xl border-2 border-dark-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-background rounded-3xl z-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={36} />}
          <h3 className="text-2xl md:text-3xl font-extrabold text-dark-text leading-tight">{title}</h3>
        </div>
        <p className="text-md text-dark-text-muted mb-4">{description}</p>

        {extendedContent && (
          <>
            <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.4 }}
      className="relative p-8 md:p-12 rounded-3xl shadow-xl border-2 border-dark-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
      {...props} // Pasamos el resto de las props, ya sin las personalizadas.
    >
              {imageUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 mt-4">
                  <Image 
                    src={imageUrl} 
                    alt={title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="mt-4 pt-4 text-dark-text-muted text-sm leading-relaxed">
                {extendedContent}
              </div>
            </motion.div>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="mt-4 flex items-center justify-center text-accent-primary font-semibold hover:underline transition-colors focus:outline-none"
            >
              {isOpen ? (
                <>
                  <FaChevronUp className="mr-2" /> Menos
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-2" /> Leer más
                </>
              )}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}