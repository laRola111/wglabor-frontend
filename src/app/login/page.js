// src/app/login/page.js
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/organisms/LoginForm';
import logo from '../../../public/logoGold-white.webp'; 

// 1. Importamos un ícono para el enlace
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-surface px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/">
            <Image
              src={logo}
              alt="WGLABOR LLC Logo"
              width={200}
              className="mx-auto"
              priority
            />
          </Link>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-dark-text">
            Administrator Access
          </h2>
        </div>
        <div className="bg-dark-background p-8 rounded-lg border border-dark-border shadow-2xl shadow-black/20">
          <LoginForm />
        </div>
        
        {/* 2. AÑADIMOS EL ENLACE DE VUELTA AL INICIO AQUÍ */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-dark-text-muted hover:text-accent-primary transition-colors duration-200"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}