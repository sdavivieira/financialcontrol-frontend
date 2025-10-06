import { TipoGastos } from "../hooks/useGastos";
import {Profile} from "../hooks/useProfile";


export function somarGastosPorTipo(gastos: TipoGastos[]) {
  const resultado: { expenseTypeId: number; name: string; value: number }[] = [];

  gastos.forEach(g => {
    const existente = resultado.find(r => r.expenseTypeId === g.expenseTypeId && r.name === g.name);

    if (existente) {
      existente.value += Number(g.value);
    } else {
      resultado.push({ ...g, value: Number(g.value) });
    }
  });

  return resultado;
}

export function limitePorGastosInformado(TipoDespesas: TipoGastos[], profile: Profile): number {
    const somaDespesa: number =  TipoDespesas.reduce((acc, g) => acc + g.value, 0);
    const salary: number = profile.salary;
    
    const result: number = salary - somaDespesa;
    return result;
}
