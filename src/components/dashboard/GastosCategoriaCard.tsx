import Card from "../../areaComponents/Card";
import { TipoGastos } from "../../hooks/useGastos";
import { limitePorGastosInformado } from "../../util/Funcoes";
import { Profile } from "../../hooks/useProfile";
import { TipoDespesa } from "../../hooks/useTiposDespesas";


interface GastosCategoriaCardProps {
  gastos: TipoGastos[];
  tipoDespesas: TipoDespesa[];
  profile: Profile;
}

export default function GastosCategoriaCard({ gastos, tipoDespesas, profile }: GastosCategoriaCardProps) {
  const total = gastos.reduce((acc, g) => acc + g.value, 0);
  const limite = limitePorGastosInformado(gastos, profile);

  return (
    <Card 
      title="Somatório dos Gastos" 
      description="Total de gastos e comparação com o limite definido."
      tam={4} 
    >
      <div>
        <span className="text-green-600 font-bold text-xl block">
          Total: R$ {total.toFixed(2)}
        </span>
        <span className="text-blue-600 font-bold text-xl block">
          Limite: R$ {limite.toFixed(2)}
        </span>
      </div>
    </Card>
  );
}
