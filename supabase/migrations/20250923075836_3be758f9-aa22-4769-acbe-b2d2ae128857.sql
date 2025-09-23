-- Create sample data for opportunities and projects
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
    documents
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
    '["floor_plans.pdf", "market_analysis.pdf", "renovation_scope.pdf"]'
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
    end_date
) VALUES (
    'Al Barari Luxury Transformation',
    'Complete renovation of a 5-bedroom villa in Al Barari featuring sustainable luxury design, smart home integration, and landscape redesign.',
    'renovation',
    'in_progress',
    1800000,
    950000,
    '2024-01-15',
    '2024-05-30'
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
    end_date
) VALUES (
    'Dubai Hills Modern Estate',
    'Luxury villa transformation featuring contemporary design, infinity pool, and premium finishes. Project delivered 5% under budget with exceptional quality.',
    'renovation',
    'completed',
    2200000,
    2090000,
    '2023-08-01',
    '2023-12-15'
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
    end_date
) VALUES (
    'Palm Jumeirah Penthouse Upgrade',
    'High-end penthouse renovation with panoramic sea views, Italian marble finishes, and custom-designed interiors. Award-winning architectural transformation.',
    'renovation',
    'completed',
    3500000,
    3350000,
    '2023-03-01',
    '2023-08-30'
);