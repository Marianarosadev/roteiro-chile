import { CurrencyType } from '../types/itinerary';

/**
 * Formats a monetary value in BRL or CLP.
 */
export function formatCurrency(value: number, currency: CurrencyType): string {
  if (value === 0 || value === null || value === undefined) {
    return currency === 'BRL' ? 'R$ 0,00' : '$0 CLP';
  }

  if (currency === 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  // CLP formatting
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value) + ' CLP';
}

/**
 * Normalizes category text strings to standard category keys.
 */
export function normalizeCategory(categoryStr: string): string {
  if (!categoryStr) return 'Outros';
  const lower = categoryStr.toLowerCase().trim();

  if (lower.includes('logística') || lower.includes('logistica')) return 'Logística';
  if (lower.includes('transporte')) return 'Transporte';
  if (lower.includes('alimentação') || lower.includes('alimentacao')) return 'Alimentação';
  if (lower.includes('compras')) return 'Compras';
  if (lower.includes('lazer') || lower.includes('atração') || lower.includes('atracao')) return 'Lazer';
  if (lower.includes('preparação') || lower.includes('preparacao') || lower.includes('atividade')) return 'Preparação';

  return 'Outros';
}
