import { useContext, useState, useRef, useEffect } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const FormScout = ({ time, desfazerPonto, quarter = 1, encerrarQuarter }) => {
  const { scoutA, adicionarJogador, registrarCesta } = useContext(TimeA_Context);
  const { scoutB, adicionarJogadorB, registrarCestaB } = useContext(TimeB_Context);

  const [jogador, setJogador] = useState("");
  const [valorCesta, setValorCesta] = useState("");
  const [jogadorPisca, setJogadorPisca] = useState(false);
  const [valorCestaPisca, setValorCestaPisca] = useState(false);

  const inputJogadorRef = useRef(null);
  const inputValorCestaRef = useRef(null);

  useEffect(() => {
    if (inputJogadorRef.current) {
      inputJogadorRef.current.focus();
    }
  }, []);

  function handleJogadorKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValorCestaRef.current) {
        inputValorCestaRef.current.focus();
      }
    }
  }

  function handleValorCestaKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitScout(e);
    }
  }

  function handleJogadorChange(e) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setJogador(value);
      setJogadorPisca(false);
    } else {
      setJogador(jogador);
      setJogadorPisca(true);
      setTimeout(() => setJogadorPisca(false), 200);
    }
  }

  function handleValorCestaChange(e) {
    const value = e.target.value;
    if (value === "" || value === "1" || value === "2" || value === "3") {
      setValorCesta(value);
      setValorCestaPisca(false);
    } else {
      setValorCesta(valorCesta);
      setValorCestaPisca(true);
      setTimeout(() => setValorCestaPisca(false), 200);
    }
  }

  function handleSubmitScout(e) {
    e.preventDefault();
    if (jogador === "" || valorCesta === "") {
      if (jogador === "") {
        setJogadorPisca(true);
        setTimeout(() => setJogadorPisca(false), 200);
        if (inputJogadorRef.current) {
          inputJogadorRef.current.focus();
        }
      } else if (valorCesta === "") {
        setValorCestaPisca(true);
        setTimeout(() => setValorCestaPisca(false), 200);
        if (inputValorCestaRef.current) {
          inputValorCestaRef.current.focus();
        }
      }
      return;
    }
    const valor = Number(valorCesta);
    if (time === "timeA") {
      const jogadorExiste = scoutA.some((item) => item.jogador === jogador);
      if (!jogadorExiste) {
        adicionarJogador(jogador);
      }
      registrarCesta(jogador, valor, quarter);
    } else {
      const jogadorExiste = scoutB.some((item) => item.jogador === jogador);
      if (!jogadorExiste) {
        adicionarJogadorB(jogador);
      }
      registrarCestaB(jogador, valor, quarter);
    }
    setJogador("");
    setValorCesta("");
    if (inputJogadorRef.current) {
      inputJogadorRef.current.focus();
    }
  }

  return (
    <form onSubmit={handleSubmitScout} className="space-y-2 flex flex-col bg-white p-4 rounded shadow w-full max-w-xs mx-auto md:max-w-md">
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="numero_jogador" className="text-sm md:text-base mb-0 flex-1">Digite o número do jogador</label>
        {desfazerPonto && ((time === "timeA" ? scoutA.length > 0 : scoutB.length > 0)) && (
          <button
            type="button"
            onClick={desfazerPonto}
            className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-xs text-white border border-red-600 focus:outline-red-400 focus:ring-2 focus:ring-red-300 active:bg-red-700 transition-all"
            title="Desfazer último ponto"
            style={{ minWidth: 60, flexShrink: 0 }}
          >
            Desfazer último ponto
          </button>
        )}
      </div>
      <input
        type="tel"
        id="numero_jogador"
        placeholder="Número do jogador"
        value={jogador}
        onChange={handleJogadorChange}
        ref={inputJogadorRef}
        onKeyDown={handleJogadorKeyDown}
        className={`border-2 ${jogadorPisca ? 'border-red-500 animate-[blink_0.3s_2]' : 'border-gray-300'} rounded px-2 py-2 focus:outline-none text-base md:text-lg`}
        inputMode="numeric"
        pattern="[0-9]*"
        style={jogadorPisca ? { boxShadow: '0 0 0 2px #ef4444' } : {}}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <label htmlFor="valor_cesta" className="text-sm md:text-base">Valor da Cesta?</label>
      <input
        type="tel"
        placeholder="1 2 ou 3"
        id="valor_cesta"
        value={valorCesta}
        onChange={handleValorCestaChange}
        ref={inputValorCestaRef}
        onKeyDown={handleValorCestaKeyDown}
        className={`border-2 ${valorCestaPisca ? 'border-red-500 animate-[blink_0.3s_2]' : 'border-gray-300'} rounded px-2 py-2 focus:outline-none text-base md:text-lg`}
        inputMode="numeric"
        pattern="[1-3]*"
        style={valorCestaPisca ? { boxShadow: '0 0 0 2px #ef4444' } : {}}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <div className="flex flex-col gap-2">
        <button
          className="w-full py-2 mt-2 bg-blue-400 text-white rounded text-base md:text-lg font-semibold shadow ripple"
          onClick={(e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const span = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            span.style.width = span.style.height = size + 'px';
            span.style.left = e.clientX - rect.left - size / 2 + 'px';
            span.style.top = e.clientY - rect.top - size / 2 + 'px';
            btn.appendChild(span);
            setTimeout(() => span.remove(), 600);
          }}
        >
          Avançar
        </button>
        <button
          type="button"
          onClick={(e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const span = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            span.style.width = span.style.height = size + 'px';
            span.style.left = e.clientX - rect.left - size / 2 + 'px';
            span.style.top = e.clientY - rect.top - size / 2 + 'px';
            btn.appendChild(span);
            setTimeout(() => span.remove(), 600);
            encerrarQuarter && encerrarQuarter();
          }}
          className="w-full py-2 bg-yellow-400 text-white rounded text-sm md:text-base font-semibold shadow ripple"
        >
          Encerrar quarto
        </button>
      </div>
    </form>
  );
};
