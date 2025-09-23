-- Update Ali Jaradeh's profile to have client role instead of project_manager
UPDATE profiles 
SET role = 'client', updated_at = now()
WHERE user_id = '5ee7a53e-2baf-4172-9ae4-6f3999f0ba23' 
AND name = 'Ali Jaradeh';