// src/app/layout.js
import './globals.css';
// 1. Importamos la fuente Geist en lugar de Inter
import { GeistSans } from 'geist/font/sans';

export const metadata = {
  title: 'WG Labor LLC | Temporary & Temp-to-Hire Staffing Agency',
  description: 'As a leading staffing agency, we connect exceptional talent with top companies. Specializing in temporary and temp-to-hire solutions.',
  keywords: [
    'staffing agency', 
    'temporary staffing', 
    'temp agency', 
    'recruitment', 
    'hiring solutions', 
    'workforce management', 
    'temp jobs'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Aplicamos la clase de la nueva fuente al body */}
      <body className={GeistSans.className}>
        {children}
      </body>
    </html>
  );
}