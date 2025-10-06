// expensetype/index.tsx
import React, { useState } from "react";
import Modal from "../../areaComponents/Modal";
import Button from "../../areaComponents/Button";
import api from "../../api";
import { toast } from "react-toastify";

interface ExpenseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseTypeModal: React.FC<ExpenseTypeModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [inicialValue, setInicialValue] = useState<number | "">("");
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post("/registertype", {
        name,
        inicialValue: Number(inicialValue),
        isFixed,
      });
      toast.success("Tipo de despesa registrado com sucesso!");
      setName("");
      setInicialValue("");
      setIsFixed(false);
      onClose();
    } catch (error) {
      toast.error("Erro ao registrar tipo de despesa!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Tipo de Despesa">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome do Tipo de Despesa"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor Inicial"
          className="p-2 border rounded"
          value={inicialValue}
          onChange={(e) => setInicialValue(Number(e.target.value))}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFixed}
            onChange={(e) => setIsFixed(e.target.checked)}
          />
          Fixa
        </label>

        <Button size="full" variant="filled" onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </Modal>
  );
};

export default ExpenseTypeModal;
