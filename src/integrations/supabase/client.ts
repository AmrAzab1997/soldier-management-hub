import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://knoebbqglkhhxkunuvoq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtub2ViYnFnbGtoaHhrdW51dm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTc1MTQsImV4cCI6MjAyMjQ3MzUxNH0.LkqZcKjYJKDDHJ9eBVCDXhzF1rHzHU4YQpDGHVHzJ-c";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: localStorage,
    },
  }
);