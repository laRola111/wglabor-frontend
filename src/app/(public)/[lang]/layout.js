// RUTA: src/app/(public)/[lang]/layout.js (VERIFICAR CONTENIDO)

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import { ToastProvider } from '@/hooks/useToast'; // Importar

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-dark-background">
      <ToastProvider> {/* Envolver el contenido */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer lang={lang} />
      </ToastProvider>
    </div>
  );
}