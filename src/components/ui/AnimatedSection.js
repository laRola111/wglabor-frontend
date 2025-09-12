// RUTA: src/components/ui/AnimatedSection.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 30 }} // Inicia un poco más abajo y transparente
      // AJUSTE: Cambiamos 'whileInView' por 'animate'.
      // Esto asegura que la animación se ejecute siempre que el componente se renderice,
      // independientemente del tipo de navegación.
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}