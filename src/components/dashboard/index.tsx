import React from "react";
import Layout from "../../areaComponents/Layout";
import TiposDespesasCard from "./TiposDespesasCard";
import GastosCategoriaCard from "./GastosCategoriaCard";
import ResumoMensalCard from "./ResumoMensalCard";
import TodosGastosCard from "./TodosGastosCard";
import GastosPorTipoCard from "./GastosPorTipoCard";
import { useGastos } from "../../hooks/useGastos";
import { useTiposDespesas } from "../../hooks/useTiposDespesas";
import { useProfile } from "../../hooks/useProfile";

function Dashboard() {
  const { tiposGastos, loading: loadingGastos } = useGastos();
  const { tiposDespesas, loading: loadingTipos } = useTiposDespesas();
  const { profile, loading: loadingProfile } = useProfile();

  if (loadingGastos || loadingTipos || loadingProfile) {
    return (
      <Layout>
        <p className="text-gray-600">Carregando dados...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Cards de despesas */}
        <TiposDespesasCard tipos={tiposDespesas} />

        <GastosCategoriaCard 
          gastos={tiposGastos} 
          tipoDespesas={tiposDespesas} 
          profile={profile} 
        />

        <ResumoMensalCard />   
        <TodosGastosCard gastos={tiposGastos} />
        <GastosPorTipoCard gastos={tiposGastos} />
      </div>
    </Layout>
  );
}

export default Dashboard;
