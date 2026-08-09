/**
 * Vérification exécutable de la tarification.
 * Chargée dynamiquement en dev uniquement (voir SimulateurSection), absente du bundle de prod.
 * Le projet n'a aucun runner de test — ces assertions tournent au chargement de la page.
 */
import { calculerPrime, TRANCHES, DUREES, type TypeBien, type TrancheId, type Duree } from './tarification';

const assert = (condition: boolean, message: string) => {
  if (!condition) throw new Error(`[tarification] ${message}`);
};

/** Table de vérité — primes totales attendues, par type puis par tranche, pour 3 / 6 / 12 mois. */
const ATTENDU: Record<TypeBien, Record<TrancheId, [number, number, number]>> = {
  voiture: {
    t1: [3_000, 6_000, 12_000],
    t2: [30_000, 60_000, 120_000],
    t3: [180_000, 360_000, 720_000],
  },
  maison: {
    t1: [2_250, 4_500, 9_000],
    t2: [22_500, 45_000, 90_000],
    t3: [135_000, 270_000, 540_000],
  },
  equipement: {
    t1: [1_500, 3_000, 6_000],
    t2: [15_000, 30_000, 60_000],
    t3: [90_000, 180_000, 360_000],
  },
};

export function verifierTarification(): void {
  const types = Object.keys(ATTENDU) as TypeBien[];

  for (const type of types) {
    for (const tranche of TRANCHES) {
      DUREES.forEach((duree, i) => {
        const obtenu = calculerPrime(type, tranche.id, duree);
        const attendu = ATTENDU[type][tranche.id][i];
        assert(obtenu === attendu, `${type}/${tranche.id}/${duree} mois : attendu ${attendu}, obtenu ${obtenu}`);
      });
    }

    // Linéarité en durée : pas de dégressivité, c'est voulu.
    for (const tranche of TRANCHES) {
      const base = calculerPrime(type, tranche.id, 3 as Duree);
      assert(calculerPrime(type, tranche.id, 6) === 2 * base, `${type}/${tranche.id} : 6 mois doit valoir 2× le prix de 3 mois`);
      assert(calculerPrime(type, tranche.id, 12) === 4 * base, `${type}/${tranche.id} : 12 mois doit valoir 4× le prix de 3 mois`);
    }
  }

  // Chaque valeur de référence tombe bien dans les bornes de sa tranche.
  for (const t of TRANCHES) {
    assert(t.reference >= t.min && t.reference <= t.max, `${t.id} : référence ${t.reference} hors des bornes ${t.min}–${t.max}`);
  }
}

verifierTarification();
