// RUTA: src/components/organisms/CompaniesSection.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../ui/Button";

export default function CompaniesSection({ dict, lang }) {
  // El contenido del diccionario se sigue obteniendo de 'home'
  const text = dict.home;

  const handleScrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            {text.companiesTitle}
          </h2>
          <p className="text-lg text-dark-text-muted mb-8">
            {text.companiesDescription}
          </p>

          {/* AHORA LOS TEXTOS VIENEN DEL DICCIONARIO */}
          <ul className="space-y-4 mb-10">
            <li className="flex items-center text-dark-text-muted">
              <FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" />
              <span>{text.companiesBenefit1}</span>
            </li>
            <li className="flex items-center text-dark-text-muted">
              <FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" />
              <span>{text.companiesBenefit2}</span>
            </li>
            <li className="flex items-center text-dark-text-muted">
              <FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" />
              <span>{text.companiesBenefit3}</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleScrollToContact}
              className="text-lg px-8 py-3"
            >
              <span>{text.findTalentButton}</span>
            </Button>

            <Link href={`/${lang}/companies`}>
              <Button className="text-lg px-8 py-3 bg-transparent border-2 border-dark-border hover:bg-dark-surface hover:border-dark-surface">
                <span>{text.moreInfoButton}</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-80 lg:h-[450px] w-full hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1770"
            alt="Reunión de negocios profesional"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}