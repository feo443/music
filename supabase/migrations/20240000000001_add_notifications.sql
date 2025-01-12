create table if not exists public.notifications (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    message text not null,
    type text not null check (type in ('info', 'success', 'warning', 'error')),
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

-- Create function to create notifications
create or replace function public.create_notification(
    p_title text,
    p_message text,
    p_type text,
    p_user_id uuid,
    p_link text default null
) returns notifications as $$
declare
    v_notification notifications;
begin
    insert into notifications (title, message, type, user_id, link)
    values (p_title, p_message, p_type, p_user_id, p_link)
    returning * into v_notification;

    return v_notification;
end;
$$ language plpgsql security definer;

-- Create policy for the function
create policy "Anyone can create notifications using the function"
    on notifications for insert
    with check (true);

-- Enable realtime
alter publication supabase_realtime add table notifications; 