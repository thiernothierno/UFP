-- Let authenticated users read their own profile so the app can load role/status.
-- Do not grant client-side profile writes; admins manage role and status.
grant usage on schema public to authenticated;
grant select on table public.members to authenticated;

alter table public.members enable row level security;

drop policy if exists "Users can read their own member profile"
  on public.members;
drop policy if exists "Users can read their own profile"
  on public.members;

create policy "Users can read their own member profile"
on public.members
for select
to authenticated
using ((select auth.uid()) = id);

-- Reusable predicate for RLS policies on feature tables as they are created.
-- It returns only whether the current account has the requested active role.
create or replace function public.has_active_member_role(required_role text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.members as member_profile
    where member_profile.id = (select auth.uid())
      and member_profile.status = 'active'
      and member_profile.role = required_role
  );
$$;

revoke all on function public.has_active_member_role(text) from public;
grant execute on function public.has_active_member_role(text) to authenticated;
