-- Add type column to notifications table
ALTER TABLE public.notifications 
ADD COLUMN type text NOT NULL DEFAULT 'info'; 