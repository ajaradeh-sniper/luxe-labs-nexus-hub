-- Update the handle_new_user function to automatically make the first user an administrator
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
    user_count INTEGER;
BEGIN
    -- Count existing profiles
    SELECT COUNT(*) INTO user_count FROM public.profiles;
    
    -- If this is the first user, make them an administrator
    IF user_count = 0 THEN
        INSERT INTO public.profiles (user_id, name, role)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
            'administrator'
        );
    ELSE
        -- For subsequent users, use the role from metadata or default to 'client'
        INSERT INTO public.profiles (user_id, name, role)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
            COALESCE(NEW.raw_user_meta_data->>'role', 'client')
        );
    END IF;
    
    RETURN NEW;
END;
$$;