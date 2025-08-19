import { useContext } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const Placar = ({ time }) => {
  const { scoutA } = useContext(TimeA_Context);
  const { scoutB } = useContext(TimeB_Context);

  const dados = time === "timeA" ? scoutA : scoutB;
  const dadosOrdenados = [...dados].sort((a, b) => Number(a.jogador) - Number(b.jogador));

  if (!dadosOrdenados || dadosOrdenados.length === 0) {
    return <p className="mt-4">Nenhum jogador cadastrado ainda.</p>;
  }

  return (
    <div className="mt-6 w-full max-w-xs mx-auto md:max-w-lg overflow-x-auto">
      <table className="table-auto border border-gray-400 w-full text-xs md:text-base">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Nº Jogador</th>
            <th className="border px-2 py-1">1 Ponto</th>
            <th className="border px-2 py-1">2 Pontos</th>
            <th className="border px-2 py-1">3 Pontos</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.map((item) => {
            const total =
              item.qtd_bola1 * 1 +
              item.qtd_bola2 * 2 +
              item.qtd_bola3 * 3;

            return (
              <tr key={item.jogador} className="text-center">
                <td className="border px-2 py-1">{item.jogador}</td>
                <td className="border px-2 py-1">{item.qtd_bola1}</td>
                <td className="border px-2 py-1">{item.qtd_bola2}</td>
                <td className="border px-2 py-1">{item.qtd_bola3}</td>
                <td className="border px-2 py-1 font-bold">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
