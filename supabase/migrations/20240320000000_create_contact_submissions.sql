create table public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- Create policy to allow inserts from authenticated users
create policy "Allow inserts" on public.contact_submissions
  for insert
  with check (true);

-- Create policy to allow reads from authenticated users only
create policy "Allow reads from authenticated users" on public.contact_submissions
  for select
  to authenticated
  using (true);