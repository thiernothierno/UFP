-- SQL privileges allow authenticated requests to attempt inserts;
-- the agenda_posts INSERT RLS policy still limits inserts to active authors.
grant insert on table public.agenda_posts to authenticated;
