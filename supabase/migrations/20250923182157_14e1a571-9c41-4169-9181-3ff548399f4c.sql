-- Allow users to view opportunity shares sent to their email
CREATE POLICY "Recipients can view their own opportunity shares"
ON public.opportunity_shares
FOR SELECT
USING (shared_with_email = (auth.jwt() ->> 'email'));

-- Allow users to view opportunities that were shared with their email
CREATE POLICY "Users can view opportunities shared with their email"
ON public.opportunities
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.opportunity_shares os
    WHERE os.opportunity_id = opportunities.id
      AND os.shared_with_email = (auth.jwt() ->> 'email')
  )
);
