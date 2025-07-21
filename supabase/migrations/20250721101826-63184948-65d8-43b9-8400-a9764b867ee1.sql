-- Insert sample properties with correct status values
INSERT INTO public.properties (title, description, property_type, location, address, price, area_sqft, bedrooms, bathrooms, status, features, images) VALUES
('Marina Bay Luxury Tower', 'Spectacular waterfront luxury apartments with panoramic views of Dubai Marina', 'apartment', 'Dubai Marina', 'Marina Walk, Dubai Marina, Dubai', 2500000, 1200, 2, 2, 'available', '["Sea view", "Balcony", "Parking", "Gym access"]', '[]'),
('Downtown Premium Apartments', 'Modern residential complex in the heart of downtown Dubai', 'apartment', 'Downtown Dubai', 'Boulevard Plaza, Downtown Dubai', 1800000, 950, 1, 1, 'available', '["City view", "Pool", "Concierge", "Metro access"]', '[]'),
('Palm Jumeirah Villa', 'Exclusive beachfront villa with private beach access', 'villa', 'Palm Jumeirah', 'Frond K, Palm Jumeirah, Dubai', 8500000, 4500, 5, 6, 'available', '["Private beach", "Garden", "Pool", "Maid room"]', '[]'),
('Business Bay Office Tower', 'Grade A commercial office space with canal views', 'commercial', 'Business Bay', 'Bay Square, Business Bay, Dubai', 3200000, 800, 0, 0, 'sold', '["Canal view", "Meeting rooms", "Parking", "Reception"]', '[]'),
('Jumeirah Beach Penthouse', 'Luxury penthouse with direct beach access and panoramic views', 'apartment', 'Jumeirah Beach', 'Jumeirah Beach Road, Dubai', 12000000, 2800, 4, 4, 'available', '["Beach access", "Terrace", "Private lift", "Parking"]', '[]');

-- Insert sample projects for testing
INSERT INTO public.projects (name, description, project_type, status, budget, actual_cost, start_date, end_date, roi_percentage) VALUES
('Marina Towers Development', 'Luxury residential towers with premium amenities and marina views', 'residential', 'active', 120000000, 78000000, '2024-01-15', '2026-06-30', 18.5),
('Downtown Business Hub', 'Modern commercial complex with offices and retail spaces', 'commercial', 'planning', 85000000, 5000000, '2024-06-01', '2026-12-31', 22.0),
('Palm Villa Collection', 'Exclusive villa development on Palm Jumeirah with private beaches', 'residential', 'completed', 200000000, 185000000, '2022-03-01', '2024-02-28', 24.7),
('Green Valley Townhouses', 'Sustainable townhouse community with modern amenities', 'residential', 'on_hold', 65000000, 12000000, '2024-04-01', '2025-10-15', 15.2),
('City Center Retail Plaza', 'Premium retail and entertainment complex in city center', 'commercial', 'active', 150000000, 95000000, '2023-09-15', '2025-12-20', 20.8);

-- Insert sample contacts for testing
INSERT INTO public.contacts (name, email, phone, company, contact_type, status, notes, tags) VALUES
('Ahmed Al Mansouri', 'ahmed.mansouri@email.com', '+971-50-123-4567', 'Emirates Investment Group', 'investor', 'active', 'High-value investor interested in luxury properties', '["VIP", "Luxury", "Repeat Customer"]'),
('Sarah Johnson', 'sarah.johnson@gmail.com', '+971-55-987-6543', 'Johnson Properties', 'client', 'lead', 'Looking for investment properties in Marina area', '["Marina", "Investment", "First Time"]'),
('Mohammed Hassan', 'mhhassan@constructco.ae', '+971-56-234-5678', 'Hassan Construction', 'vendor', 'active', 'Preferred contractor for luxury developments', '["Contractor", "Luxury", "Reliable"]'),
('Lisa Chen', 'lisa.chen@globalrealty.com', '+971-52-345-6789', 'Global Realty Partners', 'partner', 'active', 'Strategic partner for international clients', '["International", "Partner", "Premium"]'),
('David Thompson', 'david.t@investor.com', '+971-54-456-7890', 'Thompson Capital', 'investor', 'client', 'Portfolio investor with focus on commercial properties', '["Commercial", "Portfolio", "High Value"]');