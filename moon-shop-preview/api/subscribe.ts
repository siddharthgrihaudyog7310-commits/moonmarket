import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from './_lib/supabaseAdmin';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email } = req.body as { email?: string };

    if (!email || !EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    // Duplicate signups are fine — treat as success rather than surfacing a
    // confusing "already subscribed" error to the customer.
    const { error } = await supabaseAdmin.from('newsletter_signups').upsert({ email: email.toLowerCase().trim() }, { onConflict: 'email' });

    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('subscribe failed', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
