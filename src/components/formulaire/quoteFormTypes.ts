/* Shared types, constants, and validators for the quote form flow */

export interface QuoteFormData {
  nom: string;
  prenom: string;
  age: string;
  typeAssurance: string;
  niveauGarantie: number;
  telephone: string;
  email: string;
  optin: boolean;
}

export type QuoteStep = 1 | 2 | 3;
export type FieldErrors = Record<string, string>;
export type TransitionDirection = 'next' | 'prev';

export const INSURANCE_TYPES = ['Auto', 'Moto', 'Habitation', 'Voyage'] as const;

export const GUARANTEE_LABELS = [
  'Essentiel (budget maîtrisé)',
  'Confort (équilibré)',
  'Premium (protection maximale)',
] as const;

export const STEP_LABELS: Record<QuoteStep, string> = {
  1: 'Votre profil',
  2: 'Vos besoins',
  3: 'Contact',
};

/* ── Input styling helpers ── */
export const BASE_INPUT = `
  w-full px-4 py-3 rounded-btn border text-sm text-gray-900 bg-white
  placeholder:text-gray-400 transition-all duration-200 focus:outline-none
  focus:border-jackson-vivid focus:shadow-[0_0_0_3px_rgba(20,184,166,0.2)]
`.trim();

export function inputStateClass(hasError: boolean, hasValue: boolean): string {
  if (hasError) return 'border-red-500 bg-red-50 animate-shake';
  if (hasValue) return 'border-green-500 bg-green-50';
  return 'border-gray-200';
}

/* ── Per-step validators (pure functions, no side effects) ── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateIdentityStep(data: QuoteFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.nom.trim())    errors.nom    = 'Le nom est requis';
  if (!data.prenom.trim()) errors.prenom = 'Le prénom est requis';
  if (!data.age || parseInt(data.age) < 18) errors.age = 'Âge minimum 18 ans';
  return errors;
}

export function validateInsuranceStep(data: QuoteFormData): FieldErrors {
  return data.typeAssurance
    ? {}
    : { typeAssurance: "Sélectionnez un type d'assurance" };
}

export function validateContactStep(data: QuoteFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.telephone.trim()) errors.telephone = 'Le téléphone est requis';
  if (!data.email.trim() || !EMAIL_REGEX.test(data.email)) errors.email = 'Email invalide';
  if (!data.optin) errors.optin = 'Veuillez accepter les conditions';
  return errors;
}

export const STEP_VALIDATORS: Record<QuoteStep, (d: QuoteFormData) => FieldErrors> = {
  1: validateIdentityStep,
  2: validateInsuranceStep,
  3: validateContactStep,
};
