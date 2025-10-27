-- Drop existing admin-only policies and create public policies for dev-panel functionality

-- CONTACT MESSAGES POLICIES
DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;

CREATE POLICY "Anyone can view messages"
  ON public.contact_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update messages"
  ON public.contact_messages
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete messages"
  ON public.contact_messages
  FOR DELETE
  USING (true);

-- PRODUCTS POLICIES
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Anyone can manage products"
  ON public.products
  FOR ALL
  USING (true);

-- REVIEWS POLICIES
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Approved reviews are viewable by everyone" ON public.reviews;

CREATE POLICY "Anyone can view all reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update reviews"
  ON public.reviews
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete reviews"
  ON public.reviews
  FOR DELETE
  USING (true);