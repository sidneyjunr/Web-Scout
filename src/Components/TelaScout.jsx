import { useContext, useRef, useState, useEffect } from "react";
import { Settings2 } from "lucide-react";
import { PlacarTotal } from "./PlacarTotal";
import { FormScout } from "./FormScout";
import { Placar } from "./Placar";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";
import { ConfirmModal } from "./ConfirmModal";

export const TelaScout = ({ timeA, timeB, timeAtual, setTimeAtual }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({ title: "", message: "", onConfirm: null });
  // removido state local de quarter; vamos derivar o quarter atual a partir dos contexts
  const [pulse, setPulse] = useState(false);
  const configRef = useRef(null);
  const { scoutA, setScoutA, desfazerUltimoPontoA, currentQuarter: currentQuarterA, advanceQuarter: advanceQuarterA, resetQuarter: resetQuarterA } = useContext(TimeA_Context);
  const { scoutB, setScoutB, desfazerUltimoPontoB, currentQuarter: currentQuarterB, advanceQuarter: advanceQuarterB, resetQuarter: resetQuarterB } = useContext(TimeB_Context);

  function handleReset() {
    if (timeAtual === timeA) setScoutA([]);
    if (timeAtual === timeB) setScoutB([]);
    setShowConfig(false);
  }

  function desfazerPonto() {
    // Função para desfazer o último ponto computado
    if (timeAtual === timeA) {
      desfazerUltimoPontoA(currentQuarterA);
    } else if (timeAtual === timeB) {
      desfazerUltimoPontoB(currentQuarterB);
    }
  }

  function doAdvance() {
    try { advanceQuarterA && advanceQuarterA(); } catch (e) {}
    try { advanceQuarterB && advanceQuarterB(); } catch (e) {}
    setPulse(true);
    setTimeout(() => setPulse(false), 700);
  }

  function encerrarQuarter() {
    const otherIsB = timeAtual === timeA ? true : false;
    const otherScout = otherIsB ? scoutB : scoutA;
    const otherQuarter = otherIsB ? currentQuarterB : currentQuarterA;
    const otherName = otherIsB ? timeB : timeA;
    const pointsTotal = otherScout.reduce((sum, item) => sum + (item[`pontos_quarto${otherQuarter}`] ?? 0), 0);

    // Não abrir modal no 4º quarto (não há avanço possível)
    if (pointsTotal === 0 && otherQuarter !== 4) {
      setConfirmData({
        title: "Confirmar encerramento de quarto",
        message: `O time ${otherName} não tem pontos no ${otherQuarter}º quarto. Deseja realmente encerrar o quarto? Esta ação não pode ser desfeita.`,
        onConfirm: () => {
          doAdvance();
          setConfirmOpen(false);
        },
      });
      setConfirmOpen(true);
      return;
    }

    doAdvance();
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
        <PlacarTotal time="timeA" />
        <h1 className="text-base md:text-xl font-semibold text-center w-full ">
          {timeAtual}
        </h1>
        <PlacarTotal time="timeB" />
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
                style={{
                  top: "50%",
                  transform: "translateY(-50%) translateX(-100%)",
                }}
                onClick={() => setShowConfig((v) => !v)}
                aria-label="Configuração do time A"
              >
                <Settings2 size={20} />
              </button>
            )}
            {showConfig && timeAtual === timeA && (
              <div
                ref={configRef}
                className="absolute left-0 mt-2 z-10 bg-white border border-gray-300 rounded shadow-lg p-2 min-w-[180px]"
                style={{ top: "100%" }}
              >
                <button
                  className="w-full mt-2 px-4 py-2 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-sm"
                  onClick={() => {
                    setConfirmData({
                      title: "Resetar quarto atual",
                      message: `Resetar resultados do ${timeA} apenas para o ${currentQuarterA}º quarto? Esta ação removerá todos pontos daquele quarto para este time.`,
                      onConfirm: () => {
                        try { resetQuarterA && resetQuarterA(currentQuarterA); } catch (e) {}
                        setConfirmOpen(false);
                        setShowConfig(false);
                      }
                    });
                    setConfirmOpen(true);
                  }}
                >
                  Resetar quarto atual
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
                style={{
                  top: "50%",
                  transform: "translateY(-50%) translateX(100%)",
                }}
                onClick={() => setShowConfig((v) => !v)}
                aria-label="Configuração do time B"
              >
                <Settings2 size={20} />
              </button>
            )}
            {showConfig && timeAtual === timeB && (
              <div
                ref={configRef}
                className="absolute right-0 mt-2 z-10 bg-white border border-gray-300 rounded shadow-lg p-2 min-w-[180px]"
                style={{ top: "100%" }}
              >
                <button
                  className="w-full mt-2 px-4 py-2 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-sm"
                  onClick={() => {
                    setConfirmData({
                      title: "Resetar quarto atual",
                      message: `Resetar resultados do ${timeB} apenas para o ${currentQuarterB}º quarto? Esta ação removerá todos pontos daquele quarto para este time.`,
                      onConfirm: () => {
                        try { resetQuarterB && resetQuarterB(currentQuarterB); } catch (e) {}
                        setConfirmOpen(false);
                        setShowConfig(false);
                      }
                    });
                    setConfirmOpen(true);
                  }}
                >
                  Resetar quarto atual
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <FormScout
          time={timeAtual === timeA ? "timeA" : "timeB"}
          desfazerPonto={desfazerPonto}
          quarter={timeAtual === timeA ? currentQuarterA : currentQuarterB}
          encerrarQuarter={encerrarQuarter}
        />
      </div>

      {/* Indicador do quarto centralizado acima da tabela para evitar overflow lateral no mobile */}
      <div className="w-full flex justify-center items-center mt-4 mb-2">
        <span
          className={`text-sm md:text-base ${pulse ? "quarter-pulse" : ""}`}
        >
          <strong>{timeAtual === timeA ? currentQuarterA : currentQuarterB}º</strong> quarto
        </span>
      </div>

      <div className="w-full overflow-x-auto mt-2 bg-gray-100 rounded">
        <Placar time={timeAtual === timeA ? "timeA" : "timeB"} />
      </div>
      <ConfirmModal
        open={confirmOpen}
        title={confirmData.title}
        message={confirmData.message}
        onConfirm={confirmData.onConfirm}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Encerrar"
        cancelText="Cancelar"
      />
    </div>
  );
};
