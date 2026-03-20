import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nvvyeykslbhnhwryhuia.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dnlleWtzbGJobmh3cnlodWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzA5MzEsImV4cCI6MjA3ODgwNjkzMX0.zO1sySq5WC-dNHnuILpi5FBfzsadsh35JqSZN5KxaYc';

console.log('VITE_SUPABASE_URL length:', supabaseUrl?.length || 0);
console.log('VITE_SUPABASE_URL value starts with:', supabaseUrl?.substring(0, 5));

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase URL and Anon Key must be defined in .env file");
// }

// Define types for your database
export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: { // The data expected to be returned from a "select" statement
          id: string;
          created_at: string;
          name: string;
          title: string;
          content: string;
          is_approved: boolean;
        };
        Insert: { // The data expected to be passed to an "insert" statement
          name: string;
          title: string;
          content: string;
        };
        Update: { // The data expected to be passed to an "update" statement
          is_approved?: boolean;
        };
      };
    };
  };
}


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
