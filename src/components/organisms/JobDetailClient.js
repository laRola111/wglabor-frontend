// src/components/organisms/JobDetailClient.js
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaBriefcase, FaShareAlt } from 'react-icons/fa';

// Helper para formatear el salario
const formatSalary = (min, max) => {
  if (!min || !max) return 'No especificado';
  return `$${Math.round(min / 1000)}K - $${Math.round(max / 1000)}K`;
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div>
    <dt className="flex items-center text-sm font-medium text-dark-text-muted">
      <Icon className="mr-2 text-accent-primary" />
      {label}
    </dt>
    <dd className="mt-1 text-md font-semibold text-dark-text">{value}</dd>
  </div>
);

export default function JobDetailClient({ job, lang }) {
  const companyName = job.companies?.name || 'Empresa Confidencial';
  const logoSrc = job.companies?.logo_url || '/icon.png';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Encabezado del Trabajo */}
      <motion.div variants={itemVariants} className="bg-dark-surface p-8 rounded-lg border border-dark-border mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Image 
            src={logoSrc} 
            alt={`${companyName} logo`}
            width={80} 
            height={80}
            className="rounded-md self-start flex-shrink-0"
          />
          <div className="flex-grow">
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-text">{job.title}</h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-lg text-dark-text-muted">
              <span>{companyName}</span>
              <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{job.location}</span>
            </div>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0 self-start">
            <Button className="w-full md:w-auto px-8 py-3 text-lg shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300">
              {lang === 'es' ? 'Aplicar Ahora' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal y Barra Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Principal: Descripción */}
        <motion.main variants={itemVariants} className="lg:col-span-2 bg-dark-surface p-8 rounded-lg border border-dark-border">
          <h2 className="text-2xl font-bold text-dark-text mb-4">
            {lang === 'es' ? 'Descripción del Puesto' : 'Job Description'}
          </h2>
          <article className="prose prose-invert text-dark-text-muted max-w-none prose-p:text-dark-text-muted prose-ul:text-dark-text-muted prose-ol:text-dark-text-muted">
            <p className="whitespace-pre-wrap">{job.description}</p>
          </article>
        </motion.main>

        {/* Barra Lateral: Resumen */}
        <motion.aside variants={itemVariants} className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-dark-surface rounded-lg border border-dark-border">
            <h3 className="text-xl font-bold text-dark-text mb-6">
              {lang === 'es' ? 'Resumen del Empleo' : 'Job Summary'}
            </h3>
            <dl className="space-y-6">
              <DetailItem 
                icon={FaDollarSign} 
                label={lang === 'es' ? 'Rango Salarial' : 'Salary Range'} 
                value={formatSalary(job.salary_range_min, job.salary_range_max)} 
              />
              <DetailItem 
                icon={FaBriefcase} 
                label={lang === 'es' ? 'Categoría' : 'Category'} 
                value={job.job_category || "No especificada"}
              />
              <DetailItem 
                icon={FaClock} 
                label={lang === 'es' ? 'Tipo de Empleo' : 'Job Type'} 
                value={job.employment_type} 
              />
            </dl>
            <div className="border-t border-dark-border mt-6 pt-6">
               <h3 className="text-sm font-medium text-dark-text-muted mb-3 flex items-center">
                 <FaShareAlt className="mr-2 text-accent-primary" />
                 {lang === 'es' ? 'Compartir' : 'Share'}
               </h3>
               <div className="flex space-x-2">
                  {/* Aquí irían los botones para compartir en redes */}
                  <p className="text-xs text-dark-text-muted">Próximamente...</p>
               </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}