import Card from "../../areaComponents/Card";
import { TipoGastos } from "../../hooks/useGastos";
import { somarGastosPorTipo } from "../../util/Funcoes";

export default function GastosPorTipoCard({ gastos }: { gastos: TipoGastos[] }) {
  // Agrupar e somar os gastos por tipo
  const gastosAgrupados = somarGastosPorTipo(gastos);
  const maxValor = Math.max(...gastosAgrupados.map(g => g.value), 1); 

  return (
    <Card title="Gastos por Tipo de Despesa" tam={6}>
      <div className="flex items-end justify-around h-64 gap-4">
        {gastosAgrupados.map((g, index) => {
          const altura = (g.value / maxValor) * 100;
          const cores = ["bg-emerald-500", "bg-emerald-600", "bg-emerald-700", "bg-emerald-400", "bg-emerald-300"];
          const cor = cores[index % cores.length];

          return (
            <div key={g.expenseTypeId} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center justify-end h-48">
                <div
                  className={`w-full ${cor} rounded-t-lg transition-all hover:opacity-80 cursor-pointer`}
                  style={{ height: `${altura}%` }}
                  title={`R$ ${g.value.toFixed(2)}`}
                />
              </div>

              <div className="text-emerald-600 font-bold text-sm mt-2">
                R$ {g.value.toFixed(2)}
              </div>

              <div className="text-gray-700 font-medium text-xs text-center mt-1">
                {g.name}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
