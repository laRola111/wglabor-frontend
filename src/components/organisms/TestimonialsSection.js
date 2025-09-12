// RUTA: src/components/organisms/TestimonialsSection.js (NUEVO ARCHIVO)
'use client';

import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TestimonialCard = ({ author, text }) => (
  <div className="bg-dark-surface p-8 rounded-lg border border-dark-border h-full flex flex-col">
    <FaQuoteLeft className="text-accent-primary text-2xl mb-4" />
    <p className="text-dark-text-muted flex-grow mb-6">&quot;{text}&quot;</p>
    <div className="flex items-center justify-between mt-auto">
      <p className="font-bold text-dark-text">{author}</p>
      <div className="flex text-accent-primary">
        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
      </div>
    </div>
  </div>
);

export default function TestimonialsSection({ dict }) {
  const testimonials = [
    { text: dict.testimonial1, author: dict.testimonial1Author },
    { text: dict.testimonial2, author: dict.testimonial2Author },
    { text: dict.testimonial3, author: dict.testimonial3Author }
  ];

  return (
    <section className="py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold text-center text-dark-text mb-4">{dict.testimonialsTitle}</h2>
          <div className="w-24 h-1 bg-accent-primary mx-auto mb-12"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}