import React, { useState,  useEffect } from "react";
import Modal from "../../areaComponents/Modal";
import Button from "../../areaComponents/Button";
import api from "../../api";
import { toast } from "react-toastify";

interface ExpenseType {
  id: number;
  name: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseTypes: ExpenseType[];
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, expenseTypes }) => {

  const [expenseTypeId, setExpenseTypeId] = useState<number>(0);
  const [value, setValue] = useState<number | "">("");

  useEffect(() => {
    if (isOpen) {
      setExpenseTypeId(0);
      setValue("");
    }
  }, [isOpen]);

 const handleSave = async () => {
  try {
    const response = await api.post("/register", {
      expenseTypeId: expenseTypeId,
      value: value,
    });

    if(response.data.success){
      toast.success("Despesa salva com sucesso!");
      onClose();
    }
  } catch (error) {
    console.error("Erro ao salvar despesa:", error);
    toast.error("Não foi possível salvar a despesa");
  }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Despesa">
      <div className="flex flex-col gap-4">
        <select
          className="p-2 border rounded"
          value={expenseTypeId}
          onChange={(e) => setExpenseTypeId(Number(e.target.value))}
        >
          <option value={0}>
            {expenseTypes.length === 0 ? "Carregando..." : "Selecione o tipo de despesa"}
          </option>

          {Array.isArray(expenseTypes) &&
            expenseTypes.map((et) => (
              <option key={et.id} value={et.id}>
                {et.name}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="Valor"
          className="p-2 border rounded"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />


        <Button size="full" variant="filled" onClick={handleSave} disabled={expenseTypeId === 0 || !value}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
