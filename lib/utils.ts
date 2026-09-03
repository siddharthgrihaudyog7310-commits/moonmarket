export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Computes a "₹X / 100g" style unit-price note from a pack like "250g" or "500g". */
export function pricePerHundredGrams(weight: string, price: number): string | null {
  const match = weight.match(/^(\d+(?:\.\d+)?)\s*(g|kg)$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const grams = match[2].toLowerCase() === "kg" ? value * 1000 : value;
  if (!grams) return null;

  const perHundred = (price / grams) * 100;
  return `${formatPrice(perHundred)} / 100g`;
}
