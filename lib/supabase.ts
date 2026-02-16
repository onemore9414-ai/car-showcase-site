import { createClient } from "@supabase/supabase-js";

// Safely access environment variables with fallback to hardcoded values
// This ensures the app works even in environments where .env isn't automatically loaded (e.g. static server)
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || "https://ijhgmrkcvvpfdtduztrc.supabase.co";
const supabaseKey = env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqaGdtcmtjdnZwZmR0ZHV6dHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDQ5MTcsImV4cCI6MjA4NjgyMDkxN30.arpllYOxSzsI94RxXOvdBN3bs5USDeenFPKxf2CiVIQ";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Please check .env file.");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);