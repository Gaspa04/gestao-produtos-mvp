-- Extensões necessárias
create extension if not exists pgcrypto;

-- Enum para status de vendas
do $$
begin
  if not exists (select 1 from pg_type where typname = 'sales_status') then
    create type sales_status as enum ('PENDING', 'DELIVERED');
  end if;
end$$;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  grams integer not null default 0 check (grams >= 0),
  manufacturing_time_minutes integer not null default 0 check (manufacturing_time_minutes >= 0),
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  price_per_kg numeric(12,2) not null default 0 check (price_per_kg >= 0),
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on update cascade on delete restrict,
  material_id uuid not null references materials(id) on update cascade on delete restrict,
  sale_price numeric(12,2) not null default 0 check (sale_price >= 0),
  shipping_qr_code text not null default '',
  status sales_status not null default 'PENDING',
  customer_name text not null default '',
  customer_cep text not null default '',
  customer_street text not null default '',
  customer_number text not null default '',
  customer_complement text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Índices
create index if not exists idx_sales_status on sales(status);
create index if not exists idx_sales_created_at on sales(created_at);
create index if not exists idx_products_name on products(name);
create index if not exists idx_materials_name on materials(name);

-- Função agregada: soma do tempo de fabricação de vendas pendentes
create or replace function pending_print_minutes()
returns integer
language sql
stable
as $$
  select coalesce(sum(p.manufacturing_time_minutes), 0)
  from sales s
  join products p on p.id = s.product_id
  where s.status = 'PENDING';
$$;

-- Desabilitar RLS para uso com anon key (MVP single-user)
alter table products disable row level security;
alter table materials disable row level security;
alter table sales disable row level security;
