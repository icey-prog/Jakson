import React from 'react';
import { Check } from 'lucide-react';
import type { QuoteStep } from './quoteFormTypes';
import { STEP_LABELS } from './quoteFormTypes';

interface StepProgressBarProps {
  currentStep: QuoteStep;
}

const STEPS: QuoteStep[] = [1, 2, 3];

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between relative">
      {/* Track */}
      <div className="absolute top-[18px] left-[16%] right-[16%] h-0.5 bg-white/10" />
      {/* Active fill */}
      <div
        className="absolute top-[18px] left-[16%] h-0.5 bg-jackson-vivid transition-all duration-400 origin-left"
        style={{ right: `${16 + (3 - currentStep) * 34}%` }}
      />

      {STEPS.map(step => (
        <div key={step} className="flex flex-col items-center z-10">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 border-2 ${
            step < currentStep  ? 'bg-jackson-vivid border-jackson-vivid text-white'
            : step === currentStep ? 'bg-jackson-vivid/15 border-jackson-vivid text-white'
            : 'bg-white/5 border-white/20 text-white/40'
          }`}>
            {step < currentStep ? <Check size={16} /> : step}
          </div>
          <span className={`text-xs mt-2 font-medium ${
            step === currentStep ? 'text-jackson-vivid'
            : step < currentStep ? 'text-jackson-vivid/70'
            : 'text-white/40'
          }`}>
            {STEP_LABELS[step]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default StepProgressBar;
