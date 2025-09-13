// RUTA: src/components/organisms/JobDetailClient.js
'use client';

// Importaciones (las mismas que antes, pero agregando useState y useEffect si no estuvieran)
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// ... el resto de tus importaciones ...
import { useToast } from '@/hooks/useToast';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaBriefcase, FaShareAlt, FaWhatsapp, FaLink, FaTimes } from 'react-icons/fa';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { applyToAction } from '@/actions/apply';


// --- SUB-COMPONENTE: MODAL DE APLICACIÓN (SIN CAMBIOS) ---
const ApplicationModal = ({ job, lang, onClose }) => {
  const toast = useToast();
  
  const initialState = { success: false, message: null };
  const [state, formAction] = useActionState(applyToAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(lang === 'es' ? '¡Aplicación enviada con éxito!' : 'Application sent successfully!');
        onClose();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, toast, onClose, lang]);
  
  const SubmitButton = ({ text }) => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full !py-3 mt-6" disabled={pending}>
        {pending ? (lang === 'es' ? 'Enviando...' : 'Submitting...') : text}
      </Button>
    );
  };
  
  const dict = {
    es: { title: `Aplicar a ${job.title}`, name: 'Nombre Completo', email: 'Correo Electrónico', phone: 'Teléfono', resume: 'Subir CV (PDF)', submit: 'Enviar Aplicación' },
    en: { title: `Apply for ${job.title}`, name: 'Full Name', email: 'Email Address', phone: 'Phone Number', resume: 'Upload Resume (PDF)', submit: 'Submit Application' }
  };
  const d = dict[lang] || dict['es'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="bg-dark-surface rounded-lg border border-dark-border w-full max-w-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-dark-text-muted hover:text-white"><FaTimes size={20} /></button>
        <h2 className="text-2xl font-bold mb-6 text-dark-text">{d.title}</h2>
        
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="jobId" value={job.id} />
          <div>
            <Label htmlFor="name">{d.name}</Label>
            <Input type="text" name="name" id="name" required className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="email">{d.email}</Label>
            <Input type="email" name="email" id="email" required className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="phone">{d.phone}</Label>
            <Input type="tel" name="phone" id="phone" required className="mt-1 w-full" />
          </div>
          <div>
            <Label htmlFor="resume">{d.resume}</Label>
            <Input type="file" name="resume" id="resume" accept=".pdf" required className="mt-1 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent-primary/10 file:text-accent-primary hover:file:bg-accent-primary/20"/>
          </div>
          <SubmitButton text={d.submit} />
        </form>
      </motion.div>
    </motion.div>
  );
};


// --- COMPONENTE PRINCIPAL (CON CORRECCIONES) ---
export default function JobDetailClient({ job, lang }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  
  // SOLUCIÓN: Usar un estado para saber si el componente ya se montó en el cliente
  const [isMounted, setIsMounted] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const companyName = job.companies?.name || 'Empresa Confidencial';
  const logoSrc = job.companies?.logo_url || '/icon.png';

  // SOLUCIÓN: Este efecto se ejecuta solo una vez cuando el componente se monta
  useEffect(() => {
    // Marcamos que el componente está montado
    setIsMounted(true);
    // Y ahora sí, de forma segura, accedemos a window
    setShareUrl(window.location.href);
  }, []); // El array de dependencias vacío asegura que solo se ejecute una vez

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${job.title} - ${companyName}\n${shareUrl}`)}`;

  const formatSalary = (min, max) => {
    if (!min || !max) return (lang === 'es' ? 'No especificado' : 'Not specified');
    return `$${Math.round(min / 1000)}K - $${Math.round(max / 1000)}K Anual`;
  };

  const handleCopyLink = () => {
    // No necesitamos la comprobación 'if (shareUrl)' porque el botón estará deshabilitado
    navigator.clipboard.writeText(shareUrl);
    toast.info(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
  };

  return (
    <>
      <motion.div 
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        {/* ... El resto del JSX superior no cambia ... */}
         <div className="bg-dark-surface p-8 rounded-lg border border-dark-border mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Image 
              src={logoSrc} alt={`${companyName} logo`} width={80} height={80}
              className="rounded-md self-start flex-shrink-0 bg-white p-1"
            />
            <div className="flex-grow">
              <h1 className="text-3xl lg:text-4xl font-bold text-dark-text">{job.title}</h1>
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-lg text-dark-text-muted">
                <span>{companyName}</span>
                <span className="flex items-center"><FaMapMarkerAlt className="mr-2" />{job.location}</span>
              </div>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 self-start">
              <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto px-8 py-3 text-lg shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300">
                {lang === 'es' ? 'Aplicar Ahora' : 'Apply Now'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 bg-dark-surface p-8 rounded-lg border border-dark-border">
            <h2 className="text-2xl font-bold text-dark-text mb-4">
              {lang === 'es' ? 'Descripción del Puesto' : 'Job Description'}
            </h2>
            <article className="prose prose-invert text-dark-text-muted max-w-none prose-p:text-dark-text-muted prose-ul:text-dark-text-muted prose-ol:text-dark-text-muted">
              {job.description.split('\n').map((paragraph, index) => (
                paragraph.trim() !== '' && <p key={index}>{paragraph}</p>
              ))}
            </article>
          </main>
          <aside className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-dark-surface rounded-lg border border-dark-border">
              <h3 className="text-xl font-bold text-dark-text mb-6">
                {lang === 'es' ? 'Resumen del Empleo' : 'Job Summary'}
              </h3>
              <dl className="space-y-6">
                <div className="flex items-start"><FaDollarSign className="mr-3 mt-1 text-accent-primary flex-shrink-0" /><div className="flex-grow"><dt className="text-sm font-medium text-dark-text-muted">{lang === 'es' ? 'Rango Salarial' : 'Salary Range'}</dt><dd className="mt-1 text-md font-semibold text-dark-text">{formatSalary(job.salary_range_min, job.salary_range_max)}</dd></div></div>
                <div className="flex items-start"><FaBriefcase className="mr-3 mt-1 text-accent-primary flex-shrink-0" /><div className="flex-grow"><dt className="text-sm font-medium text-dark-text-muted">{lang === 'es' ? 'Categoría' : 'Category'}</dt><dd className="mt-1 text-md font-semibold text-dark-text">{job.job_category || (lang === 'es' ? "No especificada" : "Not specified")}</dd></div></div>
                <div className="flex items-start"><FaClock className="mr-3 mt-1 text-accent-primary flex-shrink-0" /><div className="flex-grow"><dt className="text-sm font-medium text-dark-text-muted">{lang === 'es' ? 'Tipo de Empleo' : 'Job Type'}</dt><dd className="mt-1 text-md font-semibold text-dark-text">{job.employment_type}</dd></div></div>
              </dl>
              <div className="border-t border-dark-border mt-6 pt-6">
                 <h3 className="text-sm font-medium text-dark-text-muted mb-3 flex items-center">
                   <FaShareAlt className="mr-2 text-accent-primary" />
                   {lang === 'es' ? 'Compartir esta oferta' : 'Share this job'}
                 </h3>
                 <div className="flex space-x-2">
                    {/* SOLUCIÓN: Deshabilitar basado en `!isMounted` para asegurar consistencia */}
                    <button onClick={handleCopyLink} disabled={!isMounted} className="flex-1 bg-dark-background hover:bg-dark-border text-dark-text-muted text-sm p-2 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      <FaLink /> {lang === 'es' ? 'Copiar' : 'Copy'}
                    </button>
                    <a href={isMounted ? whatsappShareUrl : undefined} target="_blank" rel="noopener noreferrer" 
                       className={`flex-1 bg-dark-background hover:bg-dark-border text-dark-text-muted text-sm p-2 rounded-md transition-colors flex items-center justify-center gap-2 ${!isMounted ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                      <FaWhatsapp /> WhatsApp
                    </a>
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && <ApplicationModal job={job} lang={lang} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}