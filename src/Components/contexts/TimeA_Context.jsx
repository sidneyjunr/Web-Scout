import React, { createContext, useState } from "react";

export const TimeA_Context = createContext();

export const TimeA_Provider = ({ children }) => {
  const [scoutA, setScoutA] = useState([]);
  const [historicoA, setHistoricoA] = useState([]); // [{ jogador, valorCesta, quarter }]
  const [currentQuarterA, setCurrentQuarterA] = useState(1);

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
    setScoutA((prev) => {
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
        // jogador não existia: cria com os valores iniciais já aplicando a cesta e lastUpdated
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
    setHistoricoA((prev) => [...prev, { jogador, valorCesta, quarter }]);
  }

  function desfazerUltimoPontoA(quarter = null) {
    setHistoricoA((prev) => {
      if (prev.length === 0) return prev;
      // se foi passado um quarter, só desfazer se o último ponto for desse quarter
      const ultimo = prev[prev.length - 1];
      if (quarter !== null && ultimo && ultimo.quarter !== quarter) return prev;
      const historicoNovo = prev.slice(0, -1);
      // Recalcula o scoutA do zero com o novo histórico
      setScoutA((scoutAnterior) => {
        // Lista de jogadores presentes no novo histórico
        const jogadoresNoHistorico = Array.from(
          new Set(historicoNovo.map((h) => h.jogador))
        );
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

  function resetQuarterA(quarterToReset) {
    setHistoricoA((prev) => {
      const historicoNovo = prev.filter((h) => h.quarter !== quarterToReset);
      // Recalcula o scoutA a partir do novo histórico, preservando jogadores já existentes
      setScoutA((scoutAnterior) => {
        // jogadores: união entre jogadores atuais e do histórico novo
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
    <TimeA_Context.Provider
      value={{
        scoutA,
        setScoutA,
        adicionarJogador,
        registrarCesta,
        desfazerUltimoPontoA,
        currentQuarter: currentQuarterA,
        advanceQuarter: () => setCurrentQuarterA((q) => (q >= 4 ? 4 : q + 1)),
        resetQuarter: resetQuarterA,
      }}
    >
      {children}
    </TimeA_Context.Provider>
  );
};
