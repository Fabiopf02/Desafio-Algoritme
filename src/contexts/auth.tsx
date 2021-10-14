import React, { createContext, useCallback, useEffect, useState } from 'react';
import history from 'utils/history';

import { SignInService, SignOutService } from 'services/auth';

interface IUser {
  id: string;
  email: string;
  name: string;
}
interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('@user');
    const { pathname } = history.location;
    if (!user) {
      history.push(pathname !== '/dashboard' ? pathname : '/login');
      return setLoading(false);
    }

    setUser(JSON.parse(user!));
    setLoading(false);
    history.push('/dashboard');
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { displayName: name, uid } = await SignInService(email, password);
      history.push('/dashboard');
      setUser({ name: name!, id: uid, email });
      localStorage.setItem('@user', JSON.stringify({ name, id: uid, email}));
    } catch(err) {
      throw new Error(String(err));
    }
  }, []);
  const signOut = useCallback(async () => {
    await SignOutService();
    history.push('/login');
    setUser(null);
    localStorage.removeItem('@user');
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
