import { PRODUCTS } from '../../src/data';

export interface CartItemInput {
  id: string;
  selectedWeight?: string;
  quantity: number;
}

export interface ResolvedCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedWeight: string;
}

// Recomputes price and identity from the server's own product list — never
// trust price/name fields sent by the client, or a customer could pay
// whatever they want.
export function resolveCartItems(items: CartItemInput[]): { resolvedItems: ResolvedCartItem[]; subtotal: number } {
  let subtotal = 0;
  const resolvedItems = items.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    if (!product) throw new Error(`Unknown product: ${item.id}`);
    const quantity = Math.max(1, Math.floor(item.quantity) || 1);
    subtotal += product.price * quantity;
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      selectedWeight: item.selectedWeight || product.weightOptions[0],
    };
  });
  return { resolvedItems, subtotal };
}
