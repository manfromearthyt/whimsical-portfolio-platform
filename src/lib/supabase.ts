
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client for when credentials are missing
const dummyClient = {
  auth: {
    signInWithPassword: () => Promise.reject(new Error('Supabase credentials not configured')),
    signUp: () => Promise.reject(new Error('Supabase credentials not configured')),
    signOut: () => Promise.reject(new Error('Supabase credentials not configured')),
    resetPasswordForEmail: () => Promise.reject(new Error('Supabase credentials not configured')),
    updateUser: () => Promise.reject(new Error('Supabase credentials not configured')),
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
};

// Check if credentials are available and provide meaningful error message
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Export the appropriate client based on available credentials
export const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? dummyClient as any // Type assertion to avoid TypeScript errors
  : createClient(supabaseUrl, supabaseAnonKey);

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
