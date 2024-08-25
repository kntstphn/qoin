"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@lib/firebase/config";
import Menu from "./menu";
import "@styles/globals.css";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <div className=" flex flex-col w-full">
        <Menu />
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
