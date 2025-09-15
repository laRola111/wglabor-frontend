// RUTA: src/app/(admin)/dashboard/leads/[id]/LeadDetailClient.js (VERSIÓN FINAL CON DEPURACIÓN)
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { FaArrowLeft, FaCommentDots, FaEnvelope, FaPhone } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import LeadStatusBadge from '@/components/ui/LeadStatusBadge';
import { useToast } from '@/hooks/useToast';
import { updateLeadAction, convertLeadToCompanyAction } from '@/actions/leads';

export default function LeadDetailClient({ lead }) {
  const router = useRouter();
  const toast = useToast();
  const [isSaving, startSaveTransition] = useTransition();
  const [isConverting, startConvertTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { new_note: '', status: lead.status },
  });

  const leadDate = new Date(lead.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

  const onSaveSubmit = (data) => {
    startSaveTransition(async () => {
      const result = await updateLeadAction(lead.id, data.status, data.new_note);
      if (result.success) {
        toast.success(result.message);
        reset({ new_note: '', status: data.status });
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleConvertToCompany = () => {
    // --- PUNTO DE CONTROL (DEPURACIÓN) ---
    // Este mensaje debe aparecer en la consola de tu NAVEGADOR (Chrome, Firefox, etc.)
    console.log(`[CLIENT] Botón 'Convertir' presionado para el lead ID: ${lead.id}`);
    
    if (lead.status === 'converted') {
        toast.info('This lead has already been converted.');
        return;
    }
    
    startConvertTransition(async () => {
      const result = await convertLeadToCompanyAction(lead.id);
      if (result.success) {
        toast.success(result.message);
        router.push(`/dashboard/companies/${result.newCompanyId}/edit`);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push('/dashboard/leads')} className="bg-dark-surface hover:bg-dark-border !text-dark-text-muted !p-2">
          <FaArrowLeft className="mr-2" /> Back to Leads
        </Button>
        <Button 
          onClick={handleConvertToCompany}
          disabled={isConverting || lead.status === 'converted'}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500"
        >
          {isConverting ? 'Converting...' : 'Convert to Company'}
        </Button>
      </div>

       {/* El resto del JSX no cambia, es idéntico al anterior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-dark-text">{lead.contact_name}</h1>
                <p className="text-lg text-dark-text-muted mt-1">{lead.company_name || 'No company specified'}</p>
              </div>
              <LeadStatusBadge status={lead.status} />
            </div>
            <div className="border-t border-dark-border mt-4 pt-4 space-y-3 text-dark-text-muted">
              <p><FaEnvelope className="inline mr-3" /> {lead.email || 'No email provided'}</p>
              <p><FaPhone className="inline mr-3" /> {lead.phone || 'No phone provided'}</p>
            </div>
          </div>
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-semibold text-dark-text mb-4 flex items-center"><FaCommentDots className="mr-3 text-accent-primary" /> Original Message</h2>
            <p className="text-dark-text-muted whitespace-pre-wrap">{lead.message}</p>
            <p className="text-xs text-right text-dark-text-muted mt-4">Received on {leadDate}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-surface p-6 rounded-lg border border-dark-border sticky top-24">
            <h2 className="text-xl font-semibold text-dark-text mb-4">Actions & Notes</h2>
            <form onSubmit={handleSubmit(onSaveSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="status">Set Status</Label>
                <select id="status" {...register('status')} className="w-full bg-dark-background text-dark-text mt-1 px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <Label htmlFor="new_note">Add a Note</Label>
                <textarea id="new_note" {...register('new_note')} rows={4} placeholder="Log a call, meeting, or follow-up..." className="w-full bg-dark-background text-dark-text mt-1 px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
              </div>
              <Button type="submit" disabled={isSaving} className="w-full">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
            
            <div className="border-t border-dark-border mt-6 pt-6">
              <h3 className="font-semibold text-dark-text mb-4">History</h3>
              <div className="space-y-4">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.slice().reverse().map((note, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-dark-text-muted">{note.note}</p>
                      <p className="text-xs text-dark-text-muted/70 mt-1">{note.author} - {new Date(note.date).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-dark-text-muted">No notes yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}