import React, { createContext, useState } from "react";

export const TimeA_Context = createContext();

export const TimeA_Provider = ({ children }) => {
  const [scoutA, setScoutA] = useState([]);
  const [historicoA, setHistoricoA] = useState([]); // [{ jogador, valorCesta }]

  function adicionarJogador(jogador) {
    setScoutA((props) => [
      ...props,
      {
        jogador: jogador,
        qtd_bola1: 0,
        qtd_bola2: 0,
        qtd_bola3: 0,
      },
    ]);
  }

  function registrarCesta(jogador, valorCesta) {
    setScoutA((prev) =>
      prev.map((item) =>
        item.jogador === jogador
          ? {
              ...item,
              qtd_bola1: valorCesta === 1 ? item.qtd_bola1 + 1 : item.qtd_bola1,
              qtd_bola2: valorCesta === 2 ? item.qtd_bola2 + 1 : item.qtd_bola2,
              qtd_bola3: valorCesta === 3 ? item.qtd_bola3 + 1 : item.qtd_bola3,
            }
          : item
      )
    );
    setHistoricoA((prev) => [...prev, { jogador, valorCesta }]);
  }

  function desfazerUltimoPontoA() {
    setHistoricoA((prev) => {
      if (prev.length === 0) return prev;
      const historicoNovo = prev.slice(0, -1);
      // Recalcula o scoutA do zero com o novo histórico
      setScoutA((scoutAnterior) => {
        // Lista de jogadores presentes no novo histórico
        const jogadoresNoHistorico = Array.from(new Set(historicoNovo.map(h => h.jogador)));
        // Cria lista apenas com jogadores do histórico
        let novoScout = scoutAnterior
          .filter(j => jogadoresNoHistorico.includes(j.jogador))
          .map(j => ({ ...j, qtd_bola1: 0, qtd_bola2: 0, qtd_bola3: 0 }));
        // Reaplica o histórico novo
        historicoNovo.forEach(({ jogador, valorCesta }) => {
          novoScout = novoScout.map(item => {
            if (item.jogador === jogador) {
              if (valorCesta === 1) return { ...item, qtd_bola1: item.qtd_bola1 + 1 };
              if (valorCesta === 2) return { ...item, qtd_bola2: item.qtd_bola2 + 1 };
              if (valorCesta === 3) return { ...item, qtd_bola3: item.qtd_bola3 + 1 };
            }
            return item;
          });
        });
        return novoScout;
      });
      return historicoNovo;
    });
  }

  return (
    <TimeA_Context.Provider
      value={{ scoutA, setScoutA, adicionarJogador, registrarCesta, desfazerUltimoPontoA }}
    >
      {children}
    </TimeA_Context.Provider>
  );
};
