import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useProfile} from "../../hooks/useProfile";
import api from "../../api";
import Modal from "../../areaComponents/Modal";
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile, loading } = useProfile();
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
      setSalary(profile.salary);
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      await api.put(`/profile?email=${profile.email}`, { email, salary });
      toast.success("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Salário:</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>

              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
