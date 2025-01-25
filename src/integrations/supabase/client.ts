import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://knoebbqglkhhxkunuvoq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtub2ViYnFnbGtoaHhrdW51dm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NzcxMTQsImV4cCI6MjA1MzM1MzExNH0.vsSJsrRK-Elyb1MMvRJZKSYfwBbOlSkQafCeEJbsCcw";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }
  }
);