-- Fix function search path security warning
ALTER FUNCTION public.cleanup_rate_limits() SET search_path = public;

-- Add function to track submission rate limits
CREATE OR REPLACE FUNCTION public.track_submission_rate_limit()
RETURNS void AS $$
BEGIN
  -- Insert or update rate limit tracking
  INSERT INTO public.submission_rate_limits (ip_address, submission_count, window_start)
  VALUES (inet_client_addr(), 1, now())
  ON CONFLICT (ip_address) 
  DO UPDATE SET 
    submission_count = CASE 
      WHEN submission_rate_limits.window_start < now() - INTERVAL '1 hour' 
      THEN 1 
      ELSE submission_rate_limits.submission_count + 1 
    END,
    window_start = CASE 
      WHEN submission_rate_limits.window_start < now() - INTERVAL '1 hour' 
      THEN now() 
      ELSE submission_rate_limits.window_start 
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;