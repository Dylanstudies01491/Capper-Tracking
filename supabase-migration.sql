
create extension if not exists pgcrypto;
create table if not exists cappers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);
create table if not exists picks (
  id uuid primary key default gen_random_uuid(),
  capper_id uuid references cappers(id) on delete cascade,
  event_date date not null,
  league text,
  description text,
  stake numeric not null default 1,
  odds numeric not null, -- decimal odds
  outcome text check (outcome in ('win','loss','push')) not null,
  result_units numeric not null, -- stored for audit; also recomputed in API
  created_at timestamptz default now()
);
create index if not exists idx_picks_capper on picks(capper_id);
create index if not exists idx_picks_date on picks(event_date);
