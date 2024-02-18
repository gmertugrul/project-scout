import { z } from "zod";

export function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const idSchema = z.object({
  id: z.coerce.number().int().nonnegative().finite(),
});

export function getFirst<T>(items: T[]): T | undefined {
  if (items.length) return items[0];
  return undefined;
}

export const currencyFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
});
