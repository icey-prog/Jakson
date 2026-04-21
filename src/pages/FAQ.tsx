import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SOSButton from '@/components/SOSButton';
import ScrollReveal from '@/components/ScrollReveal';
import AmbientOrb from '@/components/AmbientOrb';

const categories = [
  {
    label: 'Général',
    faqs: [
      { q: 'Jackson Assurances est-elle agréée ?', a: 'Oui. Jackson Assurances est une Société Anonyme agréée par le Ministère chargé des Finances du Burkina Faso, sous contrôle de la CRCA-UMOA dans le cadre du Traité CIMA. Capital entièrement libéré : 5 000 000 000 F CFA.' },
      { q: 'Quels types d\'assurance proposez-vous ?', a: 'Jackson Assurances est spécialisée en IARDT : Incendie, Accidents, Risques Divers et Transport. Nos 10 produits couvrent automobile, moto, habitation multirisque, individuelle accident, responsabilité civile, RC décennale, transport de marchandises, tous risques chantier, assurance voyage et incendie.' },
      { q: 'Quels sont vos horaires d\'ouverture ?', a: 'Siège (Ouagadougou) : Lun–Ven 7h30–16h30, Sam 8h–12h. Agence UEMOA : mêmes horaires. Agence Bobo-Dioulasso : Lun–Ven 8h–16h.' },
    ],
  },
  {
    label: 'Devis & Souscription',
    faqs: [
      { q: 'Comment obtenir un devis ?', a: 'Trois façons : formulaire en ligne (2 minutes), téléphone +226 25 38 02 00 (Lun–Ven 7h30–16h30, Sam 8h–12h), ou directement en agence à Ouagadougou et Bobo-Dioulasso.' },
      { q: 'Comment souscrire en ligne ?', a: 'Remplissez le formulaire de devis sur notre site. Un conseiller vous recontacte pour finaliser votre contrat et vous guider dans les étapes de souscription. La souscription en ligne est disponible pour certains produits.' },
      { q: 'Quels documents fournir pour souscrire ?', a: 'Selon le produit, les documents courants sont : pièce d\'identité, carte grise (auto/moto), photos du bien à assurer (habitation), devis travaux (chantier). Notre conseiller vous précise la liste exacte selon votre dossier.' },
    ],
  },
  {
    label: 'Sinistres',
    faqs: [
      { q: 'Comment déclarer un sinistre ?', a: 'Déclarez votre sinistre par téléphone au +226 25 38 02 00, par e-mail à infos@jacksonassurances.com, ou directement au siège (Avenue TANSOBA Goolma, face au CCVA). Nous traitons les sinistres dans les meilleurs délais.' },
      { q: 'Existe-t-il une application mobile ?', a: 'Oui, notre application mobile vous permet de déclarer vos sinistres depuis votre téléphone, consulter vos contrats et suivre vos dossiers en temps réel.' },
      { q: 'Quel est le délai de traitement d\'un sinistre ?', a: 'Nous nous engageons à traiter les sinistres dans les meilleurs délais. La majorité des sinistres simples sont réglés sous 48 heures après réception de l\'ensemble des pièces requises.' },
    ],
  },
];

const FAQItem: React.FC<{ q: string; a: string; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle }) => (
  <div className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 text-left group cursor-pointer" aria-expanded={open}>
      <span className="text-[16px] font-semibold text-slate-900 dark:text-white group-hover:text-jackson-deep dark:group-hover:text-jackson-vivid transition-colors">{q}</span>
      <ChevronDown size={18} className={`shrink-0 text-jackson-deep dark:text-jackson-vivid transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-80 pb-5' : 'max-h-0'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}>
      <p className="text-[14px] text-slate-600 dark:text-white/70 leading-relaxed">{a}</p>
    </div>
  </div>
);

const FAQPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white dark:bg-jackson-night">
      <Navigation />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-jackson-cream dark:bg-slate-900/50 overflow-hidden">
          <AmbientOrb size={400} opacity={0.12} className="-bottom-20 -right-20" />
          <div className="relative z-10 section-container">
            <div className="section-inner">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-white/60 hover:text-jackson-deep dark:hover:text-jackson-vivid transition-colors mb-10">
                <ArrowLeft size={16} /> Retour
              </Link>
              <span className="section-badge mb-6">FAQ</span>
              <h1 className="section-title mb-5 max-w-xl">Questions fréquemment posées</h1>
              <p className="section-subtitle">
                Toutes vos questions sur nos services, la souscription et la gestion de sinistres.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ content */}
        <section className="section-padding">
          <div className="section-container">
            <div className="section-inner max-w-3xl mx-auto">

              {/* Category tabs */}
              <ScrollReveal>
                <div className="flex flex-wrap gap-2 mb-10">
                  {categories.map((cat, i) => (
                    <button key={cat.label} onClick={() => { setActiveTab(i); setOpenIdx(0); }}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
                        ${activeTab === i
                          ? 'bg-jackson-deep text-white shadow-[0_4px_12px_rgba(15,118,110,0.3)]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white/70 hover:bg-jackson-cream dark:hover:bg-slate-700'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Accordion */}
              <ScrollReveal delay={100}>
                <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/40 px-6 md:px-8 shadow-soft">
                  {categories[activeTab].faqs.map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
                  ))}
                </div>
              </ScrollReveal>

              {/* Contact nudge */}
              <ScrollReveal delay={200} className="mt-12 p-6 rounded-2xl bg-jackson-cream dark:bg-slate-800/40 border border-jackson-deep/10 dark:border-jackson-vivid/10 text-center">
                <p className="text-slate-700 dark:text-white/80 font-medium mb-4">Vous ne trouvez pas votre réponse ?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+22625380200" className="btn-primary !py-2.5 !px-6 text-sm !rounded-xl">
                    +226 25 38 02 00
                  </a>
                  <a href="mailto:infos@jacksonassurances.com" className="btn-secondary !py-2.5 !px-6 text-sm !rounded-xl">
                    Écrire un e-mail
                  </a>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

      </main>
      <Footer />
      <SOSButton />
    </div>
  );
};

export default FAQPage;
