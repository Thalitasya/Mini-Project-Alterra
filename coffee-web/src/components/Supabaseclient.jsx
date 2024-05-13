import { createClient } from "@supabase/supabase-js"; // Impor fungsi createClient dari pustaka @supabase/supabase-js

// Buat koneksi dengan server Supabase menggunakan createClient
export const supabase = createClient(
  "https://sksjsvotnzydxcjfanxn.supabase.co", // URL endpoint Supabase
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk" // Kunci akses Supabase
);
