create table if not exists public.member_infraction_records (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete restrict,
  infraction_year integer not null,
  jan_msg numeric(10, 2) check (jan_msg is null or jan_msg >= 0),
  jan_late numeric(10, 2) check (jan_late is null or jan_late >= 0),
  jan_absence numeric(10, 2) check (jan_absence is null or jan_absence >= 0),
  feb_msg numeric(10, 2) check (feb_msg is null or feb_msg >= 0),
  feb_late numeric(10, 2) check (feb_late is null or feb_late >= 0),
  feb_absence numeric(10, 2) check (feb_absence is null or feb_absence >= 0),
  mar_msg numeric(10, 2) check (mar_msg is null or mar_msg >= 0),
  mar_late numeric(10, 2) check (mar_late is null or mar_late >= 0),
  mar_absence numeric(10, 2) check (mar_absence is null or mar_absence >= 0),
  apr_msg numeric(10, 2) check (apr_msg is null or apr_msg >= 0),
  apr_late numeric(10, 2) check (apr_late is null or apr_late >= 0),
  apr_absence numeric(10, 2) check (apr_absence is null or apr_absence >= 0),
  may_msg numeric(10, 2) check (may_msg is null or may_msg >= 0),
  may_late numeric(10, 2) check (may_late is null or may_late >= 0),
  may_absence numeric(10, 2) check (may_absence is null or may_absence >= 0),
  jun_msg numeric(10, 2) check (jun_msg is null or jun_msg >= 0),
  jun_late numeric(10, 2) check (jun_late is null or jun_late >= 0),
  jun_absence numeric(10, 2) check (jun_absence is null or jun_absence >= 0),
  jul_msg numeric(10, 2) check (jul_msg is null or jul_msg >= 0),
  jul_late numeric(10, 2) check (jul_late is null or jul_late >= 0),
  jul_absence numeric(10, 2) check (jul_absence is null or jul_absence >= 0),
  aug_msg numeric(10, 2) check (aug_msg is null or aug_msg >= 0),
  aug_late numeric(10, 2) check (aug_late is null or aug_late >= 0),
  aug_absence numeric(10, 2) check (aug_absence is null or aug_absence >= 0),
  sep_msg numeric(10, 2) check (sep_msg is null or sep_msg >= 0),
  sep_late numeric(10, 2) check (sep_late is null or sep_late >= 0),
  sep_absence numeric(10, 2) check (sep_absence is null or sep_absence >= 0),
  oct_msg numeric(10, 2) check (oct_msg is null or oct_msg >= 0),
  oct_late numeric(10, 2) check (oct_late is null or oct_late >= 0),
  oct_absence numeric(10, 2) check (oct_absence is null or oct_absence >= 0),
  nov_msg numeric(10, 2) check (nov_msg is null or nov_msg >= 0),
  nov_late numeric(10, 2) check (nov_late is null or nov_late >= 0),
  nov_absence numeric(10, 2) check (nov_absence is null or nov_absence >= 0),
  dec_msg numeric(10, 2) check (dec_msg is null or dec_msg >= 0),
  dec_late numeric(10, 2) check (dec_late is null or dec_late >= 0),
  dec_absence numeric(10, 2) check (dec_absence is null or dec_absence >= 0),
  created_at timestamptz not null default now(),
  constraint member_infraction_records_member_year_unique
    unique (member_id, infraction_year)
);

create index if not exists member_infraction_records_year_idx
  on public.member_infraction_records(infraction_year);

grant usage on schema public to authenticated;
grant select, insert, update, delete
  on table public.member_infraction_records to authenticated;

alter table public.member_infraction_records enable row level security;

drop policy if exists "Active members can read infraction records"
  on public.member_infraction_records;
create policy "Active members can read infraction records"
on public.member_infraction_records
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

drop policy if exists "Active board members can create infraction records"
  on public.member_infraction_records;
create policy "Active board members can create infraction records"
on public.member_infraction_records
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

drop policy if exists "Active board members can update infraction records"
  on public.member_infraction_records;
create policy "Active board members can update infraction records"
on public.member_infraction_records
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

drop policy if exists "Active board members can delete infraction records"
  on public.member_infraction_records;
create policy "Active board members can delete infraction records"
on public.member_infraction_records
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

create or replace view public.member_infraction_records_view
with (security_barrier = true)
as
select
  member.id as member_id,
  member.member_number,
  member.first_name,
  member.last_name,
  infraction_years.infraction_year,
  infraction.jan_msg,
  infraction.jan_late,
  infraction.jan_absence,
  infraction.feb_msg,
  infraction.feb_late,
  infraction.feb_absence,
  infraction.mar_msg,
  infraction.mar_late,
  infraction.mar_absence,
  infraction.apr_msg,
  infraction.apr_late,
  infraction.apr_absence,
  infraction.may_msg,
  infraction.may_late,
  infraction.may_absence,
  infraction.jun_msg,
  infraction.jun_late,
  infraction.jun_absence,
  infraction.jul_msg,
  infraction.jul_late,
  infraction.jul_absence,
  infraction.aug_msg,
  infraction.aug_late,
  infraction.aug_absence,
  infraction.sep_msg,
  infraction.sep_late,
  infraction.sep_absence,
  infraction.oct_msg,
  infraction.oct_late,
  infraction.oct_absence,
  infraction.nov_msg,
  infraction.nov_late,
  infraction.nov_absence,
  infraction.dec_msg,
  infraction.dec_late,
  infraction.dec_absence
from public.members as member
cross join lateral generate_series(
  extract(year from current_date)::integer,
  extract(year from current_date)::integer + 4
) as infraction_years(infraction_year)
left join public.member_infraction_records as infraction
  on infraction.member_id = member.id
  and infraction.infraction_year = infraction_years.infraction_year
where exists (
  select 1
  from public.members as viewer
  where viewer.id = (select auth.uid())
    and viewer.status = 'active'
    and viewer.role in ('member', 'board')
);

revoke all on public.member_infraction_records_view from public, anon;
grant select on public.member_infraction_records_view to authenticated;
