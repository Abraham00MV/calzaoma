-- Tabla de favoritos por usuario
CREATE TABLE IF NOT EXISTS public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "favorites_select_own"
  ON public.favorites FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorites_insert_own"
  ON public.favorites FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorites_delete_own"
  ON public.favorites FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
