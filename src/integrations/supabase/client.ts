// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://otccudmzrtfuylsoprhz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90Y2N1ZG16cnRmdXlsc29wcmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjI0MzksImV4cCI6MjA1NjczODQzOX0.zqwz725RzAMDnlu5bG7B-i8JKJWOEerDLDy1txTR8A8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);