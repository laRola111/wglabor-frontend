// RUTA: src/components/organisms/LegalDocumentForm.js (NUEVO ARCHIVO)
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/useToast';
import { updateLegalDocumentAction } from '@/actions/settings';
import LanguageTabs from '@/components/ui/LanguageTabs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useEffect } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Changes'}</Button>;
}

export default function LegalDocumentForm({ document }) {
    const toast = useToast();
    const [state, formAction] = useActionState(updateLegalDocumentAction, null);

    useEffect(() => {
        if (state?.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={document.id} />
            <LanguageTabs>
                <div lang="en" className="space-y-4">
                    <div>
                        <Label htmlFor={`title_en_${document.id}`}>Title (English)</Label>
                        <Input id={`title_en_${document.id}`} name="title_en" defaultValue={document.title?.en} />
                    </div>
                    <div>
                        <Label htmlFor={`content_en_${document.id}`}>Content (English)</Label>
                        <textarea id={`content_en_${document.id}`} name="content_en" rows={10} defaultValue={document.content?.en} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
                    </div>
                </div>
                <div lang="es" className="space-y-4">
                    <div>
                        <Label htmlFor={`title_es_${document.id}`}>Título (Español)</Label>
                        <Input id={`title_es_${document.id}`} name="title_es" defaultValue={document.title?.es} />
                    </div>
                    <div>
                        <Label htmlFor={`content_es_${document.id}`}>Contenido (Español)</Label>
                        <textarea id={`content_es_${document.id}`} name="content_es" rows={10} defaultValue={document.content?.es} className="w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
                    </div>
                </div>
            </LanguageTabs>
            <div className="text-right">
                <SubmitButton />
            </div>
        </form>
    );
}