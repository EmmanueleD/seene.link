# Database Migration Instructions

## Step 1: Run SQL Migration

Go to your Supabase dashboard:
1. Open SQL Editor
2. Copy and paste the content from `supabase-migration.sql`
3. Click "Run"

This will add the new columns:
- `gradient_start` (VARCHAR 7)
- `gradient_end` (VARCHAR 7)

## Step 2: Verify

Run this query to verify the columns were added:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'seenes';
```

You should see the new columns listed.

## Done!

The app is now ready to use the new customization features.
