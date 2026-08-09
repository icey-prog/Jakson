import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Lottie from 'lottie-react';

const SOURCE = '/assets/gif/Family Insurance.json';

/** Pastille de repli : c'est ce qui s'affichait avant, et ce qui reste affiché
 *  si l'animation ne charge pas ou si l'utilisateur refuse le mouvement. */
const Pastille: React.FC = () => (
  <div className="w-16 h-16 rounded-full bg-jackson-meadow/15 border border-jackson-meadow/30 flex items-center justify-center mx-auto mb-6">
    <Check size={32} className="text-jackson-teal" />
  </div>
);

/**
 * L'animation pèse ~216 Ko. Chargée à la demande plutôt qu'importée,
 * pour ne pas la faire porter au bundle du formulaire.
 */
const ConfirmationLottie: React.FC = () => {
  const [animation, setAnimation] = useState<object | null>(null);

  const mouvementRefuse =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (mouvementRefuse) return;
    let annule = false;

    fetch(encodeURI(SOURCE))
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(data => { if (!annule) setAnimation(data); })
      .catch(() => { /* la pastille de repli reste affichée */ });

    return () => { annule = true; };
  }, [mouvementRefuse]);

  if (!animation) return <Pastille />;

  return (
    <Lottie
      animationData={animation}
      loop={false}
      autoplay
      className="w-40 h-40 mx-auto mb-2"
      aria-hidden
    />
  );
};

export default ConfirmationLottie;
