import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { LoginType } from "../../types/usertypes";
import { toast } from "react-toastify";
import Button from "../../areaComponents/Button";
import InputTexto from "../../areaComponents/Text";
import { useNavigate, Navigate } from "react-router-dom";
import LayoutPublic from "../../areaComponents/LayoutPublic";

export default function Login() {
  const [form, setForm] = useState<LoginType>({ email: "", password: "" });
  const auth = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) return; 

    try {
      await auth.login(form.email, form.password);
      toast.success(`Bem-vindo, ${auth.user?.email || form.email}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login", err);
      toast.error("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  if (auth?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LayoutPublic>
      <h1 className="text-3xl font-bold mb-6 text-center">Controle Financeiro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputTexto
          id="email"
          label="E-mail"
          size="full"
          type="email"
          value={form.email}
          placeholder="Digite seu e-mail"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <InputTexto
          id="password"
          label="Senha"
          size="full"
          type="password"
          value={form.password}
          placeholder="Digite sua senha"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <Button size="full" type="submit">
          Entrar
        </Button>
        <Button size="full" variant="outline" onClick={handleRegister}>
          Registrar conta
        </Button>
      </form>
    </LayoutPublic>
  );
}
