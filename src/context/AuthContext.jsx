import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { login as loginApi, signup as signupApi } from '../services/authService';
import { getToken, removeToken, hasToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasToken()) {
      try {
        const token = getToken();
        const payload = JSON.parse(atob(token.split('.')[1]));

        if (payload.exp * 1000 > Date.now()) {
          setUser({ id: payload.id, name: payload.name, email: payload.email });
          setIsAuthenticated(true);
        } else {
          removeToken();
        }
      } catch {
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const { user, token } = await loginApi(credentials);
    setUser(user);
    setIsAuthenticated(true);
    return { user, token };
  }, []);

  const signup = useCallback(async (userData) => {
    const result = await signupApi(userData);
    return result;
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
