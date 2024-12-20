/*
  # Update Memories Schema

  1. Tables
    - Drop and recreate policies for memories table
    - Add storage policies for memory images

  2. Security
    - Update RLS policies to avoid conflicts
    - Set up storage access rules

  3. Notes
    - Policies are recreated with unique names
    - Storage bucket policies for memory images
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can CRUD own memories" ON memories;
DROP POLICY IF EXISTS "Users can view public memories" ON memories;

-- Create new policies with unique names
CREATE POLICY "memories_owner_all_20240318" 
  ON memories FOR ALL 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "memories_public_view_20240318" 
  ON memories FOR SELECT 
  TO authenticated 
  USING (privacy = 'public');

-- Set up storage policies for memory images
INSERT INTO storage.buckets (id, name)
VALUES ('memories', 'memories')
ON CONFLICT DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Users can upload memory images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own memory images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own memory images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own and public memory images" ON storage.objects;

-- Create storage policies with unique names
CREATE POLICY "memories_storage_upload_20240318"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'memories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "memories_storage_update_20240318"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'memories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "memories_storage_delete_20240318"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'memories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "memories_storage_select_20240318"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'memories' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM memories
        WHERE memories.image_url LIKE '%' || name AND
        (memories.privacy = 'public' OR memories.user_id = auth.uid())
      )
    )
  );