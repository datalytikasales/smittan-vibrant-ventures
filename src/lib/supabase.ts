import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://nwpszbqsslcqhvwoldec.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cHN6YnFzc2xjcWh2d29sZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTM2OTksImV4cCI6MjA1MDI4OTY5OX0.MLG4CWsTt00_YXPy8IaW-NwlJQwtR_nNQnx-HB-rgfw";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);