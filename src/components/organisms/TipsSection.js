// src/components/organisms/TipsSection.js
import { FaFileAlt, FaUserTie, FaHandshake } from 'react-icons/fa';

const TipCard = ({ icon, title, description }) => (
  <div className="bg-dark-surface p-8 rounded-lg border border-dark-border text-center transform transition-transform duration-300 hover:-translate-y-2">
    <div className="flex justify-center mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-dark-text mb-3">{title}</h3>
    <p className="text-dark-text-muted">{description}</p>
  </div>
);

export default async function TipsSection({ dict }) {
  const tips = [
    {
      icon: <FaFileAlt className="text-accent-primary" size={40} />,
      title: dict.home.tip1Title,
      description: dict.home.tip1Description,
    },
    {
      icon: <FaUserTie className="text-accent-primary" size={40} />,
      title: dict.home.tip2Title,
      description: dict.home.tip2Description,
    },
    {
      icon: <FaHandshake className="text-accent-primary" size={40} />,
      title: dict.home.tip3Title,
      description: dict.home.tip3Description,
    },
  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-dark-text mb-12">{dict.home.tipsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <TipCard key={index} {...tip} />
          ))}
        </div>
      </div>
    </section>
  );
}