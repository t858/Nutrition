-- Create questionnaires table for health profile data
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_email VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  gender VARCHAR(50) NOT NULL DEFAULT 'male',
  height DECIMAL(5,2) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  medical_conditions TEXT,
  allergies TEXT,
  dietary_preferences TEXT,
  goals TEXT,
  activity_level VARCHAR(50) NOT NULL DEFAULT 'moderate',
  medications TEXT,
  bmi DECIMAL(4,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_patient_email UNIQUE (patient_email)
);

-- Create index for faster lookups by email
CREATE INDEX IF NOT EXISTS questionnaires_patient_email_idx ON questionnaires(patient_email);

-- Create index for faster lookups by created_at
CREATE INDEX IF NOT EXISTS questionnaires_created_at_idx ON questionnaires(created_at DESC);

-- Row Level Security: Enable RLS
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own questionnaire
CREATE POLICY "Users can view own questionnaire"
  ON questionnaires FOR SELECT
  USING (auth.jwt() ->> 'email' = patient_email);

-- RLS Policy: Users can insert their own questionnaire
CREATE POLICY "Users can insert own questionnaire"
  ON questionnaires FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = patient_email);

-- RLS Policy: Users can update their own questionnaire
CREATE POLICY "Users can update own questionnaire"
  ON questionnaires FOR UPDATE
  USING (auth.jwt() ->> 'email' = patient_email)
  WITH CHECK (auth.jwt() ->> 'email' = patient_email);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_questionnaires_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_questionnaires_updated_at
  BEFORE UPDATE ON questionnaires
  FOR EACH ROW
  EXECUTE FUNCTION update_questionnaires_updated_at();

