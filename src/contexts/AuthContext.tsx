'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, AuthUser, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session?.user) {
          console.log('Found existing session for user:', session.user.id);
          const userData = await getCurrentUser();
          if (mounted) {
            setUser(userData);
          }
        } else {
          console.log('No existing session found');
        }

        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);

        if (!mounted) return;

        try {
          if (session?.user && event !== 'TOKEN_REFRESHED') {
            console.log('User signed in:', session.user.id);
            const userData = await getCurrentUser();
            if (mounted) {
              setUser(userData);
            }
          } else if (!session?.user && event === 'SIGNED_OUT') {
            console.log('User signed out');
            if (mounted) {
              setUser(null);
            }
          }

          if (mounted && initialized) {
            setLoading(false);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      console.log('AuthProvider cleanup');
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [initialized]);

  const handleSignOut = async () => {
    console.log('Signing out...');
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const refreshUser = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const value = {
    user,
    loading,
    signOut: handleSignOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};