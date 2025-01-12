-- Create payments table
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  track_id uuid references public.tracks(id) on delete cascade not null,
  amount decimal(10,2) not null,
  status text not null default 'pending',
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.payments enable row level security;

-- Create policies
create policy "Users can view their own payments"
  on public.payments for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own payments"
  on public.payments for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Add price column to tracks table if it doesn't exist
alter table public.tracks
add column if not exists price decimal(10,2) default 9.99;

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_payments_updated_at
  before update on public.payments
  for each row
  execute procedure public.handle_updated_at(); 