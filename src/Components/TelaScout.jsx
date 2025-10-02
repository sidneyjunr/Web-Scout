import { useContext, useRef, useState, useEffect } from "react";
import { Settings2 } from "lucide-react";
import { PlacarTotal } from "./PlacarTotal";
import { FormScout } from "./FormScout";
import { Placar } from "./Placar";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const TelaScout = ({ timeA, timeB, timeAtual, setTimeAtual }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [quarter, setQuarter] = useState(1);
  const [pulse, setPulse] = useState(false);
  const configRef = useRef(null);
  const { setScoutA, desfazerUltimoPontoA } = useContext(TimeA_Context);
  const { setScoutB, desfazerUltimoPontoB } = useContext(TimeB_Context);

  function handleReset() {
    if (timeAtual === timeA) setScoutA([]);
    if (timeAtual === timeB) setScoutB([]);
    setShowConfig(false);
  }
  
  function desfazerPonto(){
    // Função para desfazer o último ponto computado
    if (timeAtual === timeA) {
      desfazerUltimoPontoA();
    } else if (timeAtual === timeB) {
      desfazerUltimoPontoB();
    }
  }

  function encerrarQuarter() {
    setQuarter((q) => (q >= 4 ? 1 : q + 1));
    setPulse(true);
    setTimeout(() => setPulse(false), 700);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (configRef.current && !configRef.current.contains(event.target)) {
        setShowConfig(false);
      }
    }
    if (showConfig) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfig]);

  return (
    <div className="flex flex-col items-center mt-4 w-full relative">
      <div className="flex w-full justify-between items-center mb-2 ">
        <PlacarTotal time="timeA"/>
        <h1 className="text-base md:text-xl font-semibold text-center w-full ">{timeAtual}</h1>
        <PlacarTotal time="timeB"/>
      </div>
      <div className="flex w-full mb-4 items-center justify-center">
        <div className="flex flex-1 justify-center gap-8 max-w-md relative">
          {/* Botão time A com config absoluto à esquerda */}
          <div className="relative flex items-center">
            <button
              onClick={() => setTimeAtual(timeA)}
              className={`w-32 px-4 py-2 rounded-full text-base md:text-lg ${
                timeAtual === timeA ? "bg-blue-400" : "bg-blue-200"
              }`}
            >
              {timeA}
            </button>
            {timeAtual === timeA && (
              <button
                className="absolute left-0 -translate-x-full p-2 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
                style={{ top: '50%', transform: 'translateY(-50%) translateX(-100%)' }}
                onClick={() => setShowConfig((v) => !v)}
                aria-label="Configuração do time A"
              >
                <Settings2 size={20} />
              </button>
            )}
            {showConfig && timeAtual === timeA && (
              <div ref={configRef} className="absolute left-0 mt-2 z-10 bg-white border border-gray-300 rounded shadow-lg p-2 min-w-[180px]" style={{ top: '100%' }}>
                <button
                  className="w-full px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                  onClick={handleReset}
                >
                  Zerar resultados do time
                </button>
                <button
                  className="w-full px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                  onClick={handleReset}
                >
                  Zerar resultados do time
                </button>
              </div>
            )}
          </div>
          {/* Botão time B com config absoluto à direita */}
          <div className="relative flex items-center">
            <button
              onClick={() => setTimeAtual(timeB)}
              className={`w-32 px-4 py-2 rounded-full text-base md:text-lg ${
                timeAtual === timeB ? "bg-blue-400" : "bg-blue-200"
              }`}
            >
              {timeB}
            </button>
            {timeAtual === timeB && (
              <button
                className="absolute right-0 translate-x-full p-2 rounded-full bg-gray-100 border border-gray-300 hover:bg-gray-200"
                style={{ top: '50%', transform: 'translateY(-50%) translateX(100%)' }}
                onClick={() => setShowConfig((v) => !v)}
                aria-label="Configuração do time B"
              >
                <Settings2 size={20} />
              </button>
            )}
            {showConfig && timeAtual === timeB && (
              <div ref={configRef} className="absolute right-0 mt-2 z-10 bg-white border border-gray-300 rounded shadow-lg p-2 min-w-[180px]" style={{ top: '100%' }}>
                <button
                  className="w-full px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                  onClick={handleReset}
                >
                  Zerar resultados do time
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <FormScout time={timeAtual === timeA ? "timeA" : "timeB"} desfazerPonto={desfazerPonto} quarter={quarter} encerrarQuarter={encerrarQuarter} />
      </div>

      {/* Indicador do quarto centralizado acima da tabela para evitar overflow lateral no mobile */}
      <div className="w-full flex justify-center items-center mt-4 mb-2">
        <span className={`text-sm md:text-base ${pulse ? 'quarter-pulse' : ''}`}>Quarto: <strong>{quarter}º</strong></span>
      </div>

      <div className="w-full overflow-x-auto mt-2 bg-gray-100 rounded">
        <Placar time={timeAtual === timeA ? "timeA" : "timeB"} />
      </div>
    </div>
  );
};
