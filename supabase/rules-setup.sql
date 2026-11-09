create table if not exists public.rules (
  id uuid primary key default gen_random_uuid(),
  rule_number text not null unique,
  title text not null,
  description text not null,
  category text not null check (category in ('Social', 'Regulation')),
  date_adopted date not null,
  created_at timestamptz not null default now()
);

create index if not exists rules_category_idx
  on public.rules(category);

grant usage on schema public to authenticated;
grant select on table public.rules to authenticated;
grant insert (rule_number, title, description, category, date_adopted)
  on table public.rules to authenticated;
grant update (title, description, date_adopted)
  on table public.rules to authenticated;
grant delete on table public.rules to authenticated;

alter table public.rules enable row level security;

drop policy if exists "Active members can read rules"
  on public.rules;
create policy "Active members can read rules"
on public.rules
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

drop policy if exists "Active board members can create rules"
  on public.rules;
create policy "Active board members can create rules"
on public.rules
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

drop policy if exists "Active board members can update rules"
  on public.rules;
create policy "Active board members can update rules"
on public.rules
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

drop policy if exists "Active board members can delete rules"
  on public.rules;
create policy "Active board members can delete rules"
on public.rules
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
