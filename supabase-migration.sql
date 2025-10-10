-- Migration: Add gradient colors support
-- Run this in your Supabase SQL Editor

-- Add gradient color columns
ALTER TABLE seenes ADD COLUMN IF NOT EXISTS gradient_start VARCHAR(7);
ALTER TABLE seenes ADD COLUMN IF NOT EXISTS gradient_end VARCHAR(7);

-- Set default values for existing rows
UPDATE seenes 
SET gradient_start = '#ffffff', gradient_end = '#f3f4f6' 
WHERE gradient_start IS NULL;
