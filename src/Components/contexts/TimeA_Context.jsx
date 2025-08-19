import React, { createContext, useState } from "react";

export const TimeA_Context = createContext();

export const TimeA_Provider = ({ children }) => {
  const [scoutA, setScoutA] = useState([]);

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
  }

  return (
    <TimeA_Context.Provider
      value={{ scoutA, setScoutA, adicionarJogador, registrarCesta }}
    >
      {children}
    </TimeA_Context.Provider>
  );
};
