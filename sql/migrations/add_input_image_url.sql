-- Add input_image_url column to works table for image-to-image generation
ALTER TABLE works ADD COLUMN IF NOT EXISTS input_image_url VARCHAR;

COMMENT ON COLUMN works.input_image_url IS 'URL of the input image for image-to-image generation';