import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const faqs = [
  {
    question: 'Comment obtenir un devis chez Jackson Assurances ?',
    answer:
      'Obtenez votre devis en 3 façons : via notre formulaire en ligne (2 minutes), par téléphone au +226 25 38 02 00 (Lun-Ven 7h30–16h30, Sam 8h–12h), ou directement à nos agences de Ouagadougou et Bobo-Dioulasso.',
  },
  {
    question: 'Quels types d\'assurance proposez-vous ?',
    answer:
      'Jackson Assurances est spécialisée dans l\'IARDT : Incendie, Accidents, Risques Divers et Transport. Nos produits incluent l\'assurance automobile, moto, habitation multirisque, individuelle accident, responsabilité civile décennale, transport de marchandises, tous risques chantier et assurance voyage.',
  },
  {
    question: 'Comment déclarer un sinistre ?',
    answer:
      'Déclarez votre sinistre par téléphone au +226 25 38 02 00, par e-mail à infos@jacksonassurances.com, ou directement à notre siège (Avenue TANSOBA Goolma, face au CCVA). Nous traitons les sinistres dans les meilleurs délais.',
  },
  {
    question: 'Existe-t-il une application mobile Jackson Assurances ?',
    answer:
      'Oui, notre application mobile vous permet de déclarer vos sinistres directement depuis votre téléphone, de consulter vos contrats et de suivre l\'avancement de vos dossiers en temps réel.',
  },
  {
    question: 'Quels sont vos horaires d\'ouverture ?',
    answer:
      'Siège (Avenue TANSOBA Goolma, Ouagadougou) : Lundi–Vendredi 7h30–16h30, Samedi 8h00–12h00. Agence UEMOA (Ouagadougou) : mêmes horaires. Agence Bobo-Dioulasso : Lundi–Vendredi 8h00–16h00.',
  },
  {
    question: 'Jackson Assurances est-elle agréée ?',
    answer:
      'Oui. Jackson Assurances est une Société Anonyme agréée par le Ministère chargé des Finances du Burkina Faso, opérant sous contrôle de la CRCA-UMOA dans le cadre du Traité CIMA. Capital entièrement libéré : 5 000 000 000 F CFA.',
  },
  {
    question: 'Comment souscrire en ligne ?',
    answer:
      'La souscription en ligne est disponible pour certains produits depuis notre site. Remplissez le formulaire de devis, un conseiller vous recontacte pour finaliser votre contrat et vous guider dans les étapes de souscription.',
  },
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => (
  <div className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
      aria-expanded={isOpen}
    >
      <span className="text-[17px] font-semibold text-slate-900 dark:text-white group-hover:text-jackson-deep dark:group-hover:text-jackson-vivid transition-colors">
        {question}
      </span>
      <ChevronDown
        size={20}
        className={`shrink-0 text-jackson-deep dark:text-jackson-vivid transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
    >
      <p className="text-slate-600 dark:text-white/70 leading-relaxed text-[15px]">{answer}</p>
    </div>
  </div>
);

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-jackson-cream dark:bg-slate-900/50">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — title + contact nudge */}
            <ScrollReveal className="lg:sticky lg:top-28">
              <span className="section-badge mb-4">FAQ</span>
              <h2 className="section-title mb-6">
                Questions fréquentes
              </h2>
              <p className="section-subtitle mb-10">
                Vous ne trouvez pas la réponse ? Nos conseillers sont disponibles pour vous aider.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <a
                  href="tel:+22625380200"
                  className="btn-primary !rounded-xl !py-3 !px-6 text-sm"
                >
                  +226 25 38 02 00
                </a>
                <a
                  href="mailto:infos@jacksonassurances.com"
                  className="btn-secondary !rounded-xl !py-3 !px-6 text-sm"
                >
                  infos@jacksonassurances.com
                </a>
              </div>
            </ScrollReveal>

            {/* Right — accordion */}
            <ScrollReveal delay={150}>
              <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/40 px-8 shadow-soft">
                {faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
