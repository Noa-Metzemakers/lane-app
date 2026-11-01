-- Run once in Supabase > SQL Editor. Each authenticated user sees only their own data.
create table if not exists public.lane_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  revision bigint not null default 0,
  updated_at timestamptz not null default now()
);
create index if not exists lane_user_data_user_id_idx on public.lane_user_data(user_id);
alter table public.lane_user_data enable row level security;
revoke all on public.lane_user_data from anon, authenticated;
grant select, insert, update, delete on public.lane_user_data to authenticated;
create policy "lane_read_own" on public.lane_user_data for select to authenticated using ((select auth.uid()) = user_id);
create policy "lane_create_own" on public.lane_user_data for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "lane_update_own" on public.lane_user_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "lane_delete_own" on public.lane_user_data for delete to authenticated using ((select auth.uid()) = user_id);
