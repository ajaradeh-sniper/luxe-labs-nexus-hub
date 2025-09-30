-- Update the admin signup function to use the new admin email
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- If this is the admin email, ensure they get admin role
  IF NEW.email = 'info@luxurylabs.ae' THEN
    INSERT INTO public.profiles (user_id, name, role, created_at, updated_at)
    VALUES (
      NEW.id,
      'Administrator',
      'administrator',
      now(),
      now()
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      role = 'administrator',
      name = 'Administrator',
      updated_at = now();
  ELSE
    -- Handle regular users (existing logic)
    DECLARE
        user_count INTEGER;
    BEGIN
        -- Count existing profiles
        SELECT COUNT(*) INTO user_count FROM public.profiles;
        
        -- For subsequent users, use the role from metadata or default to 'client'
        INSERT INTO public.profiles (user_id, name, role, created_at, updated_at)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
            COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
            now(),
            now()
        ) ON CONFLICT (user_id) DO NOTHING;
    END;
  END IF;
  
  RETURN NEW;
END;
$function$;