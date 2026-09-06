import type { VercelRequest, VercelResponse } from '@vercel/node';
import { razorpay } from './_lib/razorpay';
import { supabaseAdmin } from './_lib/supabaseAdmin';
import { resolveCartItems, CartItemInput } from './_lib/resolveCart';

interface CreateOrderBody {
  items: CartItemInput[];
  customer: { name?: string; email?: string; phone?: string };
  shipping: { address?: string; city?: string; postalCode?: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, customer, shipping } = req.body as CreateOrderBody;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Cart is empty' });
      return;
    }

    const { resolvedItems, subtotal } = resolveCartItems(items);

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(subtotal * 100), // Razorpay expects the amount in paise.
      currency: 'INR',
      notes: { source: 'moon-shop-preview' },
    });

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        status: 'pending_payment',
        payment_method: 'razorpay',
        razorpay_order_id: razorpayOrder.id,
        customer_name: customer?.name,
        customer_email: customer?.email,
        customer_phone: customer?.phone,
        shipping_address: shipping?.address,
        shipping_city: shipping?.city,
        shipping_postal_code: shipping?.postalCode,
        items: resolvedItems,
        subtotal,
      })
      .select('id')
      .single();

    if (error) throw error;

    res.status(200).json({
      dbOrderId: data.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('create-order failed', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
