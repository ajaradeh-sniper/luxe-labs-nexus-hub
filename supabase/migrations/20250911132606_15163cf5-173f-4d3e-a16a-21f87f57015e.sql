-- Create trigger to automatically assign admin role to specific email
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is the admin email, ensure they get admin role
  IF NEW.email = 'admin@luxurylabs.com' THEN
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
$$;

-- Update the existing trigger to use the new function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_signup();