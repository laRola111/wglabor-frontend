// src/app/layout.js
import './globals.css';
// 1. Importamos la fuente Geist en lugar de Inter
import { GeistSans } from 'geist/font/sans';

export const metadata = {
  title: 'WG Labor LLC | Agencia de gestión de trabajadores temporales',
  description: 'Agencia líder en gestión de trabajadores temporales. Conectamos talento excepcional con compañías líderes en el mercado.',
  keywords: ['agencia de empleo', 'trabajo temporal', 'gestión de personal', 'contratación', 'ofertas de empleo'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 2. Aplicamos la clase de la nueva fuente al body */}
      <body className={GeistSans.className}>
        {children}
      </body>
    </html>
  );
}