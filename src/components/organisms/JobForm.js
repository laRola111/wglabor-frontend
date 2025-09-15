// RUTA: src/components/organisms/JobForm.js
'use client';

import { useForm } from 'react-hook-form';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import LanguageTabs from '@/components/ui/LanguageTabs';
import { saveJobAction } from '@/actions/jobs';
import React from 'react';

const jobCategories = ["Construction", "Hospitality", "Logistics", "Transportation", "Services"];
const employmentTypes = ["Full-time", "Temporary", "Part-time", "Contract"];
const initialState = { success: false, message: null };

export default function JobForm({ companies = [], initialData = null }) {
  const router = useRouter();
  const [state, formAction] = useActionState(saveJobAction, initialState);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      company_id: initialData?.company_id || (companies[0]?.id || ''),
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

  return (
    <form action={formAction} onSubmit={handleSubmit(formAction)} className="space-y-6">
      {initialData?.id && <input type="hidden" {...register('jobId')} value={initialData.id} />}

      <div className="p-6 md:p-8 bg-dark-surface rounded-lg border border-dark-border space-y-8">
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
              <select id="company_id" {...register('company_id', { required: 'A company is required' })} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                {companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </div>
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
      {state?.message && !state.success && (
        <p className="text-red-400 text-center mt-4">{state.message}</p>
      )}
    </form>
  );
}