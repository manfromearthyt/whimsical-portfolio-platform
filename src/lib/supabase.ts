import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from the client.ts file
const supabaseUrl = "https://sukwzdwszhftxlqbhzys.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1a3d6ZHdzemhmdHhscWJoenlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjMxNTMsImV4cCI6MjA1ODYzOTE1M30.uSV5mbYNBr0S1_DfgQ-Nqif9gYSA1y_zZCt6mvVcpns";

// Export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to sign in' };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to sign up' };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error: any) {
    return { error: error.message || 'Failed to sign out' };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to reset password' };
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  } catch (error: any) {
    return { data: null, error: error.message || 'Failed to update password' };
  }
};
