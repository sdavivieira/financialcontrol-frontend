import Card from "../../areaComponents/Card";
import { TipoDespesa } from "../../hooks/useTiposDespesas";

export default function TiposDespesasCard({ tipos }: { tipos: TipoDespesa[] }) {
console.log(tipos)
  return (
    <Card
      title="Tipos de Despesas"
      description="Visualize todos os tipos de despesas cadastradas."
      tam={4}
    >
      <div className="max-h-48 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase text-gray-500 border-b">
            <tr>
              <th className="py-2 px-2">Despesa</th>
              <th className="py-2 px-2">Valor Inicial</th>
              <th className="py-2 px-2">FIXO</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              
              <tr key={tipo.id} className="border-b last:border-0">
                <td className="py-2 px-2 font-medium text-green-600">{tipo.name}</td>
                <td className="py-2 px-2 font-semibold">
                  R$ {tipo.inicialValue.toFixed(2)}
                </td>
                <td className="py-2 px-2 font-semibold">
                  {tipo.isFixed ? "SIM" : "NÃO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
