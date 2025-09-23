-- Update ali@luxurylabs.ae to be client and info@luxurylabs.ae to be administrator
-- Both with password admin123

-- Update Ali's profile to client role
UPDATE profiles 
SET role = 'client', updated_at = now()
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'ali@luxurylabs.ae'
);

-- Update Info's profile to administrator role (create if doesn't exist)
INSERT INTO profiles (user_id, name, role, created_at, updated_at)
SELECT id, 'Administrator', 'administrator', now(), now()
FROM auth.users 
WHERE email = 'info@luxurylabs.ae'
ON CONFLICT (user_id) 
DO UPDATE SET 
  role = 'administrator',
  name = 'Administrator',
  updated_at = now();

-- Set passwords for both users
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email IN ('ali@luxurylabs.ae', 'info@luxurylabs.ae');