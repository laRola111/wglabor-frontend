// src/components/organisms/Header.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header({ variant = 'home' }) {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');

  // Enlaces para la barra de navegación de la página de búsqueda
  const navLinks = isSpanish
    ? [
        { name: 'Inicio', href: '/es' },
        { name: 'Empleos', href: '/es/jobs' },
        { name: 'Empresas', href: '/es/companies' },
        { name: 'Recursos', href: '/es/resources' },
        { name: 'Contacto', href: '/es/contact' },
      ]
    : [
        { name: 'Home', href: '/en' },
        { name: 'Jobs', href: '/en/jobs' },
        { name: 'Companies', href: '/en/companies' },
        { name: 'Resources', href: '/en/resources' },
        { name: 'Contact', href: '/en/contact' },
      ];

  const renderHomeHeader = () => (
    <header className="py-4 px-8 border-b border-dark-surface bg-dark-background">
      <nav className="flex justify-between items-center">
        <Link href={isSpanish ? '/es' : '/en'}>
          <span className="text-xl font-bold text-dark-text">WGLABOR LLC</span>
        </Link>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button>
            {isSpanish ? 'Login / Registrarse' : 'Login / Register'}
          </Button>
        </div>
      </nav>
    </header>
  );

  const renderJobsHeader = () => (
    <header className="py-4 px-8 border-b border-dark-surface bg-dark-background">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href={isSpanish ? '/es' : '/en'}>
            <span className="text-xl font-bold text-dark-text">WGLABOR LLC</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-dark-text-muted hover:text-accent-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button>
            {isSpanish ? 'Iniciar Sesión' : 'Login'}
          </Button>
        </div>
      </nav>
    </header>
  );

  return variant === 'home' ? renderHomeHeader() : renderJobsHeader();
}