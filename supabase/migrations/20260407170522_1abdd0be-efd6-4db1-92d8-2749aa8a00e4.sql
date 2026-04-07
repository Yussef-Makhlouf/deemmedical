
-- Create junction table for many-to-many product-range relationship
CREATE TABLE public.product_range_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  product_range_id uuid NOT NULL REFERENCES public.product_ranges(id) ON DELETE CASCADE,
  UNIQUE(product_id, product_range_id)
);

-- Enable RLS
ALTER TABLE public.product_range_assignments ENABLE ROW LEVEL SECURITY;

-- Everyone can view assignments
CREATE POLICY "Assignments viewable by everyone" ON public.product_range_assignments FOR SELECT USING (true);

-- Admins can manage assignments
CREATE POLICY "Admins can insert assignments" ON public.product_range_assignments FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete assignments" ON public.product_range_assignments FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Migrate existing data from products.product_range_id
INSERT INTO public.product_range_assignments (product_id, product_range_id)
SELECT id, product_range_id FROM public.products WHERE product_range_id IS NOT NULL;
