// RUTA: src/app/(admin)/layout.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/WGLABOR-logo-hzt-1.png';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';
import { FaBars } from 'react-icons/fa';
import { ToastProvider } from '@/hooks/useToast'; // 1. Importar el ToastProvider

export default function AdminLayout({ children }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    // 2. Envolvemos toda la estructura con el ToastProvider
    <ToastProvider>
      <div className="flex h-screen bg-dark-surface text-dark-text overflow-hidden">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="bg-dark-background border-b border-dark-border py-3 px-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden text-dark-text-muted hover:text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle menu"
              >
                <FaBars size={20} />
              </button>
              
              <div className="hidden md:block">
                <Link href="/dashboard">
                  <Image src={logo} alt="WGLABOR LLC Logo" width={150} height={30} priority/>
                </Link>
              </div>
              
              <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-sm !py-2">
                Sign Out
              </Button>
            </div>
          </header>
          
          <main className="flex-grow p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
             {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}