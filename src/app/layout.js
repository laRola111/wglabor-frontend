// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WG Labor LLC | Agencia de gestión de trabajadores temporales',
  description: 'Agencia líder en gestión de trabajadores temporales. Conectamos talento excepcional con compañías líderes en el mercado.',
  keywords: ['agencia de empleo', 'trabajo temporal', 'gestión de personal', 'contratación', 'ofertas de empleo'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}