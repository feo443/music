-- Eliminar la tabla si existe
drop table if exists public.tracks;

-- Crear el bucket tracks si no existe
do $$
begin
  if not exists (
    select 1
    from storage.buckets
    where id = 'tracks'
  ) then
    insert into storage.buckets (id, name, public)
    values ('tracks', 'tracks', true);
  end if;
end $$;

-- Eliminar políticas existentes si las hay
drop policy if exists "Tracks Public Access" on storage.objects;
drop policy if exists "Users can upload tracks" on storage.objects;
drop policy if exists "Users can update their tracks" on storage.objects;
drop policy if exists "Users can delete their tracks" on storage.objects;

-- Crear nuevas políticas
create policy "Tracks Public Access"
on storage.objects for select
to public
using (bucket_id = 'tracks');

create policy "Users can upload tracks"
on storage.objects for insert
to authenticated
with check (
    bucket_id = 'tracks' 
    and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their tracks"
on storage.objects for update
to authenticated
using (
    bucket_id = 'tracks' 
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'tracks' 
    and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their tracks"
on storage.objects for delete
to authenticated
using (
    bucket_id = 'tracks' 
    and (storage.foldername(name))[1] = auth.uid()::text
);

-- Crear tabla tracks
create table public.tracks (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    url text not null,
    project_id uuid references public.projects(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Crear políticas RLS para la tabla tracks
alter table public.tracks enable row level security;

create policy "Users can view their own tracks"
on public.tracks for select
to authenticated
using (user_id = auth.uid());

create policy "Users can create their own tracks"
on public.tracks for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own tracks"
on public.tracks for update
to authenticated
using (user_id = auth.uid());

create policy "Users can delete their own tracks"
on public.tracks for delete
to authenticated
using (user_id = auth.uid()); 