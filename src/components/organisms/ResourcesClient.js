// RUTA: src/components/organisms/ResourcesClient.js
'use client'; 

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUserTie, FaHandshake, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const iconMap = {
  FaFileAlt,
  FaUserTie,
  FaHandshake,
};

// --- Sub-componente: Tarjeta de Vista Previa ---
const TipCard = ({ tip, onSelect }) => {
  const IconComponent = iconMap[tip.iconName];
  return (
    <motion.div
      layoutId={`card-container-${tip.id}`}
      onClick={() => onSelect(tip.id)}
      className="relative p-8 rounded-2xl shadow-xl border-2 border-dark-border bg-dark-surface cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/50 overflow-hidden flex flex-col"
    >
      <div className="flex items-center space-x-4 mb-4">
        {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={32} />}
        <h3 className="text-2xl font-extrabold text-dark-text leading-tight">{tip.title}</h3>
      </div>
      <p className="text-md text-dark-text-muted">{tip.description}</p>
      <div className="flex-grow" />
      <p className="mt-6 text-sm text-accent-primary font-semibold flex items-center justify-center">
        {tip.readMore}
      </p>
    </motion.div>
  );
};

// --- Sub-componente: Vista Detallada ---
const ExpandedTipView = ({ tip, onDeselect }) => {
  const IconComponent = iconMap[tip.iconName];
  const { extendedContent } = tip;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div
        layoutId={`card-container-${tip.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-dark-surface rounded-2xl shadow-2xl border-2 border-dark-border p-8 overflow-y-auto"
      >
        <motion.button
          onClick={onDeselect}
          className="absolute top-4 right-4 text-dark-text-muted hover:text-white z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
          <FaTimes size={24} />
        </motion.button>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          <div className="flex items-center space-x-4 mb-6">
            {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={32} />}
            <h2 className="text-3xl font-extrabold text-dark-text">{tip.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="prose prose-invert text-dark-text-muted prose-p:my-2 prose-ul:my-2 prose-li:my-1">
              {extendedContent.heading1 && <h4>{extendedContent.heading1}</h4>}
              {extendedContent.points1 && <ul>{extendedContent.points1.map(p => <li key={p}>{p}</li>)}</ul>}
              {extendedContent.heading2 && <h4 className="mt-4">{extendedContent.heading2}</h4>}
              {extendedContent.paragraph1 && <p><em>{extendedContent.paragraph1}</em></p>}
            </div>
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <Image 
                src={tip.imageUrl} 
                alt={tip.title} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- Componente Principal de Cliente ---
export default function ResourcesClient({ dict }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedTip = selectedId ? dict.tips.find(tip => tip.id === selectedId) : null;

  return (
    <>
      <section className="py-24 text-center px-8 bg-dark-surface">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-4xl mx-auto">
          {dict.heroTitle}
        </h1>
        <p className="text-lg text-dark-text-muted max-w-3xl mx-auto">
          {dict.heroSubtitle}
        </p>
      </section>

      <main className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} onSelect={setSelectedId} />
          ))}
        </div>
      </main>
      
      <AnimatePresence>
        {selectedTip && (
          <ExpandedTipView tip={selectedTip} onDeselect={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}