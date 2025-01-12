-- Eliminar tabla si existe para recrearla
drop table if exists public.profiles;

-- Crear tabla profiles
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    email text,
    display_name text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Crear política para insertar perfiles
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

-- Habilitar Row Level Security
alter table public.profiles enable row level security;

-- Crear políticas de seguridad
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (id = auth.uid());

-- Trigger para actualizar updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

drop trigger if exists on_profiles_updated on public.profiles;

create trigger on_profiles_updated
    before update on public.profiles
    for each row
    execute procedure public.handle_updated_at();

-- Add avatar_url column to profiles table
alter table public.profiles 
add column if not exists avatar_url text; 