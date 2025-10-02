import React, { createContext, useState } from "react";

export const TimeA_Context = createContext();

export const TimeA_Provider = ({ children }) => {
  const [scoutA, setScoutA] = useState([]);
  const [historicoA, setHistoricoA] = useState([]); // [{ jogador, valorCesta, quarter }]

  function adicionarJogador(jogador) {
    setScoutA((props) => [
      ...props,
      {
        jogador: jogador,
        qtd_bola1: 0,
        qtd_bola2: 0,
        qtd_bola3: 0,
        pontos_quarto1: 0,
        pontos_quarto2: 0,
        pontos_quarto3: 0,
        pontos_quarto4: 0,
      },
    ]);
  }

  // registrarCesta agora recebe também o quarter (1..4)
  function registrarCesta(jogador, valorCesta, quarter = 1) {
    setScoutA((prev) =>
      prev.map((item) =>
        item.jogador === jogador
          ? {
              ...item,
              qtd_bola1: valorCesta === 1 ? item.qtd_bola1 + 1 : item.qtd_bola1,
              qtd_bola2: valorCesta === 2 ? item.qtd_bola2 + 1 : item.qtd_bola2,
              qtd_bola3: valorCesta === 3 ? item.qtd_bola3 + 1 : item.qtd_bola3,
              pontos_quarto1: quarter === 1 ? item.pontos_quarto1 + valorCesta : item.pontos_quarto1,
              pontos_quarto2: quarter === 2 ? item.pontos_quarto2 + valorCesta : item.pontos_quarto2,
              pontos_quarto3: quarter === 3 ? item.pontos_quarto3 + valorCesta : item.pontos_quarto3,
              pontos_quarto4: quarter === 4 ? item.pontos_quarto4 + valorCesta : item.pontos_quarto4,
              lastUpdated: Date.now(),
            }
          : item
      )
    );
    setHistoricoA((prev) => [...prev, { jogador, valorCesta, quarter }]);
  }

  function desfazerUltimoPontoA() {
    setHistoricoA((prev) => {
      if (prev.length === 0) return prev;
      const historicoNovo = prev.slice(0, -1);
      // Recalcula o scoutA do zero com o novo histórico
      setScoutA((scoutAnterior) => {
        // Lista de jogadores presentes no novo histórico
        const jogadoresNoHistorico = Array.from(new Set(historicoNovo.map((h) => h.jogador)));
        // Cria lista apenas com jogadores do histórico e zera contadores
        let novoScout = scoutAnterior
          .filter((j) => jogadoresNoHistorico.includes(j.jogador))
          .map((j) => ({
            ...j,
            qtd_bola1: 0,
            qtd_bola2: 0,
            qtd_bola3: 0,
            pontos_quarto1: 0,
            pontos_quarto2: 0,
            pontos_quarto3: 0,
            pontos_quarto4: 0,
          }));
        // Reaplica o histórico novo
        historicoNovo.forEach(({ jogador, valorCesta, quarter }) => {
          novoScout = novoScout.map((item) => {
            if (item.jogador === jogador) {
              if (valorCesta === 1) item = { ...item, qtd_bola1: item.qtd_bola1 + 1 };
              if (valorCesta === 2) item = { ...item, qtd_bola2: item.qtd_bola2 + 1 };
              if (valorCesta === 3) item = { ...item, qtd_bola3: item.qtd_bola3 + 1 };
              if (quarter === 1) item = { ...item, pontos_quarto1: item.pontos_quarto1 + valorCesta };
              if (quarter === 2) item = { ...item, pontos_quarto2: item.pontos_quarto2 + valorCesta };
              if (quarter === 3) item = { ...item, pontos_quarto3: item.pontos_quarto3 + valorCesta };
              if (quarter === 4) item = { ...item, pontos_quarto4: item.pontos_quarto4 + valorCesta };
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
