
import React, { createContext, useCallback, useState } from 'react';
import { loginRequest } from '../services/api';
import LoginCredentials from '../interfaces/loginCredentials';
import { appName } from '../config';

interface AuthState {
  user: object;
  token: string;
}

interface AuthContextData {
  user: object,
  login(credentials: LoginCredentials): Promise<void>,
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem(`@${appName}:user`);
    const token = localStorage.getItem(`@${appName}:userToken`);

    if (user && token) {
      return {
        user: JSON.parse(user),
        token,
      }
    }

    return {} as AuthState;
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user, token } = await loginRequest(credentials);

    localStorage.setItem(`@${appName}:user`, JSON.stringify(user));
    localStorage.setItem(`@${appName}:userToken`, token);

    setData({
      user,
      token,
    })
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;