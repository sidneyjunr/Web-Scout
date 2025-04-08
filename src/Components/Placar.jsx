import React from "react";

export const Placar = ({ timeA, timeB, scoutTimeA, scoutTimeB }) => {
  const calcularPontos = (scout) =>
    scout.reduce(
      (acc, j) =>
        acc + j.pontuacao[1] * 1 + j.pontuacao[2] * 2 + j.pontuacao[3] * 3,
      0
    );

  const renderTabela = (scout, nomeTime) => (
    <div className="mt-8">
      <h2 className="text-xl text-center mb-4">{nomeTime} - Tabela de Pontuação</h2>
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Número do Jogador</th>
            <th className="px-4 py-2 border">Bolas de 1</th>
            <th className="px-4 py-2 border">Bolas de 2</th>
            <th className="px-4 py-2 border">Bolas de 3</th>
            <th className="px-4 py-2 border">Total de Pontos</th>
          </tr>
        </thead>
        <tbody>
          {scout.map((jogadorData, index) => {
            const totalPontos =
              jogadorData.pontuacao[1] * 1 +
              jogadorData.pontuacao[2] * 2 +
              jogadorData.pontuacao[3] * 3;
            return (
              <tr key={index}>
                <td className="px-4 py-2 border">{jogadorData.jogador}</td>
                <td className="px-4 py-2 border">{jogadorData.pontuacao[1]}</td>
                <td className="px-4 py-2 border">{jogadorData.pontuacao[2]}</td>
                <td className="px-4 py-2 border">{jogadorData.pontuacao[3]}</td>
                <td className="px-4 py-2 border">{totalPontos}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const pontosTimeA = calcularPontos(scoutTimeA);
  const pontosTimeB = calcularPontos(scoutTimeB);

  if (pontosTimeA === 0 && pontosTimeB === 0) return null;

  return (
    <>
      <div className="flex justify-center gap-8 text-2xl font-bold mt-8">
        <div>{timeA}: {pontosTimeA}</div>
        <div>{timeB}: {pontosTimeB}</div>
      </div>

      {renderTabela(scoutTimeA, timeA)}
      {renderTabela(scoutTimeB, timeB)}
    </>
  );
};
