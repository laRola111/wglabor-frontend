// RUTA: src/components/organisms/Header.js (VERSIÓN FINAL Y CORREGIDA)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import logo from "../../../public/WGLABOR-logo-hzt-1.png";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);

  // Lógica de idioma y detección de página de inicio más robusta
  const lang = pathname.split('/')[1] || 'es';
  const isHomePage = pathname === `/${lang}`;

  // --- SOLUCIÓN 2: CERRAR MENÚ MÓVIL AL CAMBIAR DE RUTA ---
  // Este efecto se ejecuta cada vez que la URL (pathname) cambia.
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Efecto para la visibilidad del header al hacer scroll (sin cambios)
  useEffect(() => {
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrollingUp = currentYPos < lastYPos;
      setIsVisible(isScrollingUp || currentYPos < 50); 
      setLastYPos(currentYPos);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastYPos]);

  // Efecto para bloquear el scroll del body (sin cambios)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // --- SOLUCIÓN 1: HACER EL ENLACE DE CONTACTO DINÁMICO ---
  const contactHref = isHomePage ? '#contact-form' : `/${lang}/#contact-form`;

  const navLinks = [
    { name: lang === 'es' ? 'Buscar Empleos' : 'Find Jobs', href: `/${lang}/jobs` },
    { name: lang === 'es' ? 'Para Empresas' : 'For Companies', href: `/${lang}/companies` },
    { name: lang === 'es' ? 'Recursos' : 'Resources', href: `/${lang}/resources` },
    { name: lang === 'es' ? 'Contacto' : 'Contact', href: contactHref }, // Se usa la variable dinámica
  ];

  const handleLinkClick = (e, href) => {
    // Esta función ahora se enfoca solo en el scroll suave para anclas
    if (href.startsWith('#')) {
      e.preventDefault();
      // Si ya estamos en la homepage, solo hacemos scroll
      if (isHomePage) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
      } else {
        // Si no estamos en la homepage, dejamos que el Link nos lleve
        // y el scroll se manejará al cargar la página (comportamiento nativo)
        router.push(href);
      }
    }
  };

  return (
    <>
      <header 
        className={`py-4 px-6 sm:px-8 border-b border-dark-surface bg-dark-background sticky top-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <Link href={`/${lang}`} className="flex-shrink-0">
            <Image
              src={logo}
              alt="WGLABOR LLC Logo"
              width={180}
              height={41}
              priority
              className="h-auto w-[160px] sm:w-[180px]"
            />
          </Link>

          <div className="hidden md:flex justify-center flex-grow space-x-8 text-dark-text-muted text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-accent-primary transition-colors duration-300 ${
                  pathname === link.href ? 'text-accent-primary font-semibold' : ''
                }`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             <div className="hidden md:block">
               <LanguageSwitcher />
             </div>
            <button
              className="md:hidden text-dark-text z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Panel de Menú Móvil */}
      <div className={`fixed inset-0 bg-dark-background z-30 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <nav className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-2xl text-dark-text-muted hover:text-accent-primary transition-colors ${
                  pathname === link.href ? 'text-accent-primary font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
           <div className="mt-12">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}