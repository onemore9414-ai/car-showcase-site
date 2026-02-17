import { createClient } from "@supabase/supabase-js";

// Access environment variables securely for Vite
// Using fallback object if import.meta.env is undefined to prevent access errors
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. Authentication may not work.");
}

// Create client with fallbacks to prevent "supabaseUrl is required" crash
// If creds are missing, auth calls will fail gracefully network-side instead of crashing the app on boot
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);