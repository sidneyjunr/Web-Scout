import React, { createContext, useState } from "react";

export const TimeB_Context = createContext();

export const TimeB_Provider = ({ children }) => {
  const [scoutB, setScoutB] = useState([]);
  const [historicoB, setHistoricoB] = useState([]); // [{ jogador, valorCesta }]

  function adicionarJogadorB(jogador) {
    setScoutB((props) => [
      ...props,
      {
        jogador: jogador,
        qtd_bola1: 0,
        qtd_bola2: 0,
        qtd_bola3: 0,
      },
    ]);
  }

  function registrarCestaB(jogador, valorCesta) {
    setScoutB((prev) =>
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
    setHistoricoB((prev) => [...prev, { jogador, valorCesta }]);
  }

  function desfazerUltimoPontoB() {
    setHistoricoB((prev) => {
      if (prev.length === 0) return prev;
      const historicoNovo = prev.slice(0, -1);
      setScoutB((scoutAnterior) => {
        const jogadoresNoHistorico = Array.from(new Set(historicoNovo.map(h => h.jogador)));
        let novoScout = scoutAnterior
          .filter(j => jogadoresNoHistorico.includes(j.jogador))
          .map(j => ({ ...j, qtd_bola1: 0, qtd_bola2: 0, qtd_bola3: 0 }));
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
    <TimeB_Context.Provider
      value={{ scoutB, setScoutB, adicionarJogadorB, registrarCestaB, desfazerUltimoPontoB }}
    >
      {children}
    </TimeB_Context.Provider>
  );
};
