import React, { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';

const emergencyNumbers = [
  { label: 'Sinistre 24/7', number: '01 99 88 77 66' },
  { label: 'Assistance', number: '01 23 45 67 89' },
  { label: 'Urgence médicale', number: '15' },
];

const SOSButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] transition-transform duration-500 ${
        visible ? 'scale-100' : 'scale-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      {/* Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-jackson-night rounded-card shadow-card-hover p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <h4 className="text-sm font-semibold text-jackson-night dark:text-white mb-3">
            Assistance d&apos;urgence
          </h4>
          <div className="space-y-2">
            {emergencyNumbers.map((item) => (
              <a
                key={item.label}
                href={`tel:${item.number.replace(/\s/g, '')}`}
                className="flex items-center justify-between p-3 rounded-btn bg-jackson-cream/50 dark:bg-slate-800 hover:bg-jackson-light/30 dark:hover:bg-slate-700 transition-colors"
              >
                <div>
                  <p className="text-xs text-jackson-slate dark:text-white/60">{item.label}</p>
                  <p className="text-sm font-semibold text-jackson-deep dark:text-jackson-vivid">{item.number}</p>
                </div>
                <Phone size={14} className="text-jackson-vivid" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-[56px] md:h-[56px] rounded-full bg-jackson-vivid text-white flex items-center justify-center shadow-float animate-sos-pulse hover:bg-emerald-500 transition-colors"
        aria-label="Assistance urgente"
      >
        {isOpen ? <X size={24} /> : <Phone size={24} />}
      </button>
    </div>
  );
};

export default SOSButton;
