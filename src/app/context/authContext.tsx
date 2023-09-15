"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../backend/user';

type UserData = {
    token: string;
    email: string;
}

type AuthContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginUser: (userData: UserData) => void;
  registerUser: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ id: 1, email: 'l@gmail.com', password: 'qweqweqwe', userId: 0 });
    }
}, []);

const loginUser = (userData: UserData) => {
        localStorage.setItem('token', userData.token);
            setUser({ id: 1, email: 'l@gmail.com', password: 'qweqweqwe', userId: 0 });
}

const registerUser = (userData: UserData) => {
    loginUser(userData);
}

const logout = () => {
    localStorage.removeItem('token');
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

