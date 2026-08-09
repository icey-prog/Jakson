import React, { useState, useRef, useCallback, Suspense, lazy } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import StatusBadge from '@/components/StatusBadge';

/* lottie-web pèse ~300 Ko : chargé seulement à l'écran de confirmation,
   sinon il alourdit le chunk du formulaire pour tout le monde. */
const ConfirmationLottie = lazy(() => import('./ConfirmationLottie'));
import gsap from 'gsap';
import type { QuoteFormData, QuoteStep, FieldErrors, TransitionDirection } from './quoteFormTypes';
import { STEP_VALIDATORS } from './quoteFormTypes';
import StepProgressBar from './StepProgressBar';
import StepBien       from './StepBien';
import StepIdentity   from './StepIdentity';
import StepInsurance  from './StepInsurance';
import StepContact    from './StepContact';

const INITIAL_FORM_DATA: QuoteFormData = {
  typeBien: 'voiture', trancheId: 't2', duree: 12,
  nom: '', prenom: '', age: '', typeAssurance: '',
  niveauGarantie: 2, telephone: '', email: '', optin: false,
};

/* ── Confirmation screen ── */
const SubmitConfirmation: React.FC = () => (
  <ScrollReveal className="text-center py-12">
    <Suspense fallback={<div className="h-40" />}>
      <ConfirmationLottie />
    </Suspense>
    <StatusBadge tone="succes" className="mb-5">
      Demande envoyée
    </StatusBadge>
    <h3 className="font-display text-2xl font-bold text-apple-ink mb-3">
      Merci ! Votre demande a bien été envoyée.
    </h3>
    <p className="text-base text-apple-ink-48">
      Un conseiller vous contactera sous 24h avec votre devis personnalisé.
    </p>
  </ScrollReveal>
);

/* ── State machine orchestrator ── */
const QuoteForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<QuoteStep>(1);
  const [formData, setFormData]       = useState<QuoteFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors]           = useState<FieldErrors>({});
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof QuoteFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string])
      setErrors(prev => { const next = { ...prev }; delete next[field as string]; return next; });
  };

  const validateCurrentStep = useCallback((): boolean => {
    const stepErrors = STEP_VALIDATORS[currentStep](formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [currentStep, formData]);

  const animateStepChange = useCallback((direction: TransitionDirection, callback: () => void) => {
    if (!contentRef.current) { callback(); return; }
    const slideOut = direction === 'next' ? -20 : 20;
    const slideIn  = direction === 'next' ?  20 : -20;
    const gsapCtx  = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0, x: slideOut, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          callback();
          gsap.fromTo(contentRef.current,
            { opacity: 0, x: slideIn },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 },
          );
        },
      });
    });
    return () => gsapCtx.revert();
  }, []);

  const goNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 4)
      animateStepChange('next', () => setCurrentStep(prev => (prev + 1) as QuoteStep));
  };

  const goBack = () => {
    if (currentStep > 1)
      animateStepChange('prev', () => setCurrentStep(prev => (prev - 1) as QuoteStep));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setLoading(true);
    // TODO: replace with real API call to Jackson CRM
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) return <SubmitConfirmation />;

  const stepProps = { formData, errors, onUpdate: updateField };
  const nbErreurs = Object.keys(errors).length;

  return (
    <ScrollReveal>
      <StepProgressBar currentStep={currentStep} />

      {/* État courant du formulaire — un seul badge à la fois, sur les états qui existent vraiment. */}
      {(loading || nbErreurs > 0) && (
        <div className="mb-6 flex justify-center">
          {loading ? (
            <StatusBadge tone="en-cours"  anime>
              Envoi en cours
            </StatusBadge>
          ) : (
            <StatusBadge tone="echec" >
              {nbErreurs === 1 ? '1 champ à corriger' : `${nbErreurs} champs à corriger`}
            </StatusBadge>
          )}
        </div>
      )}

      <div ref={contentRef}>
        {currentStep === 1 && <StepBien      formData={formData} onUpdate={updateField} onNext={goNext} />}
        {currentStep === 2 && <StepIdentity  {...stepProps} onNext={goNext} onBack={goBack} />}
        {currentStep === 3 && <StepInsurance {...stepProps} onNext={goNext} onBack={goBack} />}
        {currentStep === 4 && <StepContact   {...stepProps} loading={loading} onSubmit={handleSubmit} onBack={goBack} />}
      </div>
    </ScrollReveal>
  );
};

export default QuoteForm;
