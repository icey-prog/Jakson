import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import QuoteForm from '@/components/formulaire/QuoteForm';
import CallbackCard from '@/components/formulaire/CallbackCard';

/**
 * Règle 60/30/10 sur la page devis :
 *   60 % blanc — le canvas et la colonne du formulaire
 *   30 % teal  — la carte de rappel, seul bloc sombre
 *   10 % accent — les CTA en apple-blue et les validations en meadow
 */
const FormulaireSection: React.FC = () => {
  return (
    <section id="formulaire" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Colonne formulaire — la surface dominante */}
          <div className="lg:col-span-3">
            <ScrollReveal className="mb-10">
              <TextReveal
                text="Demandez votre devis"
                className="section-title mb-4"
                as="h1"
              />
              <p className="section-subtitle">
                Votre prix en un coup d&apos;œil, puis vos coordonnées. Un conseiller confirme
                votre devis sous 24 h, sans engagement.
              </p>
            </ScrollReveal>

            <QuoteForm />
          </div>

          {/* Colonne secondaire — le bloc teal qui porte les 30 % */}
          <div className="lg:col-span-2">
            <CallbackCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FormulaireSection;
