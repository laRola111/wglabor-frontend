// src/app/(admin)/dashboard/page.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// 1. Importamos nuestra nueva función
import { getUserProfile } from '@/lib/supabase/queries';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2. Obtenemos el perfil del usuario usando su ID
  const profile = await getUserProfile(user.id);

  // 3. Usamos el nombre del perfil, o el email como alternativa si no se encuentra
  const welcomeName = profile?.full_name || user.email;

  return (
    <div>
      {/* 4. Mostramos el nombre en el saludo */}
      <h1 className="text-3xl font-bold text-dark-text mb-4">Welcome, {welcomeName}</h1>
      <p className="flex items-center text-dark-text-muted">
        <span>You are signed in as:</span>
        <span className="font-mono text-accent-primary mx-2">{user.email}</span>
        
        {/* 5. Mostramos el rol del usuario si existe en el perfil */}
        {profile?.role && (
          <span className="bg-accent-primary/20 text-accent-primary text-xs font-bold uppercase px-2 py-1 rounded-full">
            {profile.role.replace('_', ' ')}
          </span>
        )}
      </p>
      <div className="mt-8 bg-dark-background p-6 rounded-lg border border-dark-border">
        <h2 className="text-xl font-semibold text-dark-text">Next Steps</h2>
        <p className="mt-2 text-dark-text-muted">
          From here, we will build the table to manage job listings (Create, Edit, Delete).
        </p>
      </div>
    </div>
  );
}