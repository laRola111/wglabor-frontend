// src/components/organisms/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Añadimos TikTok
import logo from "../../../public/WGLABOR-logo-hzt-1.png";
import { getSiteSettings } from '@/lib/supabase/queries'; // 1. Importamos la nueva función

// ... (diccionarios de texto sin cambios)
const dictionaries = {
  es: {
    description: "Conectando talento excepcional con compañías líderes en el mercado.",
    sitemap: "Mapa del Sitio",
    legal: "Legal",
    contact: "Contacto",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    follow: "Síguenos",
    copyright: `© ${new Date().getFullYear()} WGLABOR LLC. Todos los derechos reservados.`,
    navLinks: [
      { name: 'Buscar Empléos', href: '/es/jobs' },
      { name: 'Para Empresas', href: '/es/companies' },
      { name: 'Tips', href: '/es/resources' },
      { name: 'Contacto', href: '/es/contact' },
    ],
  },
  en: {
    description: "Connecting exceptional talent with leading companies in the market.",
    sitemap: "Sitemap",
    legal: "Legal",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    follow: "Follow Us",
    copyright: `© ${new Date().getFullYear()} WGLABOR LLC. All rights reserved.`,
    navLinks: [
      { name: 'Find Jobs', href: '/en/jobs' },
      { name: 'For Companies', href: '/en/companies' },
      { name: 'Tips', href: '/en/resources' },
      { name: 'Contact', href: '/en/contact' },
    ],
  },
};


const SocialLink = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-dark-text-muted hover:text-accent-primary transition-colors">
    <Icon size={24} />
  </a>
);

export default async function Footer({ lang }) {
  const dict = dictionaries[lang] || dictionaries['es'];
  const siteSettings = await getSiteSettings(); // 2. Llamamos a la nueva función

  return (
    <footer className="bg-dark-background border-t border-dark-surface text-dark-text-muted">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-4">
            <Link href={`/${lang}`}>
              <Image src={logo} alt="WGLABOR LLC Logo" width={180} height={40} className="opacity-80"/>
            </Link>
            <p className="text-sm">{dict.description}</p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{dict.sitemap}</h3>
            <ul className="space-y-2 text-sm">
              {dict.navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Columna 3: Legal y Contacto (actualizada con nuevos datos) */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{dict.legal}</h3>
             <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/privacy-policy`} className="hover:text-accent-primary transition-colors">{dict.privacy}</Link></li>
              <li><Link href={`/${lang}/terms-of-service`} className="hover:text-accent-primary transition-colors">{dict.terms}</Link></li>
            </ul>
            
            {/* 3. Mostramos la info de contacto si existe, usando la nueva estructura */}
            {siteSettings && (
              <>
                <h3 className="font-semibold text-dark-text mb-4 mt-6">{dict.contact}</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href={`mailto:${siteSettings.email}`} className="hover:text-accent-primary transition-colors">{siteSettings.email}</a></li>
                  <li><a href={`tel:${siteSettings.phone}`} className="hover:text-accent-primary transition-colors">{siteSettings.phone}</a></li>
                </ul>
              </>
            )}
          </div>
          
          {/* Columna 4: Social Media (actualizada con la nueva estructura anidada) */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{dict.follow}</h3>
            {/* 4. Verificamos que 'siteSettings' y 'social_media' existan */}
            {siteSettings?.social_media && (
              <div className="flex space-x-4">
                {siteSettings.social_media.facebook && <SocialLink href={siteSettings.social_media.facebook} icon={FaFacebook} />}
                {siteSettings.social_media.instagram && <SocialLink href={siteSettings.social_media.instagram} icon={FaInstagram} />}
                {siteSettings.social_media.tiktok && <SocialLink href={siteSettings.social_media.tiktok} icon={FaTiktok} />}
              </div>
            )}
          </div>
        </div>
      </div>
       <div className="border-t border-dark-surface py-4">
        <p className="text-center text-xs">{dict.copyright}</p>
      </div>
    </footer>
  );
}