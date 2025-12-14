-- Create appointments table for patient appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_email VARCHAR(255) NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  type VARCHAR(100) NOT NULL DEFAULT 'consultation',
  notes TEXT,
  video_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_patient_date_time UNIQUE (patient_email, appointment_date, appointment_time)
);

-- Create index for faster lookups by email
CREATE INDEX IF NOT EXISTS appointments_patient_email_idx ON appointments(patient_email);

-- Create index for faster lookups by date
CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments(appointment_date);

-- Create index for faster lookups by status
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);

-- Row Level Security: Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own appointments
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.jwt() ->> 'email' = patient_email);

-- RLS Policy: Users can insert their own appointments
CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = patient_email);

-- RLS Policy: Users can update their own appointments (only pending ones)
CREATE POLICY "Users can update own pending appointments"
  ON appointments FOR UPDATE
  USING (auth.jwt() ->> 'email' = patient_email AND status = 'pending')
  WITH CHECK (auth.jwt() ->> 'email' = patient_email AND status = 'pending');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_appointments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_appointments_updated_at();

