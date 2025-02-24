-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to read any profile
CREATE POLICY "Anyone can read profiles"
ON profiles FOR SELECT
USING (true);

