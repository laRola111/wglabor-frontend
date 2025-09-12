// RUTA: src/components/organisms/ContactForm.js (CÓDIGO FINAL Y CORRECTO)
'use client';

// AJUSTE: Separamos las importaciones. useActionState de 'react', useFormStatus de 'react-dom'.
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { createLeadAction } from '@/actions/contact';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton({ dict }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={pending}>
      {pending ? (dict.sending || 'Sending...') : (dict.sendButton || 'Send Message')}
    </Button>
  );
}

export default function ContactForm({ dict }) {
  const [state, formAction] = useActionState(createLeadAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">{dict.nameLabel || 'Full Name'}</Label>
          <Input id="name" name="name" type="text" required className="mt-1 w-full" />
        </div>
        <div>
          <Label htmlFor="company">{dict.companyLabel || 'Company (Optional)'}</Label>
          <Input id="company" name="company" type="text" className="mt-1 w-full" />
        </div>
      </div>
      <div>
        <Label htmlFor="email">{dict.emailLabel || 'Email Address'}</Label>
        <Input id="email" name="email" type="email" required className="mt-1 w-full" />
      </div>
      <div>
        <Label htmlFor="message">{dict.messageLabel || 'Message'}</Label>
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
        <p className={`text-center text-sm ${state.success ? 'text-green-400' : 'text-red-400'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}