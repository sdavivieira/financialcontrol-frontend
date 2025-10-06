import { useContext, useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

export interface Profile {
  userId: number;
  email: string;
  salary: number;
}

export function useProfile() {
  const auth = useContext(AuthContext);

  // Inicializando com valores padrão para não usar null
  const [profile, setProfile] = useState<Profile>({
    userId: 0,
    email: "",
    salary: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const email = auth?.user?.email;
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/profile?email=${email}`);
        const data: Profile = response.data.data;
        setProfile(data);
      } catch (error) {
        toast.error("Não foi possível carregar o perfil do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth?.user?.email]);

  return { profile, loading };
}
