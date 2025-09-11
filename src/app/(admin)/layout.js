// src/app/(admin)/layout.js
'use client'; // Necesario para la interactividad del botón de logout

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/WGLABOR-logo-hzt-1.png';

export default function AdminLayout({ children }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-surface text-dark-text">
      <header className="bg-dark-background border-b border-dark-border py-3 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/dashboard">
             <Image src={logo} alt="WGLABOR LLC Logo" width={150} height={30}/>
          </Link>
          <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-sm !py-2">
            Sign Out
          </Button>
        </div>
      </header>
      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
         {children}
        </div>
      </main>
    </div>
  );
}