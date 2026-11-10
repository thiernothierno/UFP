create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null
    check (char_length(btrim(first_name)) between 1 and 100),
  last_name text not null
    check (char_length(btrim(last_name)) between 1 and 100),
  email text not null
    check (char_length(btrim(email)) between 1 and 320),
  phone text not null
    check (char_length(btrim(phone)) between 1 and 30),
  message text not null
    check (char_length(btrim(message)) between 1 and 5000),
  date date not null default current_date
);

grant usage on schema public to anon, authenticated;
grant insert (first_name, last_name, email, phone, message)
  on table public.contact_messages to anon, authenticated;

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit a contact message"
  on public.contact_messages;
create policy "Anyone can submit a contact message"
on public.contact_messages
for insert
to anon, authenticated
with check (true);
