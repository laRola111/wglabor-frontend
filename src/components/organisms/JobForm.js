// RUTA: src/components/organisms/JobForm.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import LanguageTabs from '@/components/ui/LanguageTabs';
import { saveJobAction } from '@/actions/jobs';
import CreateCompanyModal from './CreateCompanyModal'; // Importar el modal

const jobCategories = ["Construction", "Hospitality", "Logistics", "Transportation", "Services"];
const employmentTypes = ["Full-time", "Temporary", "Part-time", "Contract"];

export default function JobForm({ companies: initialCompanies = [], initialData = null }) {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Guardamos la lista de compañías en un estado para poder actualizarla
  const [companies, setCompanies] = useState(initialCompanies);

  const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm({
    defaultValues: {
      jobId: initialData?.id || '',
      company_id: initialData?.company_id || (initialCompanies[0]?.id || ''),
      // ...el resto de defaultValues se mantiene igual
      status: initialData?.status || 'draft',
      zip_code: initialData?.zip_code || '',
      title_en: initialData?.title?.en || '',
      title_es: initialData?.title?.es || '',
      location: initialData?.location || '',
      job_category: initialData?.job_category || 'Construction',
      employment_type: initialData?.employment_type || 'Full-time',
      salary_range_min: initialData?.salary_range_min || '',
      salary_range_max: initialData?.salary_range_max || '',
      description_en: initialData?.description?.en || '',
      description_es: initialData?.description?.es || '',
    }
  });

  const onSubmit = async (data) => {
    setServerError(null);
    const result = await saveJobAction(data);
    if (result?.success === false) {
      setServerError(result.message);
    }
  };

  // Esta función se llamará cuando el modal cree una nueva compañía
  const handleCompanyCreated = (newCompany) => {
    // 1. Añadimos la nueva compañía a nuestra lista de estado
    setCompanies(currentCompanies => [...currentCompanies, newCompany]);
    // 2. Seleccionamos automáticamente la nueva compañía en el formulario
    setValue('company_id', newCompany.id);
  };

  return (
    <>
      <CreateCompanyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCompanyCreated={handleCompanyCreated}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register('jobId')} />

        <div className="p-6 md:p-8 bg-dark-surface rounded-lg border border-dark-border space-y-8">
          {/* ... (Fieldset de Job Content no cambia) ... */}
          <fieldset>
            <legend className="text-xl font-semibold text-dark-text mb-4">Job Content</legend>
            <LanguageTabs>
                <div lang="en" className="space-y-4">
                  <div>
                    <Label htmlFor="title_en">Title (English)</Label>
                    <Input id="title_en" {...register('title_en', { required: 'English title is required' })} />
                    {errors.title_en && <p className="text-red-400 text-sm mt-1">{errors.title_en.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="description_en">Description (English)</Label>
                    <textarea id="description_en" rows={8} {...register('description_en')} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
                  </div>
                </div>
                <div lang="es" className="space-y-4">
                  <div>
                    <Label htmlFor="title_es">Título (Español)</Label>
                    <Input id="title_es" {...register('title_es', { required: 'Spanish title is required' })} />
                    {errors.title_es && <p className="text-red-400 text-sm mt-1">{errors.title_es.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="description_es">Descripción (Español)</Label>
                    <textarea id="description_es" rows={8} {...register('description_es')} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
                  </div>
                </div>
            </LanguageTabs>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold text-dark-text mb-4 border-t border-dark-border pt-8">Job Properties</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company_id">Company</Label>
                <div className="flex items-center gap-2">
                  <select id="company_id" {...register('company_id', { required: 'A company is required' })} className="flex-grow w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                    {companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
                  </select>
                  <Button type="button" onClick={() => setIsModalOpen(true)} className="!p-3 flex-shrink-0">
                    <FaPlus />
                  </Button>
                </div>
              </div>
              
              {/* ... (El resto de los campos de Job Properties no cambian) ... */}
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" {...register('status')} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...register('location', { required: 'Location is required' })} placeholder="e.g., Austin, TX" />
                  {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
                </div>
                <div>
                  <Label htmlFor="zip_code">Zip Code</Label>
                  <Input id="zip_code" {...register('zip_code')} placeholder="e.g., 78701" />
                </div>
              </div>
              <div>
                <Label htmlFor="job_category">Job Category</Label>
                <select id="job_category" {...register('job_category')} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                  {jobCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <select id="employment_type" {...register('employment_type')} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                  {employmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary_range_min">Salary Min (Annual)</Label>
                  <Input id="salary_range_min" type="number" {...register('salary_range_min')} placeholder="e.g., 50000" />
                </div>
                <div>
                  <Label htmlFor="salary_range_max">Salary Max (Annual)</Label>
                  <Input id="salary_range_max" type="number" {...register('salary_range_max')} placeholder="e.g., 70000" />
                </div>
              </div>

            </div>
          </fieldset>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" onClick={() => router.push('/dashboard/jobs')} className="bg-dark-surface hover:bg-dark-border !text-dark-text-muted">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (initialData ? 'Save Changes' : 'Create Job')}
          </Button>
        </div>
        {serverError && (
          <p className="text-red-400 text-center mt-4">{serverError}</p>
        )}
      </form>
    </>
  );
}