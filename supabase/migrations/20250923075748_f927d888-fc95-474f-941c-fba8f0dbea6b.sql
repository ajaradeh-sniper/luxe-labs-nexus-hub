-- Create profile for ali@luxurylabs.ae (assuming the auth user will be created through normal signup)
-- We'll create a UUID that can be used when the user signs up
DO $$
DECLARE
    test_user_id UUID := gen_random_uuid();
BEGIN
    -- Insert profile for the test client user
    INSERT INTO profiles (user_id, name, role, created_at, updated_at)
    VALUES (test_user_id, 'Ali Jaradeh', 'client', now(), now());
    
    -- Store this user_id for use in sample data
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
        (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
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
        (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
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
        (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
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
        (SELECT user_id FROM profiles WHERE role = 'administrator' LIMIT 1)
    );
END $$;