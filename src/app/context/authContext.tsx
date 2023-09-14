"use client"
import React, { createContext, useContext, useState } from 'react';
import { User } from '../backend/user';

type AuthContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginUser: (userData: User) => void;
  registerUser: (userData: User) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); 

const loginUser = (userData: User) => {
        setUser(userData);
}

const registerUser = (userData: User) => {
    loginUser(userData);
}

const logoutUser = () => {
    setUser(null)
}

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, registerUser }}>
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

