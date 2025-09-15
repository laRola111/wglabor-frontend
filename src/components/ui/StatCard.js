// RUTA: src/components/ui/StatCard.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link'; // 1. Importar Link
import { FaUsers, FaBriefcase, FaFileSignature, FaBuilding } from 'react-icons/fa';

const iconMap = {
  FaUsers,
  FaBriefcase,
  FaFileSignature,
  FaBuilding,
};

// 2. Añadir la prop 'href'
export default function StatCard({ title, value, iconName, colorClass = 'text-accent-primary', href }) {
  const Icon = iconMap[iconName];

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-surface p-6 rounded-lg border border-dark-border flex items-center space-x-4 h-full transition-all duration-300 group-hover:border-accent-primary/50"
    >
      <div className={`p-3 rounded-lg bg-dark-background ${colorClass} transition-colors duration-300 group-hover:bg-accent-primary/10`}>
        {Icon && <Icon size={28} />}
      </div>
      <div>
        <p className="text-sm font-medium text-dark-text-muted">{title}</p>
        <p className="text-3xl font-bold text-dark-text">{value}</p>
      </div>
    </motion.div>
  );

  // 3. Si se proporciona un 'href', envolvemos el contenido en un Link. Si no, solo mostramos el div.
  return (
    <Link href={href} className="group">
      {cardContent}
    </Link>
  );
}