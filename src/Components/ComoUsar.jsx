import { useNavigate } from "react-router-dom";


export const ComoUsar = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h1 className="text-xl font-bold mb-2">Como Usar</h1>
      <p className="mb-4 text-base text-gray-700">
        Este aplicativo foi criado para facilitar a realização do scout de jogadores em partidas de basquete, a partir da pontuação registrada na súmula, seguindo a ordem dos lances. Ele gera de forma rápida e simples a quantidade de pontos marcados por cada jogador de cada time.
      </p>
      <ol className="list-decimal ml-4 space-y-2 text-base">
        <li>Digite o nome do Time A e avance.</li>
        <li>Digite o nome do Time B e avance.</li>
        <li>Escolha qual time irá começar o scout.</li>
        <li>No scout, digite o número do jogador e o valor da cesta (1, 2 ou 3 pontos).</li>
        <li>Pressione "Avançar" para registrar cada jogada.</li>
        <li>Veja o placar atualizado logo abaixo do formulário.</li>
        <li>Troque de time a qualquer momento usando os botões no topo da tela de scout.</li>
      </ol>
      <p className="mt-4 text-sm text-gray-500">Dica: O campo do jogador e da cesta só aceitam números válidos. O placar é atualizado automaticamente.</p>
      <p className="mt-2 text-sm text-red-500">Se errar, é só recarregar a página para começar novamente.</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-400 text-white rounded font-semibold shadow"
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </button>
    </div>
  );
};
