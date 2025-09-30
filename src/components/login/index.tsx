import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { LoginType } from "../../types/usertypes";
import { toast } from "react-toastify";
import Button from "../../areaComponents/Button";
import InputText from "../../areaComponents/Text";
import { useNavigate } from "react-router-dom";
import Layout from "../../areaComponents/Layout";

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

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Controle Financeiro</h1>

      {auth?.user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-900 text-center">Bem-vindo, {auth.user.email}</p>
          <Button size="md" onClick={auth.logout}>
            Sair
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputText
            size="full"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <InputText
            size="full"
            type="password"
            value={form.password}
            placeholder="Senha"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <Button size="full" type="submit">
            Entrar
          </Button>
          <Button size="full" variant="outline" onClick={handleRegister}>
            Registrar conta
          </Button>
        </form>
      )}
    </Layout>
  );
}
