import React from 'react';
import { ACCESS_TOKEN } from '../consts/consts';

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginDataResponse {
  email: string;
  access_token: string;
}

interface AuthContextType {
  user: UserLoginDataResponse | null;
  signin: (user: UserLoginDataResponse, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserLoginDataResponse | null>(null);
  

  const signin = (newUser: UserLoginDataResponse, callback: VoidFunction) => {
    setUser(newUser);
    localStorage.setItem(
      ACCESS_TOKEN,
      JSON.stringify({ ...newUser, nombre: 'Ivan' })
    );
    return callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    return callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;