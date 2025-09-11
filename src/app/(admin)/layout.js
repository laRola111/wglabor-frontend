// RUTA: src/app/(admin)/layout.js
'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/WGLABOR-logo-hzt-1.png';
// 1. Importamos el nuevo componente de Sidebar
import DashboardSidebar from '@/components/organisms/DashboardSidebar';

export default function AdminLayout({ children }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col h-screen bg-dark-surface text-dark-text">
      {/* El header se mantiene igual */}
      <header className="bg-dark-background border-b border-dark-border py-3 px-6 flex-shrink-0">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <Link href="/dashboard">
             <Image src={logo} alt="WGLABOR LLC Logo" width={150} height={30} priority/>
          </Link>
          <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-sm !py-2">
            Sign Out
          </Button>
        </div>
      </header>
      
      {/* 2. Creamos el contenedor principal con Flexbox */}
      <div className="flex flex-grow overflow-hidden">
        {/* 3. Añadimos la Sidebar a la izquierda */}
        <DashboardSidebar />
        
        {/* 4. El contenido principal ahora ocupa el espacio restante y tiene scroll propio */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
           {children}
          </div>
        </main>
      </div>
    </div>
  );
}