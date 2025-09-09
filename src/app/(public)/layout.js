// src/app/(public)/layout.js
import Header from '@/components/organisms/Header';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}