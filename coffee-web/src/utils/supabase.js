import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sksjsvotnzydxcjfanxn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



