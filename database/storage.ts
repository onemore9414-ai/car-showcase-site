// database/storage.ts
import { createClient } from '@supabase/supabase-js';

// This tells the code to look for variables in Vercel's settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);