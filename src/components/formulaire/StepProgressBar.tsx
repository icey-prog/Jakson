import React from 'react';
import { Check } from 'lucide-react';
import type { QuoteStep } from './quoteFormTypes';
import { STEP_LABELS } from './quoteFormTypes';

interface StepProgressBarProps {
  currentStep: QuoteStep;
}

const STEPS: QuoteStep[] = [1, 2, 3, 4];

/** Largeur d'un demi-segment, en % — la piste va du centre du 1er au centre du dernier rond. */
const MARGE = 100 / (STEPS.length * 2);

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between relative">
      {/* Track */}
      <div className="absolute top-[18px] h-0.5 bg-apple-hairline" style={{ left: `${MARGE}%`, right: `${MARGE}%` }} />
      {/* Active fill */}
      <div
        className="absolute top-[18px] h-0.5 bg-jackson-vivid transition-all duration-400 origin-left"
        style={{
          left: `${MARGE}%`,
          right: `${MARGE + (STEPS.length - currentStep) * (100 - 2 * MARGE) / (STEPS.length - 1)}%`,
        }}
      />

      {STEPS.map(step => (
        <div key={step} className="flex flex-col items-center z-10">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 border-2 ${
            step < currentStep  ? 'bg-jackson-vivid border-jackson-vivid text-white'
            : step === currentStep ? 'bg-jackson-vivid/15 border-jackson-vivid text-apple-ink'
            : 'bg-apple-parchment border-black/10 text-apple-ink-48'
          }`}>
            {step < currentStep ? <Check size={16} /> : step}
          </div>
          <span className={`text-xs mt-2 font-medium ${
            step === currentStep ? 'text-jackson-vivid'
            : step < currentStep ? 'text-jackson-vivid/70'
            : 'text-apple-ink-48'
          }`}>
            {STEP_LABELS[step]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default StepProgressBar;
