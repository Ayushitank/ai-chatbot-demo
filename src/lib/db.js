// src/lib/db.js
import { createClient } from "@supabase/supabase-js";

// Use service role key for server-side operations (NEVER expose this to client)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
