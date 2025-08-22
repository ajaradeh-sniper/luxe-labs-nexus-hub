-- Create analytics tables for Luxury Labs platform

-- Website Analytics Table
CREATE TABLE website_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  visitors INTEGER NOT NULL DEFAULT 0,
  page_views INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  session_duration INTEGER DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Analytics Table
CREATE TABLE campaign_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL,
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  spend DECIMAL(10,2) DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0,
  cpc DECIMAL(8,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Traffic Analytics Table
CREATE TABLE traffic_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  source TEXT NOT NULL,
  medium TEXT,
  campaign TEXT,
  sessions INTEGER DEFAULT 0,
  users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  sessions_per_user DECIMAL(5,2) DEFAULT 0,
  avg_session_duration INTEGER DEFAULT 0,
  pages_per_session DECIMAL(5,2) DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing Analytics Table
CREATE TABLE marketing_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  channel TEXT NOT NULL,
  campaign_name TEXT,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  roas DECIMAL(8,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversion Analytics Table
CREATE TABLE conversion_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  conversion_type TEXT NOT NULL,
  source TEXT,
  value DECIMAL(12,2) DEFAULT 0,
  count INTEGER DEFAULT 1,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all analytics tables
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for analytics tables (admin and specific role access)
CREATE POLICY "Analytics read access" ON website_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead', 'real_estate_director'])
  )
);

CREATE POLICY "Analytics insert access" ON website_analytics
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead'])
  )
);

-- Apply similar policies to other analytics tables
CREATE POLICY "Campaign analytics read access" ON campaign_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead', 'real_estate_director'])
  )
);

CREATE POLICY "Campaign analytics insert access" ON campaign_analytics
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead'])
  )
);

CREATE POLICY "Traffic analytics read access" ON traffic_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead', 'real_estate_director'])
  )
);

CREATE POLICY "Traffic analytics insert access" ON traffic_analytics
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead'])
  )
);

CREATE POLICY "Marketing analytics read access" ON marketing_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead', 'real_estate_director'])
  )
);

CREATE POLICY "Marketing analytics insert access" ON marketing_analytics
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead'])
  )
);

CREATE POLICY "Conversion analytics read access" ON conversion_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead', 'real_estate_director'])
  )
);

CREATE POLICY "Conversion analytics insert access" ON conversion_analytics
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(ARRAY['administrator', 'marketing_lead'])
  )
);

-- Create indexes for better performance
CREATE INDEX idx_website_analytics_date ON website_analytics(date);
CREATE INDEX idx_campaign_analytics_date_campaign ON campaign_analytics(date, campaign_id);
CREATE INDEX idx_traffic_analytics_date_source ON traffic_analytics(date, source);
CREATE INDEX idx_marketing_analytics_date_channel ON marketing_analytics(date, channel);
CREATE INDEX idx_conversion_analytics_date_type ON conversion_analytics(date, conversion_type);

-- Insert sample data for development and testing
INSERT INTO website_analytics (date, visitors, page_views, unique_visitors, bounce_rate, session_duration) VALUES
('2024-01-15', 1250, 3400, 980, 35.5, 180),
('2024-01-16', 1180, 3200, 920, 38.2, 165),
('2024-01-17', 1350, 3600, 1050, 32.1, 195),
('2024-01-18', 1420, 3800, 1100, 29.8, 210),
('2024-01-19', 1380, 3700, 1080, 31.4, 200);

INSERT INTO traffic_analytics (date, source, medium, sessions, users, new_users, bounce_rate) VALUES
('2024-01-15', 'google', 'organic', 650, 580, 240, 32.5),
('2024-01-15', 'facebook', 'social', 280, 260, 150, 45.2),
('2024-01-15', 'direct', 'none', 320, 300, 80, 25.8),
('2024-01-16', 'google', 'organic', 620, 560, 220, 35.1),
('2024-01-16', 'facebook', 'social', 260, 240, 140, 42.8);

INSERT INTO marketing_analytics (date, channel, campaign_name, impressions, clicks, conversions, cost, revenue) VALUES
('2024-01-15', 'Google Ads', 'Luxury Properties Q1', 25000, 850, 45, 2500.00, 15000.00),
('2024-01-15', 'Facebook Ads', 'Premium Investments', 18000, 620, 32, 1800.00, 12000.00),
('2024-01-16', 'Google Ads', 'Luxury Properties Q1', 24500, 810, 38, 2450.00, 13500.00),
('2024-01-16', 'LinkedIn Ads', 'Business Professionals', 8000, 280, 18, 1200.00, 8500.00);