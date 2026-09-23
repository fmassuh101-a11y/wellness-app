-- WellnessHub Database Tables for Supabase
-- Run these SQL commands in your Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    country_code TEXT DEFAULT '+56',
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create login_logs table to track user logins
CREATE TABLE login_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    location TEXT,
    device_type TEXT
);

-- Create journal_entries table for wellness journal
CREATE TABLE journal_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 10),
    exercise TEXT,
    sleep_hours DECIMAL(3,1),
    sleep_quality TEXT CHECK (sleep_quality IN ('Excellent', 'Good', 'Fair', 'Poor')),
    gratitude TEXT,
    reflection TEXT,
    intention TEXT,
    category TEXT,
    tags TEXT[],
    highlights TEXT[],
    challenges TEXT[],
    goals TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Create mood_entries table for mood tracking
CREATE TABLE mood_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 5),
    emoji TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Create support_groups table
CREATE TABLE support_groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    max_members INTEGER DEFAULT 50,
    meeting_time TEXT,
    next_meeting TIMESTAMP WITH TIME ZONE,
    is_public BOOLEAN DEFAULT true,
    moderator_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support_group_members table
CREATE TABLE support_group_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES support_groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(group_id, user_id)
);

-- Create consultation_requests table
CREATE TABLE consultation_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    professional_name TEXT NOT NULL,
    professional_email TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_login_logs_user_id ON login_logs(user_id);
CREATE INDEX idx_login_logs_login_time ON login_logs(login_time);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(date);
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON mood_entries(date);
CREATE INDEX idx_support_group_members_user_id ON support_group_members(user_id);
CREATE INDEX idx_support_group_members_group_id ON support_group_members(group_id);
CREATE INDEX idx_consultation_requests_user_id ON consultation_requests(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Row Level Security Policies

-- user_profiles policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- login_logs policies
ALTER TABLE login_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own login logs" ON login_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can insert login logs" ON login_logs
    FOR INSERT WITH CHECK (true);

-- journal_entries policies
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own journal entries" ON journal_entries
    FOR ALL USING (auth.uid() = user_id);

-- mood_entries policies
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own mood entries" ON mood_entries
    FOR ALL USING (auth.uid() = user_id);

-- support_groups policies
ALTER TABLE support_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public support groups" ON support_groups
    FOR SELECT USING (is_public = true);

CREATE POLICY "Moderators can manage their groups" ON support_groups
    FOR ALL USING (auth.uid() = moderator_id);

-- support_group_members policies
ALTER TABLE support_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view group memberships" ON support_group_members
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own memberships" ON support_group_members
    FOR ALL USING (auth.uid() = user_id);

-- consultation_requests policies
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own consultation requests" ON consultation_requests
    FOR ALL USING (auth.uid() = user_id);

-- notifications policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_groups_updated_at BEFORE UPDATE ON support_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_requests_updated_at BEFORE UPDATE ON consultation_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default support groups
INSERT INTO support_groups (name, description, category, max_members, meeting_time, next_meeting, moderator_id) VALUES
('Anxiety Support Circle', 'A safe space to share experiences and coping strategies for anxiety management.', 'Mental Health', 30, 'Martes 7:00 PM (GMT-3)', '2025-09-30T22:00:00Z', NULL),
('Camino hacia la Recuperación', 'Apoyo mutuo para quienes enfrentan depresión y buscan herramientas de recuperación.', 'Depression', 25, 'Jueves 6:30 PM (GMT-3)', '2025-10-02T21:30:00Z', NULL),
('Manejo del Estrés Laboral', 'Técnicas y estrategias para manejar el estrés del trabajo y la vida diaria.', 'Stress', 35, 'Lunes 8:00 PM (GMT-3)', '2025-09-29T23:00:00Z', NULL),
('Mindfulness en Español', 'Practica de mindfulness y meditación guiada en español.', 'Mindfulness', 50, 'Miércoles 7:30 PM (GMT-3)', '2025-10-01T22:30:00Z', NULL),
('Jóvenes Adultos (18-30)', 'Espacio para jóvenes adultos que enfrentan desafíos de salud mental.', 'Age Group', 20, 'Sábados 4:00 PM (GMT-3)', '2025-10-04T19:00:00Z', NULL),
('Comunidad LGBTI+ Bienestar', 'Grupo de apoyo específico para la comunidad LGBTI+ enfocado en bienestar mental.', 'LGBTI+', 15, 'Viernes 7:00 PM (GMT-3)', '2025-10-03T22:00:00Z', NULL);

-- Create a function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name, username, email, phone_number, country_code)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'username', ''),
    new.email,
    COALESCE(new.raw_user_meta_data->>'phone_number', ''),
    COALESCE(new.raw_user_meta_data->>'country_code', '+56')
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;