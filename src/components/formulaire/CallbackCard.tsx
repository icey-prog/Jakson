import React, { useState } from 'react';
import { Check, Clock, Lock, Zap, UserCheck, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const TRUST_BADGES = [
  { Icon: Lock,      label: 'Données sécurisées' },
  { Icon: Zap,       label: 'Réponse sous 24h'   },
  { Icon: UserCheck, label: 'Sans engagement'     },
  { Icon: MapPin,    label: 'Conseiller local'    },
];

/**
 * Glass posé sur le blanc de la page : la teinte vient du teal de marque,
 * pas d'un voile blanc — sur fond blanc un voile blanc ne se voit pas.
 * Le texte reste en encre sombre pour rester lisible à travers la transparence.
 */
const GLASS_STYLE: React.CSSProperties = {
  background:
    'radial-gradient(120% 120% at 15% 10%, rgba(255,255,255,0.85), transparent 55%), ' +
    'linear-gradient(180deg, rgba(240,253,250,0.75), rgba(15,118,110,0.10))',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 40px rgba(15,118,110,0.12)',
  backdropFilter: 'blur(14px) saturate(160%)',
  WebkitBackdropFilter: 'blur(14px) saturate(160%)',
};

/* ── Confirmation displayed after submission ── */
const CallbackConfirmation: React.FC = () => (
  <div className="text-center py-6">
    <div className="w-12 h-12 rounded-full bg-jackson-meadow/15 border border-jackson-meadow/40 flex items-center justify-center mx-auto mb-4">
      <Check size={24} className="text-jackson-teal" />
    </div>
    <p className="text-apple-ink font-medium">Un conseiller vous rappelle dans quelques instants.</p>
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
    <label htmlFor="rappel-telephone" className="sr-only">Votre numéro de téléphone</label>
    <input
      id="rappel-telephone"
      type="tel"
      placeholder="Votre numéro"
      value={phone}
      onChange={e => onPhoneChange(e.target.value)}
      className="w-full px-4 py-3 mb-3 rounded-btn bg-white/80 border border-jackson-teal/25 text-apple-ink placeholder:text-apple-ink-48 text-sm focus:outline-none focus:border-jackson-teal focus:shadow-[0_0_0_3px_rgba(15,118,110,0.15)] transition-all duration-150"
    />
    <button
      onClick={onSubmit}
      className="w-full px-6 py-3 bg-apple-blue hover:bg-apple-blue-focus active:scale-[0.98] text-white font-semibold rounded-btn transition-all duration-150 cursor-pointer"
    >
      Me faire rappeler
    </button>
    <div className="flex items-center justify-center gap-2 mt-4 text-apple-ink-48 text-xs">
      <Clock size={14} />
      <span>Délai moyen : 3 min</span>
    </div>
  </>
);

/* ── Trust row ── */
const TrustBadges: React.FC = () => (
  <div className="mt-5 grid grid-cols-2 gap-3">
    {TRUST_BADGES.map(({ Icon, label }) => (
      <div
        key={label}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-jackson-teal/15 bg-jackson-cream text-xs text-apple-ink-80 font-medium"
      >
        <Icon size={13} className="shrink-0 text-jackson-teal" />
        {label}
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
      <div className="relative rounded-card p-6 md:p-8 overflow-hidden border border-white/60" style={GLASS_STYLE}>
        {/* Halos teal — ils donnent au verre quelque chose à réfracter */}
        <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, rgba(44,194,149,0.35), transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -bottom-8 -left-8 w-[160px] h-[160px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.28), transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10">
          <h3 className="font-display text-xl md:text-2xl font-bold text-apple-ink mb-3">
            Vous préférez être rappelé ?
          </h3>
          <p className="text-[15px] text-apple-ink-80 leading-relaxed mb-6">
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
