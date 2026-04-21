import React, { useState } from 'react';
import { Check, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const TRUST_BADGES = [
  { icon: '🔒', label: 'Données sécurisées' },
  { icon: '⚡', label: 'Réponse sous 24h' },
  { icon: '🤝', label: 'Sans engagement' },
  { icon: '🇧🇫', label: 'Conseiller local' },
] as const;

const GLASS_STYLE: React.CSSProperties = {
  background: 'radial-gradient(140% 140% at 20% 20%, rgba(255,255,255,0.07), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.4)',
  backdropFilter: 'blur(12px)',
};

/* ── Confirmation displayed after submission ── */
const CallbackConfirmation: React.FC = () => (
  <div className="text-center py-6">
    <div className="w-12 h-12 rounded-full bg-jackson-vivid/20 border border-jackson-vivid/30 flex items-center justify-center mx-auto mb-4">
      <Check size={24} className="text-jackson-vivid" />
    </div>
    <p className="text-white font-medium">Un conseiller vous rappelle dans quelques instants.</p>
  </div>
);

/* ── Input + submit form ── */
interface CallbackFormProps {
  phone: string;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
}

const CallbackForm: React.FC<CallbackFormProps> = ({ phone, onPhoneChange, onSubmit }) => (
  <>
    <input
      type="tel"
      placeholder="Votre numéro"
      value={phone}
      onChange={e => onPhoneChange(e.target.value)}
      className="w-full px-4 py-3 rounded-btn bg-white/8 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors mb-3"
    />
    <button
      onClick={onSubmit}
      className="w-full px-6 py-3 bg-white text-jackson-deep font-semibold rounded-btn hover:bg-white/90 transition-all duration-250 cursor-pointer shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
    >
      Me faire rappeler
    </button>
    <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
      <Clock size={14} />
      <span>Délai moyen : 3 min</span>
    </div>
  </>
);

/* ── Trust row ── */
const TrustBadges: React.FC = () => (
  <div className="mt-5 grid grid-cols-2 gap-3">
    {TRUST_BADGES.map(({ icon, label }) => (
      <div key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white/55 font-medium">
        <span>{icon}</span> {label}
      </div>
    ))}
  </div>
);

/* ── Public component ── */
const CallbackCard: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!phone.trim()) return;
    // TODO: replace with real API call to Jackson CRM
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <ScrollReveal delay={200}>
      <div className="relative rounded-card p-6 md:p-8 overflow-hidden border border-white/10" style={GLASS_STYLE}>
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2), transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -bottom-8 -left-8 w-[160px] h-[160px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.25), transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
            Vous préférez être rappelé ?
          </h3>
          <p className="text-[15px] text-white/65 leading-relaxed mb-6">
            Laissez-nous votre numéro — un conseiller vous rappelle en moins de 5 minutes.
          </p>

          {submitted
            ? <CallbackConfirmation />
            : <CallbackForm phone={phone} onPhoneChange={setPhone} onSubmit={handleSubmit} />
          }
        </div>
      </div>

      <TrustBadges />
    </ScrollReveal>
  );
};

export default CallbackCard;
