import React from 'react';
import { Car, House, Laptop } from 'lucide-react';
import { NextButton } from './NavButtons';
import type { QuoteFormData } from './quoteFormTypes';
import {
  TRANCHES, DUREES, calculerPrime, formatFCFA, getTranche,
  type TypeBien, type Duree,
} from '@/lib/tarification';

const TYPES: { id: TypeBien; label: string; description: string; Icone: typeof Car }[] = [
  { id: 'voiture', label: 'Voiture', description: 'Particuliers et utilitaires', Icone: Car },
  { id: 'maison', label: 'Maison', description: 'Habitation, local, bâtiment', Icone: House },
  { id: 'equipement', label: 'Équipement', description: 'Matériel pro et informatique', Icone: Laptop },
];

interface SegmentProps<T> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}

function Segment<T extends string | number>({ options, value, onChange, ariaLabel }: SegmentProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="grid gap-2 sm:grid-cols-3">
      {options.map(option => {
        const actif = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={actif}
            onClick={() => onChange(option.value)}
            className={`h-12 rounded-md border px-4 text-sm transition-all duration-150 cursor-pointer ${
              actif
                ? 'border-jackson-vivid bg-jackson-vivid text-white font-semibold'
                : 'border-black/12 bg-apple-parchment text-apple-ink hover:border-apple-blue/40'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

interface StepBienProps {
  formData: QuoteFormData;
  onUpdate: (field: keyof QuoteFormData, value: string | number) => void;
  onNext: () => void;
}

const StepBien: React.FC<StepBienProps> = ({ formData, onUpdate, onNext }) => {
  const { typeBien, trancheId, duree } = formData;
  const prime = calculerPrime(typeBien, trancheId, duree);
  const mensuel = Math.round(prime / duree);

  return (
    <div className="space-y-7">
      <div>
        <label className="mb-3 block text-sm font-medium text-apple-ink">Type de bien à assurer</label>
        <div role="radiogroup" aria-label="Type de bien" className="grid gap-3 sm:grid-cols-3">
          {TYPES.map(({ id, label, description, Icone }) => {
            const actif = id === typeBien;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={actif}
                aria-label={label}
                onClick={() => onUpdate('typeBien', id)}
                className={`rounded-lg border p-4 text-left transition-all duration-150 cursor-pointer ${
                  actif
                    ? 'border-jackson-vivid bg-jackson-vivid/15'
                    : 'border-black/10 bg-apple-parchment hover:border-apple-blue/40'
                }`}
              >
                <Icone size={22} className={actif ? 'text-jackson-vivid' : 'text-apple-ink-48'} />
                <p className="mt-3 text-sm font-semibold text-apple-ink">{label}</p>
                <p className="mt-0.5 text-xs text-apple-ink-48">{description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-apple-ink">Valeur du bien (FCFA)</label>
        <Segment
          ariaLabel="Tranche de prix du bien"
          value={trancheId}
          onChange={v => onUpdate('trancheId', v)}
          options={TRANCHES.map(t => ({ value: t.id, label: t.label }))}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-apple-ink">Durée du contrat</label>
        <Segment
          ariaLabel="Durée du contrat"
          value={duree}
          onChange={v => onUpdate('duree', v as Duree)}
          options={DUREES.map(d => ({ value: d, label: `${d} mois` }))}
        />
      </div>

      {/* Prix indicatif, recalculé à chaque changement */}
      <div className="rounded-lg border border-jackson-teal/20 bg-jackson-cream p-5">
        <p className="text-xs uppercase tracking-[0.04em] text-jackson-teal">Votre prix indicatif</p>
        <p className="mt-1.5 font-display text-3xl font-bold text-apple-ink">{formatFCFA(prime)}</p>
        <p className="mt-1 text-sm text-apple-ink-48">
          soit {formatFCFA(mensuel)} par mois, sur une base de {formatFCFA(getTranche(trancheId).reference)}
        </p>
        <p className="mt-4 text-xs text-apple-ink-48">
          Estimation indicative. Votre devis définitif est confirmé par un conseiller.
        </p>
      </div>

      <div className="flex justify-end pt-2">
        <NextButton onClick={onNext} />
      </div>
    </div>
  );
};

export default StepBien;
