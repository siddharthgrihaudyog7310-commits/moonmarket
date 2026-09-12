import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Customer accounts aren't configured until these are set (see .env.example).
// Auth-dependent UI checks `isSupabaseConfigured` before rendering.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// The anon key is a public identifier, safe to ship to the browser — Row
// Level Security on each table is what actually restricts access, not this
// key. Never use the service-role key here.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
