-- Insert sample data with correct constraints
-- First, check what values are allowed and insert accordingly

-- Insert basic sample data that should work
INSERT INTO public.properties (title, description, property_type, location, price, status, features, images) 
VALUES 
('Marina Bay Tower', 'Luxury waterfront apartments', 'apartment', 'Dubai Marina', 2500000, 'available', '[]', '[]'),
('Business Bay Office', 'Commercial office space', 'commercial', 'Business Bay', 1200000, 'sold', '[]', '[]'),
('Palm Villa', 'Exclusive beachfront villa', 'villa', 'Palm Jumeirah', 5000000, 'available', '[]', '[]');

-- Insert sample projects with basic data
INSERT INTO public.projects (name, description, project_type, status, budget, actual_cost) 
VALUES 
('Marina Development', 'Luxury residential development', 'development', 'active', 50000000, 25000000),
('Commercial Plaza', 'Office and retail complex', 'development', 'planning', 30000000, 5000000),
('Villa Collection', 'Premium villa community', 'development', 'completed', 80000000, 75000000);

-- Insert sample contacts
INSERT INTO public.contacts (name, email, phone, contact_type, status)
VALUES 
('Ahmed Al Mansouri', 'ahmed@example.com', '+971501234567', 'investor', 'active'),
('Sarah Johnson', 'sarah@example.com', '+971551234567', 'client', 'lead'),
('Michael Chen', 'michael@example.com', '+971521234567', 'partner', 'active');