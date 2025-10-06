import React, { useState, useContext, useEffect } from "react";
import Button from "../../areaComponents/Button";
import { AuthContext } from "../../AuthContext";
import ExpenseModal from "../expense";
import ProfileModal from "./profileModal";
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
  const [isPerfilModalOpen, setPerfilModalOpen] = useState(false);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loadingExpenseTypes, setLoadingExpenseTypes] = useState(true);

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const res = await api.get("/types");
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

  function handleSignOut(): void {
    auth?.logout();
  }

  return (
    <div className="flex min-h-screen">
      <button
        className="md:hidden p-2 m-2 bg-white rounded-lg shadow-md z-40 fixed"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

     <div
        className={`bg-white border-r border-gray-200 px-6 py-6 w-64
          fixed inset-y-0 left-0 transform z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300
          md:translate-x-0 md:static md:block shadow-sm`}
      >

        <div className="mb-6 pb-4 border-b-2 border-gray-200">
          <h1 className="text-xl font-semibold mb-2 text-gray-900">Perfil</h1>
          <p className="text-sm text-gray-600">
            Olá, {auth?.user?.email ?? "usuário"}!
          </p>
        </div>
  
        <div className="flex flex-col gap-3">
           <Button
            size="full"
            variant="outline"
            onClick={() => setPerfilModalOpen(true)}
            >
            Perfil
          </Button>

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
  
          <Button size="full" variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
        
      </div>

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        expenseTypes={expenseTypes}
      />

      <ExpenseTypeModal
        isOpen={isExpenseTypeModalOpen}
        onClose={() => setIsExpenseTypeModalOpen(false)}
      />

      <ProfileModal
        isOpen={isPerfilModalOpen}
        onClose={() => setPerfilModalOpen(false)}
      />
    </div>
  );
}

export default Profile;