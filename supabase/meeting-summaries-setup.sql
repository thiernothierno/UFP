create table if not exists public.meeting_summaries (
  id uuid primary key default gen_random_uuid(),
  summary_year integer not null check (summary_year >= 1),
  summary_month integer not null check (summary_month between 1 and 12),
  details text[] not null,
  created_at timestamptz not null default now(),
  constraint meeting_summaries_one_per_month
    unique (summary_year, summary_month)
);

grant usage on schema public to authenticated;
grant select, insert, update
  on table public.meeting_summaries to authenticated;

alter table public.meeting_summaries enable row level security;

drop policy if exists "Active members can read meeting summaries"
  on public.meeting_summaries;
create policy "Active members can read meeting summaries"
on public.meeting_summaries
for select
to authenticated
using (
  exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role in ('member', 'board')
  )
);

drop policy if exists "Active board members can create meeting summaries"
  on public.meeting_summaries;
create policy "Active board members can create meeting summaries"
on public.meeting_summaries
for insert
to authenticated
with check (
  exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role = 'board'
  )
);

drop policy if exists "Active board members can update meeting summaries"
  on public.meeting_summaries;
create policy "Active board members can update meeting summaries"
on public.meeting_summaries
for update
to authenticated
using (
  exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role = 'board'
  )
)
with check (
  exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role = 'board'
  )
);
