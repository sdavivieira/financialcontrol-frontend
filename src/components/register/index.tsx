import React, { useState } from "react";
import { RegisterType } from "../../types/usertypes";
import Button from "../../areaComponents/Button";
import InputText from "../../areaComponents/Text";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import Layout from "../../areaComponents/Layout";

export default function Register() {
  const [form, setForm] = useState<RegisterType>({ email: "", name: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/create", form);
      toast.success(`${response.data.message}`);
      navigate("/"); 
    } catch (err) {
      console.error("Erro no registro:", err);
      toast.error("Falha ao criar conta. Tente novamente.");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Conta</h1>
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
          type="text"
          value={form.name}
          placeholder="Nome"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <InputText
          size="full"
          type="password"
          value={form.password}
          placeholder="Senha"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <Button size="full" type="submit">
          Registrar
        </Button>
        <Button size="full" variant="outline" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </form>
    </Layout>
  );
}
