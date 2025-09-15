// RUTA: src/components/organisms/DashboardSidebar.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Importar Image
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, FaBriefcase, FaBuilding, FaUsers, FaAddressCard, FaCog, FaTimes // Importar FaTimes
} from 'react-icons/fa';
import logo from '../../../public/WGLABOR-logo-hzt-1.png'; // Importar el logo

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/dashboard/jobs', label: 'Jobs', icon: FaBriefcase },
  { href: '/dashboard/companies', label: 'Companies', icon: FaBuilding },
  { href: '/dashboard/leads', label: 'Leads', icon: FaUsers },
  { href: '/dashboard/candidates', label: 'Candidates', icon: FaAddressCard },
  { href: '/dashboard/settings', label: 'Settings', icon: FaCog },
];

const NavLink = ({ href, icon: Icon, children, onClick }) => {
  const pathname = usePathname();
  const isActive = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
  const baseClasses = 'flex items-center space-x-3 rounded-md px-3 py-2 text-dark-text-muted transition-colors';
  const activeClasses = 'bg-accent-primary/10 text-accent-primary font-semibold';
  const hoverClasses = 'hover:bg-dark-surface hover:text-dark-text';
  const classes = `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;

  return (
    <Link href={href} className={classes} onClick={onClick}>
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

export default function DashboardSidebar({ isOpen, onClose }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-dark-background border-r border-dark-border p-4 z-40
                   flex flex-col
                   transition-transform duration-300 ease-in-out 
                   md:relative md:translate-x-0
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* --- INICIO: NUEVA CABECERA DEL SIDEBAR (SOLO MÓVIL) --- */}
        <div className="flex items-center justify-between md:hidden mb-8">
          <Link href="/dashboard" onClick={onClose}>
            <Image src={logo} alt="WGLABOR LLC Logo" width={150} height={30} priority/>
          </Link>
          <button 
            onClick={onClose} 
            className="text-dark-text-muted hover:text-white"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {/* --- FIN: NUEVA CABECERA DEL SIDEBAR --- */}

        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} icon={link.icon} onClick={onClose}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}