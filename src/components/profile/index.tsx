import React, { useState, useContext, useEffect } from "react";
import Button from "../../areaComponents/Button";
import { AuthContext } from "../../AuthContext";
import ExpenseModal from "../expense";
import ExpenseTypeModal from "../expensetype";
import api from "../../api";

interface ExpenseType {
  id: number;
  name: string;
}

function Profile() {
  const auth = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isExpenseTypeModalOpen, setIsExpenseTypeModalOpen] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loadingExpenseTypes, setLoadingExpenseTypes] = useState(true);

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const res = await api.get("/types");

        // Ajuste caso a API retorne { data: [...] }
        const typesArray = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

        setExpenseTypes(typesArray);
      } catch (error) {
        console.error("Erro ao buscar tipos de despesa:", error);
        setExpenseTypes([]);
      } finally {
        setLoadingExpenseTypes(false);
      }
    };

    fetchExpenseTypes();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Botão hamburger mobile */}
      <button
        className="md:hidden p-2 m-2 bg-green-200 rounded z-40 fixed"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-green-50 w-64 p-4 shadow-lg 
          fixed inset-y-0 left-0 transform z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300
          md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Perfil</h1>
        <p className="text-center text-lg mb-6">
          Olá, {auth?.user?.email ?? "usuário"}!
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            size="full"
            variant="outline"
            onClick={() => setIsExpenseModalOpen(true)}
            disabled={loadingExpenseTypes}
          >
            {loadingExpenseTypes ? "Carregando tipos..." : "Registrar Despesa"}
          </Button>

          <Button
            size="full"
            variant="outline"
            onClick={() => setIsExpenseTypeModalOpen(true)}
          >
            Registrar Tipo de Despesa
          </Button>
        </div>
      </div>

      {/* Modais */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        expenseTypes={expenseTypes}
      />

      <ExpenseTypeModal
        isOpen={isExpenseTypeModalOpen}
        onClose={() => setIsExpenseTypeModalOpen(false)}
      />
    </div>
  );
}

export default Profile;
