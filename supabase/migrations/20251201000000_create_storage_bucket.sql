-- Create storage bucket for images if it doesn't exist
-- This migration ensures the 'images' bucket is available for file uploads

-- Check if storage extension is available
DO $$
BEGIN
  -- Only proceed if storage schema exists
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'storage') THEN
    
    -- Create the images bucket if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 
      FROM storage.buckets 
      WHERE id = 'images'
    ) THEN
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
    END IF;

    -- Ensure storage policies exist for the images bucket
    -- Select policy
    IF NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE tablename = 'objects' 
      AND schemaname = 'storage' 
      AND policyname = 'images_select_public'
    ) THEN
      CREATE POLICY "images_select_public" ON storage.objects
        FOR SELECT 
        USING (bucket_id = 'images');
    END IF;

    -- Insert policy
    IF NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE tablename = 'objects' 
      AND schemaname = 'storage' 
      AND policyname = 'images_insert_public'
    ) THEN
      CREATE POLICY "images_insert_public" ON storage.objects
        FOR INSERT 
        WITH CHECK (bucket_id = 'images');
    END IF;

    -- Update policy
    IF NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE tablename = 'objects' 
      AND schemaname = 'storage' 
      AND policyname = 'images_update_public'
    ) THEN
      CREATE POLICY "images_update_public" ON storage.objects
        FOR UPDATE 
        USING (bucket_id = 'images');
    END IF;

    -- Delete policy
    IF NOT EXISTS (
      SELECT 1 
      FROM pg_policies 
      WHERE tablename = 'objects' 
      AND schemaname = 'storage' 
      AND policyname = 'images_delete_public'
    ) THEN
      CREATE POLICY "images_delete_public" ON storage.objects
        FOR DELETE 
        USING (bucket_id = 'images');
    END IF;

  END IF;
END $$;