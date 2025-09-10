// src/components/organisms/CompaniesSection.js
import Link from 'next/link';
import { FaBuilding } from 'react-icons/fa';
import Button from '../ui/Button';

export default async function CompaniesSection({ dict, lang }) {

  return (
    <section className="bg-dark-surface py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-dark-text mb-4">{dict.home.companiesTitle}</h2>
          <p className="text-lg text-dark-text-muted mb-8">{dict.home.companiesDescription}</p>
          <Link href={`/${lang}/companies`}>
            <Button className="text-lg px-8 py-3">{dict.home.companiesButton}</Button>
          </Link>
        </div>
        <div className="hidden md:flex justify-center">
          <FaBuilding className="text-accent-primary opacity-10" size={250} />
        </div>
      </div>
    </section>
  );
}