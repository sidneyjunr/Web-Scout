import React, { createContext, useState } from "react";

export const TimeB_Context = createContext();

export const TimeB_Provider = ({ children }) => {
  const [scoutB, setScoutB] = useState([]);
  const [historicoB, setHistoricoB] = useState([]); // [{ jogador, valorCesta, quarter }]
  const [currentQuarterB, setCurrentQuarterB] = useState(1);

  function adicionarJogadorB(jogador) {
    setScoutB((props) => [
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

  function registrarCestaB(jogador, valorCesta, quarter = 1) {
    setScoutB((prev) => {
      let found = false;
      const updated = prev.map((item) => {
        if (item.jogador === jogador) {
          found = true;
          return {
            ...item,
            qtd_bola1: valorCesta === 1 ? item.qtd_bola1 + 1 : item.qtd_bola1,
            qtd_bola2: valorCesta === 2 ? item.qtd_bola2 + 1 : item.qtd_bola2,
            qtd_bola3: valorCesta === 3 ? item.qtd_bola3 + 1 : item.qtd_bola3,
            pontos_quarto1:
              quarter === 1 ? item.pontos_quarto1 + valorCesta : item.pontos_quarto1,
            pontos_quarto2:
              quarter === 2 ? item.pontos_quarto2 + valorCesta : item.pontos_quarto2,
            pontos_quarto3:
              quarter === 3 ? item.pontos_quarto3 + valorCesta : item.pontos_quarto3,
            pontos_quarto4:
              quarter === 4 ? item.pontos_quarto4 + valorCesta : item.pontos_quarto4,
            lastUpdated: Date.now(),
          };
        }
        return item;
      });
      if (!found) {
        const novo = {
          jogador: jogador,
          qtd_bola1: valorCesta === 1 ? 1 : 0,
          qtd_bola2: valorCesta === 2 ? 1 : 0,
          qtd_bola3: valorCesta === 3 ? 1 : 0,
          pontos_quarto1: quarter === 1 ? valorCesta : 0,
          pontos_quarto2: quarter === 2 ? valorCesta : 0,
          pontos_quarto3: quarter === 3 ? valorCesta : 0,
          pontos_quarto4: quarter === 4 ? valorCesta : 0,
          lastUpdated: Date.now(),
        };
        return [...updated, novo];
      }
      return updated;
    });
    setHistoricoB((prev) => [...prev, { jogador, valorCesta, quarter }]);
  }

  function desfazerUltimoPontoB(quarter = null) {
    setHistoricoB((prev) => {
      if (prev.length === 0) return prev;
      const ultimo = prev[prev.length - 1];
      if (quarter !== null && ultimo && ultimo.quarter !== quarter) return prev;
      const historicoNovo = prev.slice(0, -1);
      setScoutB((scoutAnterior) => {
        const jogadoresNoHistorico = Array.from(
          new Set(historicoNovo.map((h) => h.jogador))
        );
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
        historicoNovo.forEach(({ jogador, valorCesta, quarter }) => {
          novoScout = novoScout.map((item) => {
            if (item.jogador === jogador) {
              if (valorCesta === 1)
                item = { ...item, qtd_bola1: item.qtd_bola1 + 1 };
              if (valorCesta === 2)
                item = { ...item, qtd_bola2: item.qtd_bola2 + 1 };
              if (valorCesta === 3)
                item = { ...item, qtd_bola3: item.qtd_bola3 + 1 };
              if (quarter === 1)
                item = {
                  ...item,
                  pontos_quarto1: item.pontos_quarto1 + valorCesta,
                };
              if (quarter === 2)
                item = {
                  ...item,
                  pontos_quarto2: item.pontos_quarto2 + valorCesta,
                };
              if (quarter === 3)
                item = {
                  ...item,
                  pontos_quarto3: item.pontos_quarto3 + valorCesta,
                };
              if (quarter === 4)
                item = {
                  ...item,
                  pontos_quarto4: item.pontos_quarto4 + valorCesta,
                };
            }
            return item;
          });
        });
        return novoScout;
      });
      return historicoNovo;
    });
  }

  function resetQuarterB(quarterToReset) {
    setHistoricoB((prev) => {
      const historicoNovo = prev.filter((h) => h.quarter !== quarterToReset);
      setScoutB((scoutAnterior) => {
        const jogadoresSet = new Set([
          ...scoutAnterior.map((s) => s.jogador),
          ...historicoNovo.map((h) => h.jogador),
        ]);
        let novoScout = Array.from(jogadoresSet).map((jogador) => ({
          jogador: jogador,
          qtd_bola1: 0,
          qtd_bola2: 0,
          qtd_bola3: 0,
          pontos_quarto1: 0,
          pontos_quarto2: 0,
          pontos_quarto3: 0,
          pontos_quarto4: 0,
        }));

        historicoNovo.forEach(({ jogador, valorCesta, quarter }) => {
          novoScout = novoScout.map((item) => {
            if (item.jogador === jogador) {
              if (valorCesta === 1) item.qtd_bola1 = item.qtd_bola1 + 1;
              if (valorCesta === 2) item.qtd_bola2 = item.qtd_bola2 + 1;
              if (valorCesta === 3) item.qtd_bola3 = item.qtd_bola3 + 1;
              if (quarter === 1) item.pontos_quarto1 = item.pontos_quarto1 + valorCesta;
              if (quarter === 2) item.pontos_quarto2 = item.pontos_quarto2 + valorCesta;
              if (quarter === 3) item.pontos_quarto3 = item.pontos_quarto3 + valorCesta;
              if (quarter === 4) item.pontos_quarto4 = item.pontos_quarto4 + valorCesta;
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
      value={{
        scoutB,
        setScoutB,
        adicionarJogadorB,
        registrarCestaB,
        desfazerUltimoPontoB,
        currentQuarter: currentQuarterB,
        advanceQuarter: () => setCurrentQuarterB((q) => (q >= 4 ? 4 : q + 1)),
        resetQuarter: resetQuarterB,
      }}
    >
      {children}
    </TimeB_Context.Provider>
  );
};
