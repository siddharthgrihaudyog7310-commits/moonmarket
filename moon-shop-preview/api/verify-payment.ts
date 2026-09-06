import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { supabaseAdmin } from './_lib/supabaseAdmin';

interface VerifyPaymentBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as VerifyPaymentBody;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ error: 'Missing payment details' });
      return;
    }

    // The only trustworthy way to know a payment really succeeded: recompute
    // this HMAC ourselves and compare, rather than believing the client.
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      await supabaseAdmin.from('orders').update({ status: 'failed' }).eq('razorpay_order_id', razorpay_order_id);
      res.status(400).json({ error: 'Invalid payment signature' });
      return;
    }

    const { error } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid', razorpay_payment_id })
      .eq('razorpay_order_id', razorpay_order_id);

    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('verify-payment failed', err);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}
