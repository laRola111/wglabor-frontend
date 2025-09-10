// src/components/organisms/ContactSection.js
import Link from 'next/link';
import Button from '../ui/Button';

export default async function ContactSection({ dict, lang }) {
  return (
    <section className="bg-dark-surface py-20 px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-dark-text mb-4">{dict.home.contactTitle}</h2>
        <p className="text-lg text-dark-text-muted mb-8">{dict.home.contactDescription}</p>
        <Link href={`/${lang}/contact`}>
          <Button className="text-lg px-10 py-3">{dict.home.contactButton}</Button>
        </Link>
      </div>
    </section>
  );
}