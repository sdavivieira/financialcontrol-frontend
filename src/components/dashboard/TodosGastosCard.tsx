import Card from "../../areaComponents/Card";
import { TipoGastos } from "../../hooks/useGastos";

export default function TodosGastosCard({ gastos }: { gastos: TipoGastos[] }) {
  return (
    <Card title="Todos os Gastos" tam={6}>
      <div className="space-y-2">
        {gastos.map((g) => (
          <div
            key={g.id}
            className="flex justify-between items-center p-2.5 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <span className="text-gray-800 font-medium text-sm">{g.name}</span>
            <span className="text-emerald-600 font-semibold text-sm">
              R$ {g.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
