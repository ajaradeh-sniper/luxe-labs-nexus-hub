-- Create admin user function and account
CREATE OR REPLACE FUNCTION public.create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin user already exists
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'admin@luxurylabs.com';
  
  -- If user doesn't exist, we need to create them
  -- Note: Direct insertion into auth.users is not recommended
  -- This function will create the profile entry for when the user signs up
  
  -- Create or update profile for admin user
  INSERT INTO public.profiles (user_id, email, name, role, created_at, updated_at)
  SELECT 
    auth.gen_random_uuid(), 
    'admin@luxurylabs.com', 
    'Administrator', 
    'administrator',
    now(),
    now()
  WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE email = 'admin@luxurylabs.com'
  );
  
  -- Log the admin account creation
  RAISE NOTICE 'Admin profile prepared for admin@luxurylabs.com';
END;
$$;

-- Execute the function to ensure admin user profile exists
SELECT public.create_admin_user();

-- Create a trigger to automatically set admin role when this specific user signs up
CREATE OR REPLACE FUNCTION public.handle_admin_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is the admin email, ensure they get admin role
  IF NEW.email = 'admin@luxurylabs.com' THEN
    INSERT INTO public.profiles (user_id, email, name, role, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      'Administrator',
      'administrator',
      now(),
      now()
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      role = 'administrator',
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for admin signup
DROP TRIGGER IF EXISTS on_admin_user_created ON auth.users;
CREATE TRIGGER on_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email = 'admin@luxurylabs.com')
  EXECUTE FUNCTION public.handle_admin_signup();