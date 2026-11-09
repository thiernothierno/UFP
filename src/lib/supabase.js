
import { createClient } from "@supabase/supabase-js";

// Use the browser-safe project URL and publishable key; RLS protects database access.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;