create table if not exists public.withdrawals (
  id uuid primary key default gen_random_uuid(),
  withdrawal_date date not null,
  receiver text not null,
  reason text not null,
  amount numeric(12, 2) not null check (amount > 0),
  created_by uuid references public.members(id),
  created_at timestamptz not null default now()
);

create index if not exists withdrawals_withdrawal_date_idx
  on public.withdrawals(withdrawal_date desc);

grant usage on schema public to authenticated;
grant select, insert, update, delete
  on table public.withdrawals to authenticated;

alter table public.withdrawals enable row level security;

drop policy if exists "Active members can read withdrawals"
  on public.withdrawals;
create policy "Active members can read withdrawals"
on public.withdrawals
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

drop policy if exists "Active board members can create withdrawals"
  on public.withdrawals;
create policy "Active board members can create withdrawals"
on public.withdrawals
for insert
to authenticated
with check (
  created_by = (select auth.uid())
  and exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role = 'board'
  )
);

drop policy if exists "Active board members can update withdrawals"
  on public.withdrawals;
create policy "Active board members can update withdrawals"
on public.withdrawals
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

drop policy if exists "Active board members can delete withdrawals"
  on public.withdrawals;
create policy "Active board members can delete withdrawals"
on public.withdrawals
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
