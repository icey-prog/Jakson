import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import gsap from 'gsap';

type Step = 1 | 2 | 3;

interface FormData {
  nom: string;
  prenom: string;
  age: string;
  typeAssurance: string;
  niveauGarantie: number;
  telephone: string;
  email: string;
  optin: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const insuranceTypes = ['Auto', 'Moto', 'Habitation', 'Voyage'];
const garantieLabels = ['Essentiel (budget maîtrisé)', 'Confort (équilibré)', 'Premium (protection maximale)'];

/* ─────────────────────────────────────────────
   Aurora canvas hook
───────────────────────────────────────────── */
function useAuroraCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    function animate() {
      if (!canvas || !ctx) return;
      const { width, height } = canvas;
      time += 0.0015;

      // Base: très noir avec teinte teal — cohérent avec jackson-night
      ctx.fillStyle = '#020d0b';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      const numFolds = 28;
      for (let i = 0; i < numFolds; i++) {
        const normalizedX = i / numFolds;
        const xPos = normalizedX * width + Math.sin(time * 2 + i) * (width * 0.05);
        const foldWidth = (width / numFolds) * 3;

        const baseIntensity = Math.sin(normalizedX * Math.PI) * 0.6 + 0.4;
        const waveIntensity = (Math.sin(time * 3 + i * 0.4) + 1) * 0.5;
        const gradientBoost = normalizedX * 0.5 + 0.5;
        const fi = baseIntensity * waveIntensity * gradientBoost;

        // Palette brand: noir teal → jackson-deep #0F766E → jackson-vivid #14B8A6
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0,   `rgba(2,13,10,0)`);
        grad.addColorStop(0.3, `rgba(4,45,38,${fi * 0.22})`);
        grad.addColorStop(0.65,`rgba(15,118,110,${fi * 0.52})`);
        grad.addColorStop(1,   `rgba(20,184,166,${fi * 0.88})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.rect(xPos - foldWidth / 2, 0, foldWidth, height);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      // Radial accent teal bas-droit
      const radial = ctx.createRadialGradient(width * 0.8, height, 0, width * 0.8, height, height * 0.8);
      radial.addColorStop(0, 'rgba(20,184,166,0.18)');
      radial.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const FormulaireSection: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    age: '',
    typeAssurance: '',
    niveauGarantie: 2,
    telephone: '',
    email: '',
    optin: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callBackPhone, setCallBackPhone] = useState('');
  const [callBackSubmitted, setCallBackSubmitted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAuroraCanvas(canvasRef);

  const validateStep = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
      if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
      if (!formData.age || parseInt(formData.age) < 18) newErrors.age = 'Âge minimum 18 ans';
    } else if (step === 2) {
      if (!formData.typeAssurance) newErrors.typeAssurance = "Sélectionnez un type d'assurance";
    } else if (step === 3) {
      if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Email invalide';
      if (!formData.optin) newErrors.optin = 'Veuillez accepter les conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, formData]);

  const animateTransition = useCallback((direction: 'next' | 'prev', callback: () => void) => {
    if (!contentRef.current) { callback(); return; }
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0, x: direction === 'next' ? -20 : 20, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          callback();
          gsap.fromTo(contentRef.current,
            { opacity: 0, x: direction === 'next' ? 20 : -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 }
          );
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const goNext = () => {
    if (!validateStep()) return;
    if (step < 3) animateTransition('next', () => setStep(prev => (prev + 1) as Step));
  };
  const goBack = () => {
    if (step > 1) animateTransition('prev', () => setStep(prev => (prev - 1) as Step));
  };
  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };
  const handleCallBack = async () => {
    if (!callBackPhone.trim()) return;
    await new Promise(r => setTimeout(r, 800));
    setCallBackSubmitted(true);
  };
  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  /* Input style — white background with dark text to avoid unreadable autofill and ensure high contrast */
  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-btn border text-sm text-gray-900 bg-white placeholder:text-gray-400
     transition-all duration-200 focus:outline-none focus:border-jackson-vivid focus:shadow-[0_0_0_3px_rgba(20,184,166,0.2)]
     ${errors[field] ? 'border-red-500 bg-red-50' : formData[field as keyof FormData] ? 'border-green-500 bg-green-50' : 'border-gray-200'}
     ${errors[field] ? 'animate-shake' : ''}`;

  return (
    <section
      id="formulaire"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: '#020d0b' }}
    >
      {/* Aurora canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-75"
      />

      {/* Brand tint left — renforce le vert jackson */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 8% 55%, rgba(15,118,110,0.22), transparent)' }} />
      {/* Accent vivid haut-centre */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 50% 0%, rgba(20,184,166,0.07), transparent)' }} />

      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Form column ── */}
          <div className="lg:col-span-3">
            <ScrollReveal className="mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/15 text-white/80 mb-4">
                Devis Express
              </span>
              <TextReveal text="Obtenez Votre Devis Gratuit" className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" as="h2" />
              <p className="text-base text-white/60 max-w-md leading-relaxed">
                Remplissez ce formulaire en 2 minutes et recevez votre devis personnalisé sous 24h.
              </p>
            </ScrollReveal>

            {submitted ? (
              <ScrollReveal className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-jackson-vivid/20 border border-jackson-vivid/30 flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-jackson-vivid" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  Merci ! Votre demande a bien été envoyée.
                </h3>
                <p className="text-base text-white/60">
                  Un conseiller vous contactera sous 24h avec votre devis personnalisé.
                </p>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-[18px] left-[16%] right-[16%] h-0.5 bg-white/10" />
                    <div
                      className="absolute top-[18px] left-[16%] h-0.5 bg-jackson-vivid transition-all duration-400 origin-left"
                      style={{ right: `${16 + (3 - step) * 34}%` }}
                    />
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex flex-col items-center z-10">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 border-2 ${
                          s < step
                            ? 'bg-jackson-vivid border-jackson-vivid text-white'
                            : s === step
                              ? 'bg-jackson-vivid/15 border-jackson-vivid text-white'
                              : 'bg-white/5 border-white/20 text-white/40'
                        }`}>
                          {s < step ? <Check size={16} /> : s}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${
                          s === step ? 'text-jackson-vivid' : s < step ? 'text-jackson-vivid/70' : 'text-white/40'
                        }`}>
                          {s === 1 ? 'Votre profil' : s === 2 ? 'Vos besoins' : 'Contact'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form content */}
                <div ref={contentRef}>

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-5">
                      {(['nom', 'prenom'] as const).map(field => (
                        <div key={field} className="relative">
                          <label className="block text-sm font-medium text-white/90 mb-1.5">
                            {field === 'nom' ? 'Nom' : 'Prénom'} <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder={field === 'nom' ? 'Ex: Dupont' : 'Ex: Jean'}
                              value={formData[field]}
                              onChange={e => updateField(field, e.target.value)}
                              className={inputClass(field)}
                            />
                            {formData[field] && !errors[field] && (
                              <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
                            )}
                          </div>
                          {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field]}</p>}
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
                            onChange={e => updateField('age', e.target.value)}
                            className={`${inputClass('age')} w-full pr-10`}
                          />
                          {formData.age && !errors.age && (
                            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
                          )}
                        </div>
                        {errors.age && <p className="text-xs text-red-400 mt-1">{errors.age}</p>}
                      </div>
                      <div className="flex justify-end pt-2">
                        <button onClick={goNext}
                          className="px-7 py-3 bg-jackson-deep hover:bg-jackson-vivid text-white font-semibold rounded-btn transition-all duration-250 flex items-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(0,180,255,0.2)]">
                          Continuer <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-3">
                          Type d&apos;assurance <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {insuranceTypes.map(type => (
                            <button key={type} onClick={() => updateField('typeAssurance', type)}
                              className={`relative p-4 rounded-btn border-2 text-center font-medium transition-all duration-200 cursor-pointer ${
                                formData.typeAssurance === type
                                  ? 'border-jackson-vivid bg-jackson-vivid/15 text-white shadow-[0_0_20px_rgba(0,180,255,0.15)]'
                                  : 'border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/90'
                              }`}>
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
                        <input type="range" min="1" max="3" step="1"
                          value={formData.niveauGarantie}
                          onChange={e => updateField('niveauGarantie', parseInt(e.target.value))}
                          className="w-full accent-jackson-vivid"
                        />
                        <p className="text-sm text-jackson-vivid font-medium mt-2">
                          {garantieLabels[formData.niveauGarantie - 1]}
                        </p>
                      </div>
                      <div className="flex justify-between pt-2">
                        <button onClick={goBack}
                          className="px-4 py-3 text-white/50 font-medium hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                          <ArrowLeft size={16} /> Retour
                        </button>
                        <button onClick={goNext}
                          className="px-7 py-3 bg-jackson-deep hover:bg-jackson-vivid text-white font-semibold rounded-btn transition-all duration-250 flex items-center gap-2 cursor-pointer shadow-[0_8px_24px_rgba(0,180,255,0.2)]">
                          Continuer <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1.5">
                          Téléphone <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input type="tel" placeholder="Ex: +226 70 00 00 00"
                            value={formData.telephone}
                            onChange={e => updateField('telephone', e.target.value)}
                            className={inputClass('telephone')}
                          />
                          {formData.telephone && !errors.telephone && (
                            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
                          )}
                        </div>
                        <p className="text-[11px] text-white/40 mt-1">Format attendu: +226 ou numéro local</p>
                        {errors.telephone && <p className="text-xs text-red-400 mt-1">{errors.telephone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1.5">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input type="email" placeholder="Ex: jean.dupont@email.com"
                            value={formData.email}
                            onChange={e => updateField('email', e.target.value)}
                            className={inputClass('email')}
                          />
                          {formData.email && !errors.email && (
                            <Check size={16} className="absolute right-3 top-3.5 text-green-500" />
                          )}
                        </div>
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                      <div className="flex items-start gap-3">
                        <button onClick={() => updateField('optin', !formData.optin)}
                          className={`mt-0.5 w-[18px] h-[18px] rounded-sm border-2 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                            formData.optin ? 'bg-jackson-vivid border-jackson-vivid' : 'border-white/25 bg-white/5'
                          }`}>
                          {formData.optin && <Check size={12} className="text-white" />}
                        </button>
                        <span className="text-[13px] text-white/50 leading-relaxed">
                          J&apos;accepte de recevoir mon devis et d&apos;être contacté par un conseiller Jackson Assurances.
                        </span>
                      </div>
                      {errors.optin && <p className="text-xs text-red-400">{errors.optin}</p>}
                      <div className="flex justify-between pt-2">
                        <button onClick={goBack}
                          className="px-4 py-3 text-white/50 font-medium hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                          <ArrowLeft size={16} /> Retour
                        </button>
                        <button onClick={handleSubmit} disabled={loading}
                          className="px-8 py-3.5 bg-jackson-deep hover:bg-jackson-vivid text-white font-semibold rounded-btn transition-all duration-250 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-[0_8px_32px_rgba(0,180,255,0.25)]">
                          {loading
                            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : 'Recevoir mon devis gratuit'
                          }
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── Callback card ── */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={200}>
              {/* Glass card */}
              <div
                className="relative rounded-card p-6 md:p-8 overflow-hidden border border-white/10"
                style={{
                  background: 'radial-gradient(140% 140% at 20% 20%, rgba(255,255,255,0.07), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Glow orb */}
                <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full pointer-events-none animate-float"
                  style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.2), transparent 70%)', filter: 'blur(50px)' }} />
                {/* Green brand orb */}
                <div className="absolute -bottom-8 -left-8 w-[160px] h-[160px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.25), transparent 70%)', filter: 'blur(40px)' }} />

                <div className="relative z-10">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                    Vous préférez être rappelé ?
                  </h3>
                  <p className="text-[15px] text-white/65 leading-relaxed mb-6">
                    Laissez-nous votre numéro — un conseiller vous rappelle en moins de 5 minutes.
                  </p>

                  {callBackSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 rounded-full bg-jackson-vivid/20 border border-jackson-vivid/30 flex items-center justify-center mx-auto mb-4">
                        <Check size={24} className="text-jackson-vivid" />
                      </div>
                      <p className="text-white font-medium">Un conseiller vous rappelle dans quelques instants.</p>
                    </div>
                  ) : (
                    <>
                      <input type="tel" placeholder="Votre numéro"
                        value={callBackPhone}
                        onChange={e => setCallBackPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-btn bg-white/8 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors mb-3"
                      />
                      <button onClick={handleCallBack}
                        className="w-full px-6 py-3 bg-white text-jackson-deep font-semibold rounded-btn hover:bg-white/90 transition-all duration-250 cursor-pointer shadow-[0_8px_24px_rgba(255,255,255,0.12)]">
                        Me faire rappeler
                      </button>
                      <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
                        <Clock size={14} />
                        <span>Délai moyen : 3 min</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: '🔒', label: 'Données sécurisées' },
                  { icon: '⚡', label: 'Réponse sous 24h' },
                  { icon: '🤝', label: 'Sans engagement' },
                  { icon: '🇧🇫', label: 'Conseiller local' },
                ].map(({ icon, label }) => (
                  <div key={label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white/55 font-medium">
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FormulaireSection;
