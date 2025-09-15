-- DANGER: This will delete ALL tables and data!
-- Run this in Supabase SQL Editor to start fresh

-- Drop all tables in the correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS case_studies CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS company_info CASCADE;
DROP TABLE IF EXISTS contact CASCADE;
DROP TABLE IF EXISTS faq CASCADE;
DROP TABLE IF EXISTS blog CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- Drop any sequences that might exist
DROP SEQUENCE IF EXISTS services_id_seq CASCADE;
DROP SEQUENCE IF EXISTS projects_id_seq CASCADE;
DROP SEQUENCE IF EXISTS team_id_seq CASCADE;
DROP SEQUENCE IF EXISTS testimonials_id_seq CASCADE;
DROP SEQUENCE IF EXISTS blog_id_seq CASCADE;
DROP SEQUENCE IF EXISTS faq_id_seq CASCADE;
DROP SEQUENCE IF EXISTS contact_id_seq CASCADE;
DROP SEQUENCE IF EXISTS company_info_id_seq CASCADE;
DROP SEQUENCE IF EXISTS clients_id_seq CASCADE;
DROP SEQUENCE IF EXISTS case_studies_id_seq CASCADE;

-- Drop the trigger function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Verify all tables are deleted
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
