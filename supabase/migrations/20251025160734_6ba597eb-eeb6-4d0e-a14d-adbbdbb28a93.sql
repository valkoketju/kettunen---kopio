-- Add image_url to news table
ALTER TABLE public.news ADD COLUMN image_url text;

-- Add image_url to reviews table
ALTER TABLE public.reviews ADD COLUMN image_url text;