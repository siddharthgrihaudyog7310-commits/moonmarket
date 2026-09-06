-- Run this once in your Supabase project's SQL Editor to create the orders table.
-- (Supabase dashboard -> SQL Editor -> New query -> paste this -> Run)

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending', -- pending_payment | paid | failed | pending_whatsapp
  payment_method text not null,           -- razorpay | whatsapp
  razorpay_order_id text,
  razorpay_payment_id text,
  customer_name text,
  customer_email text,
  customer_phone text,
  shipping_address text,
  shipping_city text,
  shipping_postal_code text,
  items jsonb not null,                   -- [{ id, name, price, quantity, selectedWeight }]
  subtotal numeric not null
);

create index if not exists orders_razorpay_order_id_idx on orders (razorpay_order_id);
create index if not exists orders_created_at_idx on orders (created_at desc);

-- Row Level Security is enabled with no public policies: only the service
-- role key (used exclusively by the serverless functions in /api, never
-- shipped to the browser) can read or write this table.
alter table orders enable row level security;

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

alter table newsletter_signups enable row level security;
