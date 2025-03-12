import React, { useState } from "react";
import Logo from "./assets/logo.png";
import { Form } from "./Components/Form";

export const App = () => {
  function handleSubmit(e) {
    e.preventDefault();
    setSlide(slide + 1);
  }
  function handleSubmitJogador(e) {
    e.preventDefault();
    setScout(!scout);
  }
  function handleSubmitScout(e) {
    e.preventDefault();

    // Aqui você usa a função setScoutTimeA para atualizar o estado
    setScoutTimeA((prevState) => {
      // Verifica se o jogador já existe no estado scoutTimeA
      const jogadorExistente = prevState.find((j) => j.jogador === jogador);

      if (jogadorExistente) {
        // Se o jogador já existe, incrementa a pontuação correspondente
        return prevState.map((j) =>
          j.jogador === jogador
            ? {
                ...j,
                pontuacao: {
                  ...j.pontuacao,
                  [pontuacao]: j.pontuacao[pontuacao] + 1, // Incrementa a pontuação
                },
              }
            : j
        );
      } else {
        // Se o jogador não existe, adiciona ele com a pontuação inicial
        return [
          ...prevState,
          {
            jogador: jogador,
            pontuacao: {
              1: pontuacao === "1" ? 1 : 0,
              2: pontuacao === "2" ? 1 : 0,
              3: pontuacao === "3" ? 1 : 0,
            },
          },
        ];
      }
    });

    // Limpa os campos após salvar os dados

    setJogador("");
    setPontuacao("");
    setScout(!scout);
  }

  const [timeA, setTimeA] = useState("");
  const [scoutTimeA, setScoutTimeA] = useState([]);
  const [scoutTimeB, setScoutTimeB] = useState([]);
  const [timeB, setTimeB] = useState("");
  const [scout, setScout] = useState(true);
  const [slide, setSlide] = useState(0);
  const [timeAtual, setTimeAtual] = useState("");
  const [jogador, setJogador] = useState("");
  const [pontuacao, setPontuacao] = useState("");

  return (
    <>
      <div className=" bg-gray-100">
        <header className="container mx-auto rounded-b-lg bg-white px-2 border-b-4 ">
          <nav className="flex justify-between items-center mx-4 ">
            <img src={Logo} className="size-16" alt="logo" />
            <ul className="">
              <li>Contribuir ☕</li>
            </ul>
          </nav>
        </header>
        <main className="container mt-4 mx-auto h-[calc(100vh-64px)] flex flex-col  ">
          {slide === 0 ? (
            <Form
              id={"timeA"}
              value={timeA}
              type={"text"}
              label={"Time A"}
              setTime={setTimeA}
              placeholder={"Digite o nome do time A"}
              handleSubmit={handleSubmit}
            />
          ) : null}
          {slide === 1 ? (
            <Form
              id={"timeB"}
              value={timeB}
              type={"text"}
              label={"Time B"}
              setTime={setTimeB}
              placeholder={"Digite o nome do time B"}
              handleSubmit={handleSubmit}
            />
          ) : null}
          {timeA && timeB && slide === 2 && (
            <div className="flex flex-col items-center gap-4 text-xl mt-8">
              <h1>Escolha o primeiro time para fazer o scout</h1>
              <div className="space-x-4">
                <button
                  onClick={({ target }) => {
                    setTimeAtual(target.innerText);
                    setSlide(slide + 1);
                  }}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  {timeA}
                </button>
                <button
                  onClick={({ target }) => {
                    setTimeAtual(target.innerText);
                    setSlide(slide + 1);
                  }}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  {timeB}
                </button>
              </div>
            </div>
          )}
          {slide === 3 && scout ? (
            <div className="flex flex-col items-center mt-4">
              <h1>{timeAtual}</h1>
              <Form
                id={"jogador"}
                label={"Digite o Número do Jogador"}
                placeholder={"Número do Jogador"}
                handleSubmit={handleSubmitJogador}
                value={jogador}
                setTime={setJogador}
              />
            </div>
          ) : null}
          {slide === 3 && !scout ? (
            <div className="flex flex-col items-center mt-4">
              <h1>{timeAtual}</h1>
              <Form
                id={"jogador"}
                label={"Valor da Cesta?"}
                placeholder={"1 2 ou 3"}
                handleSubmit={handleSubmitScout}
                value={pontuacao}
                setTime={setPontuacao}
              />
            </div>
          ) : null}

          <div className="mt-8">
            <h2 className="text-xl text-center mb-4">Tabela de Pontuação</h2>
            <table className="table-auto w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Número do Jogador</th>
                  <th className="px-4 py-2 border">Bolas de 1</th>
                  <th className="px-4 py-2 border">Bolas de 2</th>
                  <th className="px-4 py-2 border">Bolas de 3</th>
                  <th className="px-4 py-2 border">Total de Pontos</th>
                </tr>
              </thead>
              <tbody>
                {scoutTimeA.map((jogadorData, index) => {
                  const totalPontos =
                    jogadorData.pontuacao[1] * 1 +
                    jogadorData.pontuacao[2] * 2 +
                    jogadorData.pontuacao[3] * 3;
                  return (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        {jogadorData.jogador}
                      </td>
                      <td className="px-4 py-2 border">
                        {jogadorData.pontuacao[1]}
                      </td>
                      <td className="px-4 py-2 border">
                        {jogadorData.pontuacao[2]}
                      </td>
                      <td className="px-4 py-2 border">
                        {jogadorData.pontuacao[3]}
                      </td>
                      <td className="px-4 py-2 border">{totalPontos}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};
