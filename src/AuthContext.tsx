import React, { createContext, useState, useEffect } from "react";
import api from "./api";
import { User, AuthContextType } from "./types/Auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<User>("/me");
        setUser(res.data);
        toast.success(`Bem-vindo, ${res.data.email}!`);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

const login = async (email: string, password: string) => {
  try {
    await api.post("/login", { email, password });
    const res = await api.get<User>("/me");
    setUser(res.data);
  } catch (error) {
    console.error("Erro no login:", error);
  }
};




  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      navigate("/")
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};