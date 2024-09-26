import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://zqsjmmuebcuhsfjzkbcv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc2ptbXVlYmN1aHNmanprYmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczMDI0MDIsImV4cCI6MjA0Mjg3ODQwMn0.aOIxAYqfYPWQyDhn5tyrRb8p4F_Q8KCqy9khkDVNgkI';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);