-- Create a client user profile for ali@luxurylabs.ae
-- First, check if user exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'ali@luxurylabs.ae',
  crypt('LuxuryLabs2024!', gen_salt('bf')),
  now(),
  now(),
  '',
  '',
  '',
  '',
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Ali Jaradeh"}',
  false,
  null,
  null,
  '',
  '',
  null,
  '',
  0,
  null,
  '',
  null,
  false
) ON CONFLICT (email) DO NOTHING;

-- Create a sample opportunity
INSERT INTO opportunities (
  title,
  description,
  location,
  opportunity_type,
  investment_required,
  expected_roi,
  deadline,
  status,
  risk_rating,
  contact_info,
  documents,
  created_by
) VALUES (
  'Luxury Villa Renovation in Emirates Hills',
  'Premium villa renovation opportunity featuring 6 bedrooms, private pool, and golf course views. The property requires modern interior redesign and outdoor space enhancement to maximize its market value.',
  'Emirates Hills, Dubai',
  'real_estate',
  2500000,
  35.5,
  '2024-06-30',
  'evaluation',
  'medium',
  '{"contact_name": "Sarah Johnson", "phone": "+971 50 123 4567", "email": "sarah.j@luxurylabs.com"}',
  '["floor_plans.pdf", "market_analysis.pdf", "renovation_scope.pdf"]',
  (SELECT id FROM auth.users WHERE email = 'admin@luxurylabs.com' LIMIT 1)
);

-- Create an in-progress project
INSERT INTO projects (
  name,
  description,
  project_type,
  status,
  budget,
  actual_cost,
  start_date,
  end_date,
  created_by
) VALUES (
  'Al Barari Luxury Transformation',
  'Complete renovation of a 5-bedroom villa in Al Barari featuring sustainable luxury design, smart home integration, and landscape redesign.',
  'renovation',
  'in_progress',
  1800000,
  950000,
  '2024-01-15',
  '2024-05-30',
  (SELECT id FROM auth.users WHERE email = 'admin@luxurylabs.com' LIMIT 1)
);

-- Create first completed project
INSERT INTO projects (
  name,
  description,
  project_type,
  status,
  budget,
  actual_cost,
  start_date,
  end_date,
  created_by
) VALUES (
  'Dubai Hills Modern Estate',
  'Luxury villa transformation featuring contemporary design, infinity pool, and premium finishes. Project delivered 5% under budget with exceptional quality.',
  'renovation',
  'completed',
  2200000,
  2090000,
  '2023-08-01',
  '2023-12-15',
  (SELECT id FROM auth.users WHERE email = 'admin@luxurylabs.com' LIMIT 1)
);

-- Create second completed project
INSERT INTO projects (
  name,
  description,
  project_type,
  status,
  budget,
  actual_cost,
  start_date,
  end_date,
  created_by
) VALUES (
  'Palm Jumeirah Penthouse Upgrade',
  'High-end penthouse renovation with panoramic sea views, Italian marble finishes, and custom-designed interiors. Award-winning architectural transformation.',
  'renovation',
  'completed',
  3500000,
  3350000,
  '2023-03-01',
  '2023-08-30',
  (SELECT id FROM auth.users WHERE email = 'admin@luxurylabs.com' LIMIT 1)
);