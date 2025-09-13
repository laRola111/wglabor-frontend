// RUTA: src/app/(public)/[lang]/layout.js (ACTUALIZADO)

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import { ToastProvider } from '@/hooks/useToast';
import HashScroller from '@/components/ui/HashScroller'; // 1. IMPORTAR EL NUEVO COMPONENTE

export default async function LangLayout({ children, params }) {
  const { lang } = params;

  return (
    <div className="flex flex-col min-h-screen bg-dark-background">
      <ToastProvider>
        <HashScroller /> {/* 2. AÑADIR EL COMPONENTE AQUÍ */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer lang={lang} />
      </ToastProvider>
    </div>
  );
}