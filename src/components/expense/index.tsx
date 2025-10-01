import React, { useState, useContext, useEffect } from "react";
import Modal from "../../areaComponents/Modal";
import Button from "../../areaComponents/Button";
import { AuthContext } from "../../AuthContext";

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
  const auth = useContext(AuthContext);

  const [expenseTypeId, setExpenseTypeId] = useState<number>(0);
  const [value, setValue] = useState<number | "">("");
  const [date, setDate] = useState<string>("");

  // Reseta campos sempre que o modal abre
  useEffect(() => {
    if (isOpen) {
      setExpenseTypeId(0);
      setValue("");
      setDate("");
    }
  }, [isOpen]);

  const handleSave = () => {
    console.log({
      ExpenseTypeId: expenseTypeId,
      Value: value,
      Date: date,
      UserId: auth?.user?.id,
    });
    onClose();
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

        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button size="full" variant="filled" onClick={handleSave} disabled={expenseTypeId === 0 || !value || !date}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
