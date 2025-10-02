import { useContext, useState } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";
import { PlacarPorQuartos } from "./PlacarPorQuartos";

export const Placar = ({ time }) => {
  const { scoutA } = useContext(TimeA_Context);
  const { scoutB } = useContext(TimeB_Context);
  const [showQuarters, setShowQuarters] = useState(false);

  const dados = time === "timeA" ? scoutA : scoutB;
  const dadosOrdenados = [...dados].sort((a, b) => Number(a.jogador) - Number(b.jogador));

  if (!dadosOrdenados || dadosOrdenados.length === 0) {
    return <p className="mt-4">Nenhum jogador cadastrado ainda.</p>;
  }

  const totalTable = (
    <table className="table-auto border border-gray-400 w-full text-xs md:text-base">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Nº Jogador</th>
          <th className="border px-2 py-1">1 Ponto</th>
          <th className="border px-2 py-1">2 Pontos</th>
          <th className="border px-2 py-1">3 Pontos</th>
          <th className="border px-2 py-1">Total</th>
        </tr>
      </thead>
      <tbody>
        {dadosOrdenados.map((item) => {
          const total = item.qtd_bola1 * 1 + item.qtd_bola2 * 2 + item.qtd_bola3 * 3;
          const recent = item.lastUpdated && Date.now() - item.lastUpdated < 1200;

          return (
            <tr key={item.jogador} className={`text-center table-row-hover ${recent ? 'flash-red' : ''}`} tabIndex={0}>
              <td className="border px-2 py-1">{item.jogador}</td>
              <td className="border px-2 py-1">{item.qtd_bola1}</td>
              <td className="border px-2 py-1">{item.qtd_bola2}</td>
              <td className="border px-2 py-1">{item.qtd_bola3}</td>
              <td className="border px-2 py-1 font-bold">{total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="mt-6 w-full max-w-xs mx-auto md:max-w-lg overflow-x-auto relative">
      {/* Header com títulos clicáveis estilizados como segment control (abas iguais, indicador animado) */}
      <div className="w-full mb-2">
        <div className="relative w-full max-w-md mx-auto">
          <div role="tablist" aria-label="Tabelas de scout" className="flex bg-gray-100 rounded-md border">
            <button
              role="tab"
              aria-selected={!showQuarters}
              onClick={(e) => {
                // ripple effect
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const span = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                span.style.width = span.style.height = size + 'px';
                span.style.left = e.clientX - rect.left - size / 2 + 'px';
                span.style.top = e.clientY - rect.top - size / 2 + 'px';
                btn.appendChild(span);
                setTimeout(() => span.remove(), 600);
                setShowQuarters(false);
              }}
              className={`w-1/2 text-center text-sm md:text-base font-semibold py-2 transition-colors duration-150 focus:outline-none ripple ${!showQuarters ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
              style={{ background: !showQuarters ? '#1e40af' : 'transparent' }}
            >
              Scout por pontos
            </button>
            <button
              role="tab"
              aria-selected={showQuarters}
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
                setShowQuarters(true);
              }}
              className={`w-1/2 text-center text-sm md:text-base font-semibold py-2 transition-colors duration-150 focus:outline-none ripple ${showQuarters ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
              style={{ background: showQuarters ? '#1e40af' : 'transparent' }}
            >
              Scout por quartos
            </button>
          </div>

          {/* Indicador animado (underline) — utiliza posicionamento absoluto para deslizar entre as duas abas */}
          <div className="absolute left-0 bottom-0 w-full h-0 pointer-events-none">
            <div
              className="mx-auto relative"
              style={{ maxWidth: '100%' }}
            >
              <div
                className="absolute bottom-0 bg-blue-600 h-0.5 rounded transition-all duration-300"
                style={{ width: '50%', left: showQuarters ? '50%' : '0%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${showQuarters ? 'opacity-95 transform translate-x-0' : 'opacity-100'}`}>
        {showQuarters ? (
          <div className="fade-enter-active">
            <PlacarPorQuartos time={time} />
          </div>
        ) : (
          <div className="fade-enter-active">
            {totalTable}
          </div>
        )}
      </div>
    </div>
  );
};
