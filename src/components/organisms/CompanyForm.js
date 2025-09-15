// RUTA: src/components/organisms/CompanyForm.js (NUEVO ARCHIVO)
'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { saveCompanyAction } from '@/actions/companies';

export default function CompanyForm({ initialData = null }) {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      companyId: initialData?.id || '',
      name: initialData?.name || '',
      contact_email: initialData?.contact_email || '',
      contact_phone: initialData?.contact_phone || '',
      website: initialData?.website || '',
    }
  });

  const onSubmit = async (data) => {
    setServerError(null);
    const result = await saveCompanyAction(data);
    if (result?.success === false) {
      setServerError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('companyId')} />

      <div className="p-6 md:p-8 bg-dark-surface rounded-lg border border-dark-border grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" {...register('name', { required: 'Company name is required' })} />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input id="website" type="url" {...register('website')} placeholder="https://example.com" />
        </div>
        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input id="contact_email" type="email" {...register('contact_email')} />
        </div>
        <div>
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input id="contact_phone" type="tel" {...register('contact_phone')} />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" onClick={() => router.push('/dashboard/companies')} className="bg-dark-surface hover:bg-dark-border !text-dark-text-muted">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (initialData ? 'Save Changes' : 'Create Company')}
        </Button>
      </div>
      {serverError && (
        <p className="text-red-400 text-center mt-4">{serverError}</p>
      )}
    </form>
  );
}