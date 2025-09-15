// RUTA: src/components/organisms/DashboardSidebar.js (ACTUALIZADO)
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

// 1. Labels actualizados a Inglés
const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/dashboard/jobs', label: 'Jobs', icon: FaBriefcase },
  { href: '/dashboard/companies', label: 'Companies', icon: FaBuilding },
  { href: '/dashboard/leads', label: 'Leads', icon: FaUsers },
  { href: '/dashboard/candidates', label: 'Candidates', icon: FaAddressCard },
  { href: '/dashboard/settings', label: 'Settings', icon: FaCog },
];

// ... el resto del componente NavLink se mantiene igual
const NavLink = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
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
    <aside className="w-64 flex-shrink-0 bg-dark-background border-r border-dark-border p-4 hidden md:block">
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