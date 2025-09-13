// RUTA: src/components/organisms/Header.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import logo from "../../../public/WGLABOR-logo-hzt-1.png";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para controlar la visibilidad del header
  const [isVisible, setIsVisible] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);

  const isSpanish = pathname.startsWith("/es");
  const isHomePage = pathname === "/es" || pathname === "/en";

  // Efecto que maneja la visibilidad del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrollingUp = currentYPos < lastYPos;

      // Se muestra si el usuario sube el scroll o si está muy cerca de la parte superior
      setIsVisible(isScrollingUp || currentYPos < 50);
      setLastYPos(currentYPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastYPos]);

  // Efecto para bloquear el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = isSpanish
    ? [
        { name: "Buscar Empleos", href: "/es/jobs" },
        { name: "Para Empresas", href: "/es/companies" },
        { name: "Tips", href: "/es/resources" },
        { name: "Contacto", href: "#contact-form" },
      ]
    : [
        { name: "Find Jobs", href: "/en/jobs" },
        { name: "For Companies", href: "/en/companies" },
        { name: "Tips", href: "/en/resources" },
        { name: "Contact", href: "#contact-form" },
      ];

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`py-4 px-6 sm:px-8 border-b border-dark-surface bg-dark-background sticky top-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <Link href={isSpanish ? "/es" : "/en"} className="flex-shrink-0">
            <Image
              src={logo}
              alt="WGLABOR LLC Logo"
              width={180} // Usamos el tamaño mayor como base
              height={41} // Calculado para mantener el aspect ratio
              priority
              className="h-auto w-[160px] sm:w-[180px]" // La altura se ajusta automáticamente
            />
          </Link>

          <div className="hidden md:flex justify-center flex-grow space-x-8 text-dark-text-muted text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-accent-primary transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-accent-primary font-semibold"
                    : ""
                }`}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }
                }}
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
              {isMenuOpen ? (
                <HiOutlineX size={28} />
              ) : (
                <HiOutlineMenu size={28} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Panel de Menú Móvil */}
      <div
        className={`fixed inset-0 bg-dark-background z-30 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <nav className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-2xl text-dark-text-muted hover:text-accent-primary transition-colors ${
                  pathname === link.href
                    ? "text-accent-primary font-semibold"
                    : ""
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
