/**
 * Tarification du simulateur de devis.
 *
 * Règle unique :   prime = coefficient(type) × (valeur de référence / 6) × durée en mois
 *
 * La prime est linéaire en durée : 12 mois coûte exactement 4× le prix de 3 mois.
 * Aucune dégressivité — décision métier actée, voir docs/superpowers/specs/.
 */

export type TypeBien = 'voiture' | 'maison' | 'equipement';
export type TrancheId = 't1' | 't2' | 't3';
export type Duree = 3 | 6 | 12;

/** Coefficient de risque par type de bien. Seul endroit où ces valeurs vivent. */
export const COEFFICIENTS: Record<TypeBien, number> = {
  voiture: 0.12,
  maison: 0.09,
  equipement: 0.06,
};

export interface Tranche {
  id: TrancheId;
  label: string;
  /** Valeur ronde à l'intérieur de la tranche, utilisée dans le calcul. */
  reference: number;
  min: number;
  max: number;
}

export const TRANCHES: Tranche[] = [
  { id: 't1', label: '100 – 100 000', reference: 50_000, min: 100, max: 100_000 },
  { id: 't2', label: '100 001 – 1 000 000', reference: 500_000, min: 100_001, max: 1_000_000 },
  { id: 't3', label: '1 000 001 – 5 000 000', reference: 3_000_000, min: 1_000_001, max: 5_000_000 },
];

export const DUREES: Duree[] = [3, 6, 12];

export const getTranche = (id: TrancheId): Tranche =>
  TRANCHES.find(t => t.id === id) ?? TRANCHES[0];

/** Prime totale du contrat, en FCFA, arrondie à l'entier. */
export function calculerPrime(type: TypeBien, trancheId: TrancheId, duree: Duree): number {
  return Math.round(COEFFICIENTS[type] * (getTranche(trancheId).reference / 6) * duree);
}

/** Espace insécable comme séparateur de milliers, comme le reste du site. */
const NBSP = ' ';

export const formatNombre = (n: number): string =>
  n.toLocaleString('fr-FR').replace(/\s/gu, NBSP);

export const formatFCFA = (n: number): string => `${formatNombre(n)}${NBSP}FCFA`;

/** Le calcul montré à nu dans le panneau résultat — argument de transparence. */
export const formuleLisible = (type: TypeBien, trancheId: TrancheId, duree: Duree): string =>
  `${String(COEFFICIENTS[type]).replace('.', ',')} × (${formatNombre(getTranche(trancheId).reference)} / 6) × ${duree}`;
