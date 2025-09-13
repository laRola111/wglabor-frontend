// RUTA: src/components/ui/CtaBlock.js
// CREAR NUEVO ARCHIVO

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CtaBlock({ title, description, buttonText, buttonHref }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-dark-surface p-12 md:p-20 rounded-3xl text-center border-2 border-accent-primary/20 shadow-2xl shadow-black/30"
    >
      <h3 className="text-4xl md:text-5xl font-extrabold text-dark-text mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-lg text-dark-text-muted mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <Link href={buttonHref}>
        <Button className="!py-4 !px-12 text-lg md:text-xl">
          {buttonText}
        </Button>
      </Link>
    </motion.div>
  );
}