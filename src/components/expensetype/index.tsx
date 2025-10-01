import React, { useState } from "react";
import Modal from "../../areaComponents/Modal";
import Button from "../../areaComponents/Button";

interface ExpenseTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseTypeModal: React.FC<ExpenseTypeModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [inicialValue, setInicialValue] = useState<number | "">("");
  const [isFixed, setIsFixed] = useState(false);

  const handleSave = () => {
    // Aqui você pode enviar para API
    console.log({
      Name: name,
      InicialValue: inicialValue,
      IsFixed: isFixed,
    });
    onClose();
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

        <Button size="full" variant="filled" onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
};

export default ExpenseTypeModal;
