import { useContext } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const PlacarPorQuartos = ({ time }) => {
  const { scoutA } = useContext(TimeA_Context);
  const { scoutB } = useContext(TimeB_Context);

  const dados = time === "timeA" ? scoutA : scoutB;
  const dadosOrdenados = [...dados].sort((a, b) => Number(a.jogador) - Number(b.jogador));

  if (!dadosOrdenados || dadosOrdenados.length === 0) {
    return <p className="mt-4">Nenhum jogador cadastrado ainda.</p>;
  }

  return (
    <table className="table-auto border border-gray-400 w-full text-xs md:text-base">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Nº Jogador</th>
          <th className="border px-2 py-1">1º Q</th>
          <th className="border px-2 py-1">2º Q</th>
          <th className="border px-2 py-1">3º Q</th>
          <th className="border px-2 py-1">4º Q</th>
          <th className="border px-2 py-1">3s Totais</th>
        </tr>
      </thead>
      <tbody>
        {dadosOrdenados.map((item) => {
          const tresTotais = item.qtd_bola3 || 0;
          const recent = item.lastUpdated && Date.now() - item.lastUpdated < 1200;
          return (
            <tr key={item.jogador} className={`text-center table-row-hover ${recent ? 'flash-red' : ''}`} tabIndex={0}>
              <td className="border px-2 py-1">{item.jogador}</td>
              <td className="border px-2 py-1">{item.pontos_quarto1 ?? 0}</td>
              <td className="border px-2 py-1">{item.pontos_quarto2 ?? 0}</td>
              <td className="border px-2 py-1">{item.pontos_quarto3 ?? 0}</td>
              <td className="border px-2 py-1">{item.pontos_quarto4 ?? 0}</td>
              <td className="border px-2 py-1">{tresTotais}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
