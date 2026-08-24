-- Añade los campos de personalización al catálogo.
-- Ejecutar en Supabase: Dashboard -> SQL Editor -> New query.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS use_type text,
  ADD COLUMN IF NOT EXISTS comfort_score integer;

-- Datos por defecto para productos existentes
UPDATE public.products
   SET comfort_score = 6
 WHERE comfort_score IS NULL;
