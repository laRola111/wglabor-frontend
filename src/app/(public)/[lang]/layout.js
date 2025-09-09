// src/app/(public)/[lang]/layout.js
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

// Este layout recibe los 'params' de la URL, incluyendo 'lang'
export default function LangLayout({ children, params }) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-background">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* Pasamos el idioma al Footer para que muestre el texto correcto */}
      <Footer lang={params.lang} />
    </div>
  );
}