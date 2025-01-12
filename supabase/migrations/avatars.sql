-- Create avatars bucket if it doesn't exist
insert into storage.buckets (id, name, public)
select 'avatars', 'avatars', true
where not exists (
    select 1 from storage.buckets where id = 'avatars'
);

-- Drop existing policies if they exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Users can upload their own avatars" on storage.objects;
drop policy if exists "Users can update their own avatars" on storage.objects;
drop policy if exists "Users can delete their own avatars" on storage.objects;

-- Set up access policies for the avatars bucket

-- Allow public read access to avatars
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload their own avatars
create policy "Users can upload their own avatars"
on storage.objects for insert
to authenticated
with check (
    bucket_id = 'avatars' 
    and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatars
create policy "Users can update their own avatars"
on storage.objects for update
to authenticated
using (
    bucket_id = 'avatars' 
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'avatars' 
    and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatars
create policy "Users can delete their own avatars"
on storage.objects for delete
to authenticated
using (
    bucket_id = 'avatars' 
    and (storage.foldername(name))[1] = auth.uid()::text
); 