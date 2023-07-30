import React from 'react';
import { ACCESS_TOKEN, QUERY_KEY_USER } from '../consts/consts';
import { useQuery } from 'react-query';
import { fetchUser } from '../functions/fetchData';
import { AuthContextType, UserLogeado, UserLoginDataResponse } from '../interfaces/interfaces';


export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  
  

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const [user, setUser] = React.useState<UserLoginDataResponse | null>(
    accessToken ? { access_token: accessToken } : null
  );  
    
  const {
    data: userInfo,
    isLoading,
    isError,
  }  = useQuery<UserLogeado>(
    [QUERY_KEY_USER],
    () => fetchUser(user?.access_token),
    {
      enabled: !!user?.access_token,
    }
  );   
 

  const signin = (newUser: UserLoginDataResponse, callback: VoidFunction) => {
    setUser(newUser);
    localStorage.setItem(
      ACCESS_TOKEN,
      newUser.access_token      
    );    
    return callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN)
    return callback();
  };

  const value = { user, signin, signout, userInfo, isLoading, isError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;