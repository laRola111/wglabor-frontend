// RUTA: src/components/ui/VisualBlock.js
// CREAR NUEVO ARCHIVO

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VisualBlock({ icon: Icon, title, description, className = '', children, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.4 }}
      className={`relative p-8 md:p-12 rounded-3xl shadow-xl border-2 border-dark-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden ${className}`}
      {...props}
    >
      {/* Fondo de degradado dinámico */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-background rounded-3xl z-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          {Icon && <Icon className="text-accent-primary flex-shrink-0" size={36} />}
          <h3 className="text-2xl md:text-3xl font-extrabold text-dark-text leading-tight">{title}</h3>
        </div>
        <p className="text-md text-dark-text-muted flex-grow">{description}</p>
        
        {children}
      </div>
    </motion.div>
  );
}