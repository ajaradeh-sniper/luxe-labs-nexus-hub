-- Fix security issue: Restrict SELECT access on user_submissions to administrators only
-- This prevents public scraping of sensitive personal data (names, emails, phones, messages)

-- First, drop the overly broad "ALL" policy
DROP POLICY IF EXISTS "Admins can manage all submissions" ON public.user_submissions;

-- Create explicit policies for each operation to make security model clear

-- SELECT: Only administrators can read submission data
CREATE POLICY "Admins can view submissions"
ON public.user_submissions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'administrator'
  )
);

-- UPDATE: Only administrators can update submissions
CREATE POLICY "Admins can update submissions"
ON public.user_submissions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'administrator'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'administrator'
  )
);

-- DELETE: Only administrators can delete submissions
CREATE POLICY "Admins can delete submissions"
ON public.user_submissions
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'administrator'
  )
);

-- Note: The "Rate-limited anonymous submissions" INSERT policy remains unchanged
-- This allows public form submissions (contact forms, questionnaires) while
-- restricting all read access to administrators only