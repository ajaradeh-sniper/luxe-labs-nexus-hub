-- Seed: One opportunity + 1 in-progress project + 2 completed projects
-- Insert opportunity with valid type
INSERT INTO opportunities (
  title, description, location, opportunity_type, investment_required, expected_roi, deadline, status, risk_rating, contact_info, documents
) VALUES (
  'Luxury Villa Investment - Emirates Hills',
  'Prime villa upgrade opportunity with scope for high-value renovation and resale.',
  'Emirates Hills, Dubai',
  'investment',
  2500000,
  35.5,
  CURRENT_DATE + INTERVAL '60 days',
  'evaluation',
  'medium',
  '{"contact_name":"Sarah Johnson","phone":"+971501234567","email":"sarah.j@luxurylabs.com"}',
  '[]'
);

-- Insert projects
INSERT INTO projects (
  name, description, project_type, status, budget, actual_cost, start_date, end_date
) VALUES 
(
  'Al Barari Luxury Transformation',
  'Complete renovation of a 5-bedroom villa in Al Barari with smart home integration.',
  'renovation',
  'in_progress',
  1800000,
  950000,
  CURRENT_DATE - INTERVAL '90 days',
  CURRENT_DATE + INTERVAL '30 days'
),
(
  'Dubai Hills Modern Estate',
  'Contemporary villa transformation delivered with premium finishes.',
  'renovation',
  'completed',
  2200000,
  2090000,
  CURRENT_DATE - INTERVAL '420 days',
  CURRENT_DATE - INTERVAL '240 days'
),
(
  'Palm Jumeirah Penthouse Upgrade',
  'High-end penthouse renovation with Italian marble and custom interiors.',
  'renovation',
  'completed',
  3500000,
  3350000,
  CURRENT_DATE - INTERVAL '560 days',
  CURRENT_DATE - INTERVAL '380 days'
);