// src/app/(public)/[lang]/layout.js
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

// Cambiamos la firma para recibir 'params' y lo "esperamos"
export default async function LangLayout({ children, params }) {
  // 1. "Esperamos" los parámetros para obtener el valor de 'lang'
  const { lang } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-dark-background">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* 2. Usamos la variable 'lang' que ya tiene el valor resuelto */}
      <Footer lang={lang} />
    </div>
  );
}