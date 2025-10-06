import React, { useState } from "react";
import { RegisterType } from "../../types/usertypes";
import Button from "../../areaComponents/Button";
import InputTexto from "../../areaComponents/Text";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import LayoutPublic from "../../areaComponents/LayoutPublic";

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
    <LayoutPublic>
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Conta</h1>
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
          id="name"
          label="Nome"
          size="full"
          type="text"
          value={form.name}
          placeholder="Digite seu nome"
          onChange={e => setForm({ ...form, name: e.target.value })}
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
          Registrar
        </Button>
        <Button size="full" variant="outline" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </form>
    </LayoutPublic>
  );
}
