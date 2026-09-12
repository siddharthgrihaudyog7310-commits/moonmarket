-- Run this once in your Supabase project's SQL Editor to create the orders table.
-- (Supabase dashboard -> SQL Editor -> New query -> paste this -> Run)

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending', -- pending_payment | paid | failed | pending_whatsapp | pending_upi_verification
  payment_method text not null,           -- razorpay | whatsapp | upi_manual
  razorpay_order_id text,
  razorpay_payment_id text,
  upi_reference text,                     -- customer-entered UTR/reference for a direct UPI payment (self-reported, unverified)
  user_id uuid references auth.users(id), -- set when the customer was logged in at checkout; null for guest orders
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
create index if not exists orders_user_id_idx on orders (user_id);

-- If your orders table already exists from before, run these to add the new columns:
-- alter table orders add column if not exists upi_reference text;
-- alter table orders add column if not exists user_id uuid references auth.users(id);
-- create index if not exists orders_user_id_idx on orders (user_id);

-- Row Level Security: writes stay restricted to the service role key (used
-- exclusively by the serverless functions in /api, never shipped to the
-- browser). The one public policy lets a logged-in customer read (never
-- write) their own order history directly from the browser.
alter table orders enable row level security;

drop policy if exists "Customers can view their own orders" on orders;
create policy "Customers can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

alter table newsletter_signups enable row level security;

-- Customer account profile: saved shipping details, one row per auth user.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  updated_at timestamptz not null default now(),
  full_name text,
  phone text,
  address text,
  city text,
  postal_code text
);

alter table profiles enable row level security;

drop policy if exists "Customers can view their own profile" on profiles;
create policy "Customers can view their own profile"
  on profiles for select
  using (auth.uid() = id);

drop policy if exists "Customers can insert their own profile" on profiles;
create policy "Customers can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Customers can update their own profile" on profiles;
create policy "Customers can update their own profile"
  on profiles for update
  using (auth.uid() = id);
