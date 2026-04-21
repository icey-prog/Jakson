import React from 'react';
import { Check } from 'lucide-react';
import type { QuoteFormData, FieldErrors } from './quoteFormTypes';
import { BASE_INPUT, inputStateClass } from './quoteFormTypes';
import { BackButton } from './NavButtons';

interface StepContactProps {
  formData: QuoteFormData;
  errors: FieldErrors;
  loading: boolean;
  onUpdate: (field: keyof QuoteFormData, value: string | boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const StepContact: React.FC<StepContactProps> = ({ formData, errors, loading, onUpdate, onSubmit, onBack }) => {
  const inputClass = (field: keyof QuoteFormData) =>
    `${BASE_INPUT} ${inputStateClass(!!errors[field as string], !!formData[field])}`;

  return (
    <div className="space-y-5">
      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5">
          Téléphone <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="tel" placeholder="Ex: +226 70 00 00 00"
            value={formData.telephone}
            onChange={e => onUpdate('telephone', e.target.value)}
            className={inputClass('telephone')}
          />
          {formData.telephone && !errors.telephone && (
            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
          )}
        </div>
        <p className="text-[11px] text-white/40 mt-1">Format attendu : +226 ou numéro local</p>
        {errors.telephone && <p className="text-xs text-red-400 mt-1">{errors.telephone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="email" placeholder="Ex: jean.dupont@email.com"
            value={formData.email}
            onChange={e => onUpdate('email', e.target.value)}
            className={inputClass('email')}
          />
          {formData.email && !errors.email && (
            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
          )}
        </div>
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onUpdate('optin', !formData.optin)}
          className={`mt-0.5 w-[18px] h-[18px] rounded-sm border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
            formData.optin ? 'bg-jackson-vivid border-jackson-vivid' : 'border-white/25 bg-white/5'
          }`}
        >
          {formData.optin && <Check size={12} className="text-white" />}
        </button>
        <span className="text-[13px] text-white/50 leading-relaxed">
          J&apos;accepte de recevoir mon devis et d&apos;être contacté par un conseiller Jackson Assurances.
        </span>
      </div>
      {errors.optin && <p className="text-xs text-red-400">{errors.optin}</p>}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <BackButton onClick={onBack} />
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-8 py-3.5 bg-jackson-deep hover:bg-jackson-vivid text-white font-semibold rounded-btn transition-all duration-250 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-[0_8px_32px_rgba(20,184,166,0.2)]"
        >
          {loading
            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : 'Recevoir mon devis gratuit'
          }
        </button>
      </div>
    </div>
  );
};

export default StepContact;
