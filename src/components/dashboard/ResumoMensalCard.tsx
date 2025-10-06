import Card from "../../areaComponents/Card";

export default function ResumoMensalCard() {
  const handleExport = () => {
    alert("Exportando relatório em Excel...");
  };

  return (
    <Card 
      title="Resumo Mensal" 
      description="Gerar relatório do mês em Excel."
      tam={4}
    >
      <button
        onClick={handleExport}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
      >
        Exportar Excel
      </button>
    </Card>
  );
}