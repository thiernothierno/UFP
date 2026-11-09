-- Expose only the names of members who own agenda posts to active members.

-- creates a database view that lets active members look up the names associated 
-- with agenda posts. It doesn’t change your table or 
-- store a second copy of the names. The app now queries this view 
-- for existing posts; you need to run the SQL once in Supabase 
-- for that query to work.

grant usage on schema public to authenticated;

create or replace view public.agenda_post_authors
with (security_barrier = true)
as
select distinct
  agenda.owner_id,
  member.first_name,
  member.last_name
from public.agenda_posts as agenda
join public.members as member
  on member.id = agenda.owner_id
where exists (
  select 1
  from public.members as viewer
  where viewer.id = (select auth.uid())
    and viewer.status = 'active'
    and viewer.role in ('member', 'board')
);

grant select on public.agenda_post_authors to authenticated;
