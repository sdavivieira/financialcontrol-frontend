import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export interface TipoDespesa {
  id: number;
  name: string;
  inicialValue: number;
  isFixed: boolean;
}

export function useTiposDespesas() {
  const [tiposDespesas, setTiposDespesas] = useState<TipoDespesa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await api.get("/types");
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data;
        setTiposDespesas(data);
      } catch {
        toast.error("Não foi possível carregar os tipos de despesas");
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, []);

  return { tiposDespesas, loading };
}
