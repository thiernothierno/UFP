create table if not exists public.assistance_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.members(id),
  assistance_title text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create index if not exists assistance_posts_owner_id_idx
  on public.assistance_posts(owner_id);

create index if not exists assistance_posts_created_at_idx
  on public.assistance_posts(created_at desc);

grant usage on schema public to authenticated;
grant select, insert, update, delete
  on table public.assistance_posts to authenticated;

alter table public.assistance_posts enable row level security;

drop policy if exists "Active members can read assistance posts"
  on public.assistance_posts;
create policy "Active members can read assistance posts"
on public.assistance_posts
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

drop policy if exists "Active members can create their own assistance posts"
  on public.assistance_posts;
create policy "Active members can create their own assistance posts"
on public.assistance_posts
for insert
to authenticated
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role in ('member', 'board')
  )
);

drop policy if exists "Authors can update their own assistance posts"
  on public.assistance_posts;
create policy "Authors can update their own assistance posts"
on public.assistance_posts
for update
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role in ('member', 'board')
  )
)
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role in ('member', 'board')
  )
);

drop policy if exists "Authors can delete their own assistance posts"
  on public.assistance_posts;
create policy "Authors can delete their own assistance posts"
on public.assistance_posts
for delete
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1
    from public.members m
    where m.id = (select auth.uid())
      and m.status = 'active'
      and m.role in ('member', 'board')
  )
);

-- Expose only the names of members who own assistance posts to active members.
create or replace view public.assistance_post_authors
with (security_barrier = true)
as
select distinct
  assistance.owner_id,
  member.first_name,
  member.last_name
from public.assistance_posts as assistance
join public.members as member
  on member.id = assistance.owner_id
where exists (
  select 1
  from public.members as viewer
  where viewer.id = (select auth.uid())
    and viewer.status = 'active'
    and viewer.role in ('member', 'board')
);

grant select on public.assistance_post_authors to authenticated;
