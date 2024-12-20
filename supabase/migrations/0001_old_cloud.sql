/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to auth.users
      - `email` (text, unique)
      - `name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `memories`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `date` (date)
      - `privacy` (enum)
      - `category` (enum)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `tags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

    - `memory_tags`
      - `memory_id` (uuid, foreign key)
      - `tag_id` (uuid, foreign key)
      - Primary key on (memory_id, tag_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE privacy_level AS ENUM ('public', 'private', 'shared');
CREATE TYPE memory_category AS ENUM ('milestone', 'event', 'daily');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create memories table
CREATE TABLE memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  date date NOT NULL,
  privacy privacy_level DEFAULT 'private',
  category memory_category DEFAULT 'daily',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id)
);

-- Create memory_tags junction table
CREATE TABLE memory_tags (
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (memory_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Memories policies
CREATE POLICY "Users can CRUD own memories"
  ON memories FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public memories"
  ON memories FOR SELECT
  TO authenticated
  USING (privacy = 'public');

-- Tags policies
CREATE POLICY "Users can CRUD own tags"
  ON tags FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Memory tags policies
CREATE POLICY "Users can manage tags for own memories"
  ON memory_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM memories
      WHERE memories.id = memory_id
      AND memories.user_id = auth.uid()
    )
  );

-- Create functions
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON memories
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();