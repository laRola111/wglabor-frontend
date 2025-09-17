// RUTA: src/components/organisms/ContactForm.js (ACTUALIZADO)
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createLeadAction } from '@/actions/contact';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';

const initialState = {
  message: null,
  success: false,
};

function SubmitButton({ dict }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full text-lg py-3 mt-4" disabled={pending}>
      {pending ? dict.sending : dict.sendButton}
    </Button>
  );
}

export default function ContactForm({ dict }) {
  const [state, formAction] = useActionState(createLeadAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">{dict.nameLabel}</Label>
          <Input id="name" name="name" type="text" required className="mt-1 w-full" />
        </div>
        <div>
          <Label htmlFor="company">{dict.companyLabel}</Label>
          <Input id="company" name="company" type="text" className="mt-1 w-full" />
        </div>
      </div>

      {/* --- SECCIÓN DE CONTACTO MEJORADA --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">{dict.emailLabel}</Label>
          {/* Se elimina 'required' para validación condicional en el servidor */}
          <Input id="email" name="email" type="email" className="mt-1 w-full" />
        </div>
        <div>
          <Label htmlFor="phone">{dict.phone}</Label>
          {/* Se añade el nuevo campo de teléfono */}
          <Input id="phone" name="phone" type="tel" className="mt-1 w-full" />
        </div>
      </div>
      <p className="text-xs text-center text-dark-text-muted -mt-4">
        {dict.alert}
      </p>

      <div>
        <Label htmlFor="message">{dict.messageLabel}</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full bg-dark-background text-dark-text px-4 py-3 rounded-lg ring-2 ring-dark-border focus:outline-none focus:ring-2 focus:ring-accent-primary"
        ></textarea>
      </div>
      
      <SubmitButton dict={dict} />
      
      {state.message && (
        <p className={`text-center text-sm mt-4 ${state.success ? 'text-green-400' : 'text-red-400'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}