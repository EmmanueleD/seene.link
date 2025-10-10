-- Seene.link Database Setup
-- Run this in your Supabase SQL Editor

-- Create seenes table
CREATE TABLE IF NOT EXISTS seenes (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  font TEXT DEFAULT 'Inter',
  text_color TEXT DEFAULT '#111827',
  gradient_start TEXT DEFAULT '#ffffff',
  gradient_end TEXT DEFAULT '#f3f4f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_seenes_created_at ON seenes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE seenes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON seenes;
DROP POLICY IF EXISTS "Allow public insert access" ON seenes;

-- Allow anyone to read seenes
CREATE POLICY "Allow public read access" ON seenes
  FOR SELECT
  USING (true);

-- Allow anyone to create seenes
CREATE POLICY "Allow public insert access" ON seenes
  FOR INSERT
  WITH CHECK (true);

-- Optional: Add a function to clean up old seenes (for future use)
CREATE OR REPLACE FUNCTION delete_old_seenes()
RETURNS void AS $$
BEGIN
  DELETE FROM seenes
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to run cleanup (uncomment if needed)
-- SELECT cron.schedule(
--   'delete-old-seenes',
--   '0 0 * * *', -- Run daily at midnight
--   'SELECT delete_old_seenes();'
-- );
