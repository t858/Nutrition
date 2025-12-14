-- Create chat_messages table for real-time messaging
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sender_id VARCHAR(255) NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_role VARCHAR(50) NOT NULL CHECK (sender_role IN ('admin', 'patient')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS chat_messages_room_id_idx ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS chat_messages_timestamp_idx ON chat_messages(timestamp);
CREATE INDEX IF NOT EXISTS chat_messages_sender_id_idx ON chat_messages(sender_id);

-- Row Level Security: Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow authenticated users to read/write messages in their rooms
CREATE POLICY "Users can view messages in their rooms"
  ON chat_messages FOR SELECT
  USING (true); -- For now, allow all authenticated users to see messages

CREATE POLICY "Users can insert messages"
  ON chat_messages FOR INSERT
  WITH CHECK (true); -- Allow authenticated users to send messages

-- Function to automatically update created_at timestamp
CREATE OR REPLACE FUNCTION update_chat_messages_created_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update created_at
CREATE TRIGGER update_chat_messages_created_at
  BEFORE INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_messages_created_at();
