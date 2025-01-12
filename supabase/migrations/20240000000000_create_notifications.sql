-- Create notifications table
create table public.notifications (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    message text not null,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    link text
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Create policies
create policy "Users can view their own notifications"
    on notifications for select
    using (auth.uid() = user_id);

create policy "Users can update their own notifications"
    on notifications for update
    using (auth.uid() = user_id);

create policy "Users can delete their own notifications"
    on notifications for delete
    using (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table notifications; 