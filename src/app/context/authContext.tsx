"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'

type UserData = {
    token: string;
    email: string;
}

type AuthContextProps = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  loginUser: (userData: UserData) => void;
  registerUser: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null); 

useEffect(() => {
  const token = localStorage.getItem('token');
  const userDataString = localStorage.getItem('userData')

  if (token && userDataString) {
      const userData: UserData = JSON.parse(userDataString)
      setUser(userData)
  }
}, [])

const loginUser = (userData: UserData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
}

const registerUser = (userData: UserData) => {
    loginUser(userData);
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null)
}

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

    console.log('user in useAuth: ', context.user);
  return context;
};

