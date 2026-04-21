import React from 'react';
import { Check } from 'lucide-react';
import type { QuoteFormData, FieldErrors } from './quoteFormTypes';
import { BASE_INPUT, inputStateClass } from './quoteFormTypes';
import NextButton from './NavButtons';

interface StepIdentityProps {
  formData: QuoteFormData;
  errors: FieldErrors;
  onUpdate: (field: keyof QuoteFormData, value: string) => void;
  onNext: () => void;
}

const LABEL_MAP: Record<'nom' | 'prenom', string> = {
  nom:    'Nom',
  prenom: 'Prénom',
};

const PLACEHOLDER_MAP: Record<'nom' | 'prenom', string> = {
  nom:    'Ex: Dupont',
  prenom: 'Ex: Jean',
};

const StepIdentity: React.FC<StepIdentityProps> = ({ formData, errors, onUpdate, onNext }) => {
  const inputClass = (field: keyof QuoteFormData) =>
    `${BASE_INPUT} ${inputStateClass(!!errors[field as string], !!formData[field])}`;

  return (
    <div className="space-y-5">
      {(['nom', 'prenom'] as const).map(name => (
        <div key={name} className="relative">
          <label className="block text-sm font-medium text-white/90 mb-1.5">
            {LABEL_MAP[name]} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={PLACEHOLDER_MAP[name]}
              value={formData[name]}
              onChange={e => onUpdate(name, e.target.value)}
              className={inputClass(name)}
            />
            {formData[name] && !errors[name] && (
              <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
            )}
          </div>
          {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5">
          Âge <span className="text-red-400">*</span>
        </label>
        <div className="relative w-32">
          <input
            type="number" placeholder="Ex: 35" min="18" max="99"
            value={formData.age}
            onChange={e => onUpdate('age', e.target.value)}
            className={`${inputClass('age')} pr-10`}
          />
          {formData.age && !errors.age && (
            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
          )}
        </div>
        {errors.age && <p className="text-xs text-red-400 mt-1">{errors.age}</p>}
      </div>

      <div className="flex justify-end pt-2">
        <NextButton onClick={onNext} />
      </div>
    </div>
  );
};

export default StepIdentity;
