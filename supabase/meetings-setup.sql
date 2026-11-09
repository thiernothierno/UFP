create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  meeting_date date not null,
  start_time time not null,
  location text not null,
  details text[] not null,
  created_at timestamptz not null default now()
);

create unique index if not exists meetings_one_per_month_idx
  on public.meetings (date_trunc('month', meeting_date::timestamp));

grant usage on schema public to authenticated;
grant select, insert, update, delete
  on table public.meetings to authenticated;

alter table public.meetings enable row level security;

drop policy if exists "Active members can read meetings"
  on public.meetings;
create policy "Active members can read meetings"
on public.meetings
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

drop policy if exists "Active board members can create meetings"
  on public.meetings;
create policy "Active board members can create meetings"
on public.meetings
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

drop policy if exists "Active board members can update meetings"
  on public.meetings;
create policy "Active board members can update meetings"
on public.meetings
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

drop policy if exists "Active board members can delete meetings"
  on public.meetings;
create policy "Active board members can delete meetings"
on public.meetings
for delete
to authenticated
using (
  exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role = 'board'
  )
);
