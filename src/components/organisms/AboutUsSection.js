import Image from "next/image";
import logo from "../../../public/team.webp";

// El componente ahora recibe el diccionario 'dict' como los demás
export default function AboutUsSection({ dict }) {
  // Ya no necesita lógica de idioma interna, usa directamente las props
  const text = dict;

  return (
    <section className="relative z-10 py-24 px-8 bg-gradient-to-b from-transparent via-black-background/10 to-dark-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 lg:h-full w-full">
          <Image
            src={logo}
            alt={text.aboutUsImageAlt} // <- Clave del diccionario
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="text-left">
          <span className="block w-20 h-1 bg-accent-primary mb-6"></span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            {text.aboutUsTitle} {/* <- Clave del diccionario */}
          </h2>
          <div className="space-y-4 text-lg text-dark-text-muted">
            <p>{text.aboutUsP1}</p> {/* <- Clave del diccionario */}
            <p>{text.aboutUsP2}</p> {/* <- Clave del diccionario */}
          </div>
        </div>
      </div>
    </section>
  );
}