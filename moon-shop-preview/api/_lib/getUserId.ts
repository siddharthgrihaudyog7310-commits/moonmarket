import type { VercelRequest } from '@vercel/node';
import { supabaseAdmin } from './supabaseAdmin';

// Verifies the customer's Supabase access token (if any was sent) and
// returns their real user id — never trust a client-supplied id directly,
// since anyone could claim to be another customer.
export async function getUserId(req: VercelRequest): Promise<string | undefined> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return undefined;

  const token = authHeader.slice('Bearer '.length);
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return undefined;
  return data.user.id;
}
