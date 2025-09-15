// RUTA: src/app/(admin)/dashboard/settings/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { getSiteSettings, getLegalDocumentForAdmin } from '@/lib/supabase/queries';
import { FaGlobe, FaFileContract } from 'react-icons/fa';
import LegalDocumentForm from '@/components/organisms/LegalDocumentForm';
// Crearemos este nuevo formulario a continuación
import CompanyInfoForm from '@/components/organisms/CompanyInfoForm'; 

export default async function SettingsPage() {
  // Obtenemos todos los datos necesarios en paralelo
  const [siteSettings, termsDoc, privacyDoc] = await Promise.all([
    getSiteSettings(),
    getLegalDocumentForAdmin('terms-of-service'),
    getLegalDocumentForAdmin('privacy-policy')
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Site Settings</h1>
      <div className="space-y-12">

        {/* Tarjeta de Información de Contacto */}
        <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center"><FaGlobe className="mr-3 text-accent-primary"/> Company Information</h2>
          {siteSettings && <CompanyInfoForm settings={siteSettings} />}
        </div>

        {/* Tarjeta de Términos de Servicio */}
        <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center"><FaFileContract className="mr-3 text-accent-primary"/> Terms of Service</h2>
          {termsDoc && <LegalDocumentForm document={termsDoc} />}
        </div>
        
        {/* Tarjeta de Política de Privacidad */}
        <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center"><FaFileContract className="mr-3 text-accent-primary"/> Privacy Policy</h2>
          {privacyDoc && <LegalDocumentForm document={privacyDoc} />}
        </div>
        
      </div>
    </div>
  );
}