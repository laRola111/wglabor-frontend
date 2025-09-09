// src/components/organisms/Header.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // Iconos para el menú

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import logo from "../../../public/WGLABOR-logo-hzt-1.png";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSpanish = pathname.startsWith('/es');

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Función de limpieza para reestablecer el scroll si el componente se desmonta
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  const navLinks = isSpanish
    ? [
        { name: 'Buscar Empleos', href: '/es/jobs' },
        { name: 'Para Empresas', href: '/es/companies' },
        { name: 'Tips', href: '/es/resources' },
        { name: 'Contacto', href: '/es/contact' },
      ]
    : [
        { name: 'Find Jobs', href: '/en/jobs' },
        { name: 'For Companies', href: '/en/companies' },
        { name: 'Tips', href: '/en/resources' },
        { name: 'Contact', href: '/en/contact' },
      ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="py-4 px-6 sm:px-8 border-b border-dark-surface bg-dark-background sticky top-0 z-40">
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Logo a la izquierda */}
          <Link href={isSpanish ? '/es' : '/en'} className="flex-shrink-0">
            <Image
              src={logo}
              alt="WGLABOR LLC Logo"
              width={160} // Ligeramente más pequeño en móvil
              height={36}
              priority
              className="sm:w-[180px] sm:h-[30px]" // Tamaño original para pantallas más grandes
            />
          </Link>

          {/* Enlaces de navegación para escritorio */}
          <div className="hidden md:flex justify-center flex-grow space-x-8 text-dark-text-muted text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-accent-primary transition-colors duration-300 ${
                  pathname === link.href ? 'text-accent-primary font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contenedor derecho: Language Switcher (escritorio) y Botón de Menú (móvil) */}
          <div className="flex items-center space-x-4">
             <div className="hidden md:block">
               <LanguageSwitcher />
             </div>
            <button
              className="md:hidden text-dark-text z-50" // Se oculta en pantallas medianas y grandes
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
                onClick={handleLinkClick}
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