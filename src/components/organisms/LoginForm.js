// src/components/organisms/LoginForm.js
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = async (formData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg('Invalid login credentials. Please try again.');
      setIsSubmitting(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 w-full"
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 w-full"
          autoComplete="current-password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full !py-3" disabled={isSubmitting}>
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </Button>

      {errorMsg && <p className="text-center text-red-400">{errorMsg}</p>}
    </form>
  );
}