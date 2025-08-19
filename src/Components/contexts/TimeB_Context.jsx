import React, { createContext, useState } from "react";

export const TimeB_Context = createContext();

export const TimeB_Provider = ({ children }) => {
  const [scoutB, setScoutB] = useState([]);

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
  }

  return (
    <TimeB_Context.Provider
      value={{ scoutB, setScoutB, adicionarJogadorB, registrarCestaB }}
    >
      {children}
    </TimeB_Context.Provider>
  );
};
