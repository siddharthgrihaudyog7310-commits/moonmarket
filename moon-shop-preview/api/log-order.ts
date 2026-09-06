import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from './_lib/supabaseAdmin';
import { resolveCartItems, CartItemInput } from './_lib/resolveCart';

interface LogOrderBody {
  items: CartItemInput[];
  customer: { name?: string; email?: string; phone?: string };
  shipping: { address?: string; city?: string; postalCode?: string };
}

// Logs a WhatsApp-handoff order for record-keeping. This must never block or
// fail the WhatsApp checkout flow, so it always responds 200 even when
// logging itself fails — the WhatsApp message is the source of truth for
// this order either way.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, customer, shipping } = req.body as LogOrderBody;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(200).json({ success: false });
      return;
    }

    const { resolvedItems, subtotal } = resolveCartItems(items);

    const { error } = await supabaseAdmin.from('orders').insert({
      status: 'pending_whatsapp',
      payment_method: 'whatsapp',
      customer_name: customer?.name,
      customer_email: customer?.email,
      customer_phone: customer?.phone,
      shipping_address: shipping?.address,
      shipping_city: shipping?.city,
      shipping_postal_code: shipping?.postalCode,
      items: resolvedItems,
      subtotal,
    });

    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('log-order failed', err);
    res.status(200).json({ success: false });
  }
}
