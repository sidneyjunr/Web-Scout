import { useNavigate } from "react-router-dom";

export const ComoUsar = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Como usar Web-Scout</h1>
          <p className="text-sm text-gray-600">Guia rápido com todas as funcionalidades do app e dicas práticas para fazer o scout durante a partida.</p>
        </div>
        <div className="hidden md:block">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
        </div>
      </header>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Fluxo rápido</h2>
          <ol className="list-decimal ml-5 space-y-2 text-gray-700">
            <li>Informe o nome do <strong>Time A</strong> e avance.</li>
            <li>Informe o nome do <strong>Time B</strong> e avance.</li>
            <li>Escolha o time que começará a registrar o scout.</li>
            <li>No formulário: digite o número do jogador e o valor da cesta (1, 2 ou 3).</li>
            <li>Clique em <strong>Avançar</strong> (ou pressione Enter) para registrar a jogada.</li>
            <li>Use o indicador de quarto para acompanhar o período atual; clique em <strong>Encerrar quarto</strong> para avançar.</li>
          </ol>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tabelas e visualização</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li><strong>Scout por quartos</strong>: tabela principal (ativa por padrão). Mostra os pontos de cada jogador por quarto e total de 3s.</li>
            <li><strong>Scout por pontos</strong>: mostra contagem de 1, 2 e 3 pontos e total por jogador.</li>
            <li>Linhas piscam quando um ponto é registrado. A animação destaca o jogador que acabou de pontuar.</li>
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Controles e comportamentos importantes</h2>
        <div className="mt-3 space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold">Registro de jogador</h3>
            <p className="text-sm">Se você registrar um ponto para um jogador que ainda não existe, o app cria automaticamente o jogador e aplica a cesta. Não há necessidade de cadastrá-lo antes.</p>
          </div>

          <div>
            <h3 className="font-semibold">Desfazer último ponto</h3>
            <p className="text-sm">O botão <strong>Desfazer último ponto</strong> só desfaz pontos do <em>quarto atual</em>. Não é possível desfazer pontos de quartos anteriores através desse botão.</p>
          </div>

          <div>
            <h3 className="font-semibold">Encerrar quarto</h3>
            <p className="text-sm">Ao encerrar o quarto, o app avança o período para <strong>ambos</strong> os times (os quartos só andam para frente). Se o time adversário não tiver pontos naquele quarto, será exibida uma confirmação antes de avançar. Isso evita perdas acidentais de dados. Não é possível avançar além do 4º quarto.</p>
          </div>

          <div>
            <h3 className="font-semibold">Resetar quarto</h3>
            <p className="text-sm">No menu de configuração de cada time há a opção <strong>Resetar quarto atual</strong>. Ela remove todas as jogadas registradas daquele quarto apenas para o time selecionado. Essa ação pede confirmação em modal e recalcula o scout com base no histórico restante.</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Dicas de uso rápido</h2>
          <ul className="list-disc ml-5 mt-3 space-y-2 text-gray-700">
          <li>Use o teclado: ao digitar o número do jogador pressione Enter para ir para o campo do valor da cesta; Enter novamente para registrar.</li>
          <li>Os campos aceitam apenas números válidos. Se houver erro de entrada o campo piscará em vermelho.</li>
          <li>Mantenha o placar por quartos aberto (é a aba padrão) para ter visão imediata dos pontos por período.</li>
          <li>Se precisar recomeçar tudo, você pode recarregar a página. Atualmente não há um botão global de 'reset total' na interface principal.</li>
        </ul>
      </section>



      <footer className="mt-6 flex items-center justify-end">
        <div className="md:hidden">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
        </div>
      </footer>
    </div>
  );
};
