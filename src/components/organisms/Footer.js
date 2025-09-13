// RUTA: src/components/organisms/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from "../../../public/WGLABOR-logo-hzt-1.png";
import { getSiteSettings } from '@/lib/supabase/queries';

const SocialLink = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-dark-text-muted hover:text-accent-primary transition-colors">
    <Icon size={24} />
  </a>
);

export default async function Footer({ lang }) {
  const siteSettings = await getSiteSettings();
  const footerDict = {
    es: {
      description: "Conectando talento excepcional con compañías líderes en el mercado.",
      sitemap: "Mapa del Sitio",
      legal: "Legal",
      contact: "Contacto",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      follow: "Síguenos",
      copyright: `© ${new Date().getFullYear()} WGLABOR LLC. Todos los derechos reservados.`,
      adminLogin: "Admin Login",
      navLinks: [
        { name: 'Buscar Empleos', href: '/es/jobs' },
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
      adminLogin: "Admin Login",
      navLinks: [
        { name: 'Find Jobs', href: '/en/jobs' },
        { name: 'For Companies', href: '/en/companies' },
        { name: 'Tips', href: '/en/resources' },
        { name: 'Contact', href: '/en/contact' },
      ],
    },
  };

  const d = footerDict[lang] || footerDict['es'];

  return (
    <footer className="bg-dark-background border-t border-dark-surface text-dark-text-muted  z-10">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href={`/${lang}`}>
              <Image 
                src={logo} 
                alt="WGLABOR LLC Logo" 
                width={180} 
                height={40} 
                className="opacity-80"
              />
            </Link>
            <p className="text-sm">{d.description}</p>
          </div>

          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{d.sitemap}</h3>
            <ul className="space-y-2 text-sm">
              {d.navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="hover:text-accent-primary transition-colors">
                  {d.adminLogin}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{d.legal}</h3>
             <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/privacy-policy`} className="hover:text-accent-primary transition-colors">{d.privacy}</Link></li>
              <li><Link href={`/${lang}/terms-of-service`} className="hover:text-accent-primary transition-colors">{d.terms}</Link></li>
            </ul>
            
            {siteSettings && (
              <>
                <h3 className="font-semibold text-dark-text mb-4 mt-6">{d.contact}</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href={`mailto:${siteSettings.email}`} className="hover:text-accent-primary transition-colors">{siteSettings.email}</a></li>
                  <li><a href={`tel:${siteSettings.phone}`} className="hover:text-accent-primary transition-colors">{siteSettings.phone}</a></li>
                </ul>
              </>
            )}
          </div>
          
          <div className="md:mx-auto">
            <h3 className="font-semibold text-dark-text mb-4">{d.follow}</h3>
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
        <p className="text-center text-xs">{d.copyright}</p>
      </div>
    </footer>
  );
}