import React from 'react';
import { Check } from 'lucide-react';
import type { QuoteFormData, FieldErrors } from './quoteFormTypes';
import { INSURANCE_TYPES, GUARANTEE_LABELS } from './quoteFormTypes';
import { NextButton, BackButton } from './NavButtons';

interface StepInsuranceProps {
  formData: QuoteFormData;
  errors: FieldErrors;
  onUpdate: (field: keyof QuoteFormData, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepInsurance: React.FC<StepInsuranceProps> = ({ formData, errors, onUpdate, onNext, onBack }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-white/80 mb-3">
        Type d&apos;assurance <span className="text-red-400">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {INSURANCE_TYPES.map(type => (
          <button
            key={type}
            onClick={() => onUpdate('typeAssurance', type)}
            className={`relative p-4 rounded-btn border-2 text-center font-medium transition-all duration-200 cursor-pointer ${
              formData.typeAssurance === type
                ? 'border-jackson-vivid bg-jackson-vivid/15 text-white shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                : 'border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/90'
            }`}
          >
            {formData.typeAssurance === type && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-jackson-vivid rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </span>
            )}
            {type}
          </button>
        ))}
      </div>
      {errors.typeAssurance && <p className="text-xs text-red-400 mt-2">{errors.typeAssurance}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-white/80 mb-3">
        Niveau de garantie souhaité
      </label>
      <input
        type="range" min="1" max="3" step="1"
        value={formData.niveauGarantie}
        onChange={e => onUpdate('niveauGarantie', parseInt(e.target.value))}
        className="w-full accent-jackson-vivid"
      />
      <p className="text-sm text-jackson-vivid font-medium mt-2">
        {GUARANTEE_LABELS[formData.niveauGarantie - 1]}
      </p>
    </div>

    <div className="flex justify-between pt-2">
      <BackButton onClick={onBack} />
      <NextButton onClick={onNext} />
    </div>
  </div>
);

export default StepInsurance;
