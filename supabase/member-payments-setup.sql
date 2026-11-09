create table if not exists public.member_payment_records (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete restrict,
  payment_year integer not null,
  jan numeric(10, 2) check (jan is null or jan >= 0),
  feb numeric(10, 2) check (feb is null or feb >= 0),
  mar numeric(10, 2) check (mar is null or mar >= 0),
  apr numeric(10, 2) check (apr is null or apr >= 0),
  may numeric(10, 2) check (may is null or may >= 0),
  jun numeric(10, 2) check (jun is null or jun >= 0),
  jul numeric(10, 2) check (jul is null or jul >= 0),
  aug numeric(10, 2) check (aug is null or aug >= 0),
  sep numeric(10, 2) check (sep is null or sep >= 0),
  oct numeric(10, 2) check (oct is null or oct >= 0),
  nov numeric(10, 2) check (nov is null or nov >= 0),
  dec numeric(10, 2) check (dec is null or dec >= 0),
  y_fee numeric(10, 2) check (y_fee is null or y_fee >= 0),
  created_at timestamptz not null default now(),
  constraint member_payment_records_member_year_unique
    unique (member_id, payment_year)
);

create index if not exists member_payment_records_year_idx
  on public.member_payment_records(payment_year);

grant usage on schema public to authenticated;
grant select, insert, update, delete
  on table public.member_payment_records to authenticated;

alter table public.member_payment_records enable row level security;

drop policy if exists "Active members can read payment records"
  on public.member_payment_records;
create policy "Active members can read payment records"
on public.member_payment_records
for select
to authenticated
using (
  exists (
    select 1
    from public.members as viewer
    where viewer.id = (select auth.uid())
      and viewer.status = 'active'
      and viewer.role in ('member', 'board')
  )
);

drop policy if exists "Active board members can create payment records"
  on public.member_payment_records;
create policy "Active board members can create payment records"
on public.member_payment_records
for insert
to authenticated
with check (
  exists (
    select 1
    from public.members as viewer
    where viewer.id = (select auth.uid())
      and viewer.status = 'active'
      and viewer.role = 'board'
  )
);

drop policy if exists "Active board members can update payment records"
  on public.member_payment_records;
create policy "Active board members can update payment records"
on public.member_payment_records
for update
to authenticated
using (
  exists (
    select 1
    from public.members as viewer
    where viewer.id = (select auth.uid())
      and viewer.status = 'active'
      and viewer.role = 'board'
  )
)
with check (
  exists (
    select 1
    from public.members as viewer
    where viewer.id = (select auth.uid())
      and viewer.status = 'active'
      and viewer.role = 'board'
  )
);

drop policy if exists "Active board members can delete payment records"
  on public.member_payment_records;
create policy "Active board members can delete payment records"
on public.member_payment_records
for delete
to authenticated
using (
  exists (
    select 1
    from public.members as viewer
    where viewer.id = (select auth.uid())
      and viewer.status = 'active'
      and viewer.role = 'board'
  )
);

create or replace view public.member_payment_records_view
with (security_barrier = true)
as
select
  member.id as member_id,
  member.member_number,
  member.first_name,
  member.last_name,
  payment_years.payment_year,
  payment.jan,
  payment.feb,
  payment.mar,
  payment.apr,
  payment.may,
  payment.jun,
  payment.jul,
  payment.aug,
  payment.sep,
  payment.oct,
  payment.nov,
  payment.dec,
  payment.y_fee
from public.members as member
cross join lateral generate_series(
  extract(year from current_date)::integer,
  extract(year from current_date)::integer + 4
) as payment_years(payment_year)
left join public.member_payment_records as payment
  on payment.member_id = member.id
  and payment.payment_year = payment_years.payment_year
where exists (
  select 1
  from public.members as viewer
  where viewer.id = (select auth.uid())
    and viewer.status = 'active'
    and viewer.role in ('member', 'board')
);

revoke all on public.member_payment_records_view from public, anon;
grant select on public.member_payment_records_view to authenticated;
