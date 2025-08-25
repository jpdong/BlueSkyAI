-- Add task_id column to works table for storing external API task IDs
ALTER TABLE works ADD COLUMN IF NOT EXISTS task_id VARCHAR;

COMMENT ON COLUMN works.task_id IS 'External API task ID (e.g., from KIE.AI)';