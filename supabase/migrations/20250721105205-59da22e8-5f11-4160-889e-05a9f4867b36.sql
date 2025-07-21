-- Create a function to promote a user to administrator role
-- This allows setting up the initial administrator account

-- First, let's add administrator option to signup form by updating the role options
-- We'll also create a function to manually set admin role for the first user

-- Insert a master administrator profile (you'll need to sign up first, then this will promote you)
-- Replace 'your-email@example.com' with the email you'll use to sign up

-- Function to promote a user to administrator
CREATE OR REPLACE FUNCTION promote_to_admin(user_email TEXT)
RETURNS VOID AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find the user by email from auth.users
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
    
    -- Update or insert the profile with administrator role
    INSERT INTO public.profiles (user_id, name, role)
    VALUES (target_user_id, 'Master Administrator', 'administrator')
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'administrator', name = 'Master Administrator';
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION promote_to_admin(TEXT) TO authenticated;

-- Add administrator option to the auth form
-- Note: After signing up with any role, you can call: SELECT promote_to_admin('your-email@example.com');