-- Create table for AI chat messages
create table if not exists public.ai_messages (
  id bigint generated always as identity primary key,
  session_id text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.ai_messages enable row level security;

-- Allow anonymous and authenticated clients to insert messages
create policy ai_messages_insert_policy on public.ai_messages
  for insert
  to anon, authenticated
  with check (true);

-- (Optional) No select policy => clients cannot read messages by default
-- You can add admin-only access via service role or future policies.