'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService, User, UserRole } from './appwrite';
import { saveSession, clearSession, saveRedirectPath, getAndClearRedirectPath } from './session-utils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUpWithGoogle: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Basic session check
  const checkAuthStatus = useCallback(async () => {
    try {
      console.log('Checking authentication status...');
      const isAuth = await authService.isAuthenticated();
      setIsAuth(isAuth);
      
      if (isAuth) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          try {
            const userData = await authService.getUserData(currentUser.$id);
            console.log('Auth Context - User data loaded:', userData);
            setUser(userData);
            
            // Save session data
            if (userData) {
              saveSession({
                userId: userData.userId,
                email: userData.email,
                role: userData.role,
                lastActivity: Date.now(),
              });
            }
          } catch {
            console.log('User document not found, will be created during first login');
          }
        }
      } else {
        setUser(null);
      }
    } catch {
      console.error('Auth check error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to refresh user data
  const refreshUserData = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const userData = await authService.getUserData(currentUser.$id);
        setUser(userData);
      }
    } catch {
      console.error('Error refreshing user data');
    }
  }, []);

  // Simple sign out
  const signOut = useCallback(async () => {
    try {
      console.log('Signing out...');
      await authService.signOut();
      setUser(null);
      setIsAuth(false);
      
      // Clear session data
      clearSession();
    } catch {
      console.error('Sign out error');
    }
  }, []);

  const signUpWithGoogle = useCallback(async (role: UserRole) => {
    try {
      // Store the selected role temporarily
      sessionStorage.setItem('selectedRole', role);
      await authService.signUpWithGoogle(role);
      // After successful OAuth, check auth status again
      await checkAuthStatus();
    } catch {
      console.error('Sign up error');
      throw new Error('Sign up failed');
    }
  }, [checkAuthStatus]);

  // Initialize auth
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Handle beforeunload event to save session state
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuth && user) {
        saveRedirectPath(window.location.pathname);
        // Save session data
        saveSession({
          userId: user.userId,
          email: user.email,
          role: user.role,
          lastActivity: Date.now(),
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuth, user]);

  // Restore redirect path after page reload
  useEffect(() => {
    if (isAuth && !loading) {
      const redirectPath = getAndClearRedirectPath();
      if (redirectPath && redirectPath !== window.location.pathname) {
        window.history.replaceState(null, '', redirectPath);
      }
    }
  }, [isAuth, loading]);

  const value: AuthContextType = {
    user,
    loading,
    signUpWithGoogle,
    signOut,
    isAuthenticated: isAuth,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 