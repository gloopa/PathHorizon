-- SaferSteps Database Schema
-- This file contains the SQL schema for the Supabase database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Safety tiles table
CREATE TABLE IF NOT EXISTS safety_tiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lat DECIMAL(10, 8) NOT NULL,
    lon DECIMAL(11, 8) NOT NULL,
    crime_density DECIMAL(5, 2) DEFAULT 0,
    offender_density DECIMAL(5, 2) DEFAULT 0,
    safety_score INTEGER CHECK (safety_score >= 0 AND safety_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lat DECIMAL(10, 8) NOT NULL,
    lon DECIMAL(11, 8) NOT NULL,
    category VARCHAR(50) NOT NULL,
    comment TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_safety_tiles_location ON safety_tiles(lat, lon);
CREATE INDEX IF NOT EXISTS idx_reports_location ON reports(lat, lon);
CREATE INDEX IF NOT EXISTS idx_reports_timestamp ON reports(timestamp);

-- Row Level Security (RLS) policies
ALTER TABLE safety_tiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to safety tiles
CREATE POLICY "Allow public read access to safety_tiles" ON safety_tiles
    FOR SELECT USING (true);

-- Allow public insert access to reports
CREATE POLICY "Allow public insert access to reports" ON reports
    FOR INSERT WITH CHECK (true);

-- Allow public read access to reports
CREATE POLICY "Allow public read access to reports" ON reports
    FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_safety_tiles_updated_at 
    BEFORE UPDATE ON safety_tiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
