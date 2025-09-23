-- Reset password for ali@luxurylabs.ae to admin123
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'ali@luxurylabs.ae';