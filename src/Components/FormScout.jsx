import { useContext, useState } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const FormScout = ({ time }) => {
  const { scoutA, registrarCesta, adicionarJogador } = useContext(TimeA_Context);
  const { scoutB,registrarCestaB,adicionarJogadorB } = useContext(TimeB_Context);
  const [jogador, setJogador] = useState("");
  const [valorCesta, setValorCesta] = useState(0);

  function handleSubmitScout(e) {
    e.preventDefault();
    if (time === "timeA") {
        const jogadorExiste = scoutA.some((item) => item.jogador === jogador);
        if(!jogadorExiste){

            adicionarJogador(jogador);
        }
        registrarCesta(jogador,Number(valorCesta))

    }else{
        const jogadorExiste = scoutB.some((item) => item.jogador === jogador);
        if(!jogadorExiste){

            adicionarJogadorB(jogador);
        }
        registrarCestaB(jogador,Number(valorCesta))
    }

    setJogador("");
    setValorCesta("");
  }
  return (
    <>
      <form onSubmit={handleSubmitScout}>
        <label htmlFor="numero_jogador">Digite o número do jogador</label>
        <input
          type="number"
          id="numero_jogador"
          placeholder="Número do jogador"
          value={jogador}
          onChange={({ target }) => setJogador(target.value)}
        />

        <label htmlFor="valor_cesta">Valor da Cesta?</label>
        <input
          type="number"
          placeholder="1 2 ou 3"
          id="valor_cesta"
          value={valorCesta}
          onChange={({ target }) => setValorCesta(target.value)}
        />
        <button>Avançar</button>
      </form>
    </>
  );
}
