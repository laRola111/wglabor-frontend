// RUTA: src/components/organisms/ContactSection.js (MODIFICADO)

import ContactForm from './ContactForm'; // <-- Importamos el nuevo formulario

export default async function ContactSection({ dict, lang }) {

  const content = {
    es: {
      contactTitle: "¿Interesado en nuestros servicios?",
      contactDescription: "Complete el formulario a continuación y nuestro equipo se pondrá en contacto para discutir cómo podemos ayudar a su empresa.",
      candidateSupport: "Si eres un candidato buscando soporte, por favor escríbenos a:",
      supportEmail: "info@wglaborllc.com",
      // ... textos para el formulario
      nameLabel: "Nombre Completo",
      companyLabel: "Empresa (Opcional)",
      emailLabel: "Correo Electrónico",
      messageLabel: "Mensaje",
      sendButton: "Enviar Mensaje",
      sending: "Enviando...",
      alert: "*Se requiere al menos un correo electrónico o un teléfono.",
      phone: "Telefono"
    },
    en: {
      contactTitle: "Interested in our services?",
      contactDescription: "Complete the form below and our team will get in touch to discuss how we can help your company.",
      candidateSupport: "If you are a candidate seeking support, please email us at:",
      supportEmail: "info@wglaborllc.com",
      // ... form texts
      nameLabel: "Full Name",
      companyLabel: "Company (Optional)",
      emailLabel: "Email Address",
      messageLabel: "Message",
      sendButton: "Send Message",
      sending: "Sending...",
      alert: "*At least one email or phone number is required.",
      phone: "Phone",
    }
  }
  
  const text = content[lang] || content['es'];

  return (
    <section id="contact-form" className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
            <h2 className="text-4xl font-bold text-dark-text mb-4">{text.contactTitle}</h2>
            <p className="text-lg text-dark-text-muted mb-12 max-w-2xl mx-auto">{text.contactDescription}</p>
        </div>
        
        <ContactForm dict={text} />

        <div className="text-center mt-12 border-t border-dark-border pt-8">
            <p className="text-dark-text-muted">{text.candidateSupport}</p>
            <a href={`mailto:${text.supportEmail}`} className="text-accent-primary font-semibold hover:underline">
                {text.supportEmail}
            </a>
        </div>
      </div>
    </section>
  );
}