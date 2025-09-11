// RUTA: src/components/organisms/DashboardSidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, 
  FaBriefcase, 
  FaBuilding, 
  FaUsers, 
  FaAddressCard, 
  FaCog 
} from 'react-icons/fa';

// 1. Definimos los enlaces de navegación como un array de objetos para fácil mantenimiento.
const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/dashboard/jobs', label: 'Ofertas', icon: FaBriefcase },
  { href: '/dashboard/companies', label: 'Empresas', icon: FaBuilding },
  { href: '/dashboard/leads', label: 'Leads', icon: FaUsers },
  { href: '/dashboard/candidates', label: 'Candidatos', icon: FaAddressCard },
  { href: '/dashboard/settings', label: 'Ajustes', icon: FaCog },
];

const NavLink = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  // 2. Determinamos si el enlace está activo. Usamos startsWith para que rutas anidadas
  // (ej. /dashboard/jobs/new) también marquen como activo el enlace principal (/dashboard/jobs).
  // Hacemos una excepción para el Dashboard principal para que no esté siempre activo.
  const isActive = href === '/dashboard' ? pathname === href : pathname.startsWith(href);

  const baseClasses = 'flex items-center space-x-3 rounded-md px-3 py-2 text-dark-text-muted transition-colors';
  const activeClasses = 'bg-accent-primary/10 text-accent-primary font-semibold';
  const hoverClasses = 'hover:bg-dark-surface hover:text-dark-text';

  const classes = `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;

  return (
    <Link href={href} className={classes}>
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

export default function DashboardSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-dark-background border-r border-dark-border p-4">
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} icon={link.icon}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}