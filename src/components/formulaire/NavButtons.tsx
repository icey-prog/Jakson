/* Shared nav buttons reused across all form steps */
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const NextButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-7 py-3 bg-jackson-deep hover:bg-jackson-vivid text-white font-semibold rounded-btn transition-all duration-250 flex items-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(20,184,166,0.2)]"
  >
    Continuer <ArrowRight size={16} />
  </button>
);

export const BackButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-3 text-white/50 font-medium hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
  >
    <ArrowLeft size={16} /> Retour
  </button>
);

export default NextButton;
