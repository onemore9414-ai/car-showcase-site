// database/storage.ts
import { createClient } from '@supabase/supabase-js';

// This tells the code to look for variables in Vercel's settings
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);