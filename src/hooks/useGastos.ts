import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

export interface TipoGastos {
  id: number;
  name: string;
  value: number;
  expenseTypeId: number;
}

export function useGastos() {
  const [tiposGastos, setTiposGastos] = useState<TipoGastos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await api.get("/expense");
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        setTiposGastos(data);
      } catch {
        toast.error("Não foi possível carregar os tipos de despesas");
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, []);

  return { tiposGastos, loading };
}
