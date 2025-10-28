-- Ensure required extensions
create extension if not exists pgcrypto;

-- Utility: updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Portfolio items
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.portfolio_items enable row level security;
do $$ begin
  create policy "portfolio_items_select_public" on public.portfolio_items for select using (true);
  create policy "portfolio_items_insert_public" on public.portfolio_items for insert with check (true);
  create policy "portfolio_items_update_public" on public.portfolio_items for update using (true) with check (true);
  create policy "portfolio_items_delete_public" on public.portfolio_items for delete using (true);
exception when duplicate_object then null; end $$;
create or replace trigger portfolio_items_updated_at before update on public.portfolio_items
for each row execute function public.handle_updated_at();

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) default 0,
  is_available boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
do $$ begin
  create policy "products_select_public" on public.products for select using (true);
  create policy "products_insert_public" on public.products for insert with check (true);
  create policy "products_update_public" on public.products for update using (true) with check (true);
  create policy "products_delete_public" on public.products for delete using (true);
exception when duplicate_object then null; end $$;
create or replace trigger products_updated_at before update on public.products
for each row execute function public.handle_updated_at();

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text,
  content text,
  rating int check (rating between 1 and 5),
  is_approved boolean not null default false,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
do $$ begin
  create policy "reviews_select_public" on public.reviews for select using (true);
  create policy "reviews_insert_public" on public.reviews for insert with check (true);
  create policy "reviews_update_public" on public.reviews for update using (true) with check (true);
  create policy "reviews_delete_public" on public.reviews for delete using (true);
exception when duplicate_object then null; end $$;
create or replace trigger reviews_updated_at before update on public.reviews
for each row execute function public.handle_updated_at();

-- News
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  is_published boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.news enable row level security;
do $$ begin
  create policy "news_select_public" on public.news for select using (true);
  create policy "news_insert_public" on public.news for insert with check (true);
  create policy "news_update_public" on public.news for update using (true) with check (true);
  create policy "news_delete_public" on public.news for delete using (true);
exception when duplicate_object then null; end $$;
create or replace trigger news_updated_at before update on public.news
for each row execute function public.handle_updated_at();

-- Contact messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
do $$ begin
  create policy "contact_messages_select_public" on public.contact_messages for select using (true);
  create policy "contact_messages_insert_public" on public.contact_messages for insert with check (true);
  create policy "contact_messages_update_public" on public.contact_messages for update using (true) with check (true);
  create policy "contact_messages_delete_public" on public.contact_messages for delete using (true);
exception when duplicate_object then null; end $$;
create or replace trigger contact_messages_updated_at before update on public.contact_messages
for each row execute function public.handle_updated_at();

-- AI messages
create table if not exists public.ai_messages (
  id bigint generated always as identity primary key,
  session_id text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.ai_messages enable row level security;
do $$ begin
  create policy "ai_messages_insert_public" on public.ai_messages for insert with check (true);
exception when duplicate_object then null; end $$;

-- Storage bucket for images (guarded: only if storage extension exists)
do $$
begin
  -- Check for storage schema
  if exists (select 1 from pg_namespace where nspname = 'storage') then
    -- Try creating bucket if function exists
    if exists (
      select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'storage' and p.proname = 'create_bucket'
    ) then
      -- Use positional args to avoid named-arg mismatch across versions
      perform storage.create_bucket('images', true);
    end if;

    -- Storage policies for images bucket (only if objects table exists)
    if exists (
      select 1
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'storage' and c.relname = 'objects'
    ) then
      begin
        create policy if not exists "images_select_public"
          on storage.objects
          for select
          using (bucket_id = 'images');
      exception when undefined_table then null; end;

      begin
        create policy if not exists "images_insert_public"
          on storage.objects
          for insert
          with check (bucket_id = 'images');
      exception when undefined_table then null; end;

      begin
        create policy if not exists "images_update_public"
          on storage.objects
          for update
          using (bucket_id = 'images')
          with check (bucket_id = 'images');
      exception when undefined_table then null; end;

      begin
        create policy if not exists "images_delete_public"
          on storage.objects
          for delete
          using (bucket_id = 'images');
      exception when undefined_table then null; end;
    end if;
  end if;
end; $$;