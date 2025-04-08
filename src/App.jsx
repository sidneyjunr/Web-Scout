import React, { useState } from "react";
import Logo from "./assets/logo.png";
import { Form } from "./Components/Form";
import { Placar } from "./Components/Placar";

export const App = () => {
  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [scoutTimeA, setScoutTimeA] = useState([]);
  const [scoutTimeB, setScoutTimeB] = useState([]);
  const [scout, setScout] = useState(true);
  const [slide, setSlide] = useState(0);
  const [timeAtual, setTimeAtual] = useState("");
  const [jogador, setJogador] = useState("");
  const [pontuacao, setPontuacao] = useState("");

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

    const setScoutTime = timeAtual === timeA ? setScoutTimeA : setScoutTimeB;

    setScoutTime((prevState) => {
      const jogadorExistente = prevState.find((j) => j.jogador === jogador);

      if (jogadorExistente) {
        return prevState.map((j) =>
          j.jogador === jogador
            ? {
                ...j,
                pontuacao: {
                  ...j.pontuacao,
                  [pontuacao]: j.pontuacao[pontuacao] + 1,
                },
              }
            : j
        );
      } else {
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

    setJogador("");
    setPontuacao("");
    setScout(!scout);
  }

  const pontosTimeA = scoutTimeA.reduce(
    (acc, j) =>
      acc + j.pontuacao[1] * 1 + j.pontuacao[2] * 2 + j.pontuacao[3] * 3,
    0
  );

  const pontosTimeB = scoutTimeB.reduce(
    (acc, j) =>
      acc + j.pontuacao[1] * 1 + j.pontuacao[2] * 2 + j.pontuacao[3] * 3,
    0
  );

  return (
    <>
      <div className="bg-gray-100">
        <header className="container mx-auto rounded-b-lg bg-white px-2 border-b-4">
          <nav className="flex justify-between items-center mx-4">
            <img src={Logo} className="size-16" alt="logo" />
            <ul>
              <li>Contribuir ☕</li>
            </ul>
          </nav>
        </header>
        <main className="container mt-4 mx-auto h-[calc(100vh-64px)] flex flex-col">
          {slide === 0 && (
            <Form
              id={"timeA"}
              value={timeA}
              type={"text"}
              label={"Time A"}
              setTime={setTimeA}
              placeholder={"Digite o nome do time A"}
              handleSubmit={handleSubmit}
            />
          )}
          {slide === 1 && (
            <Form
              id={"timeB"}
              value={timeB}
              type={"text"}
              label={"Time B"}
              setTime={setTimeB}
              placeholder={"Digite o nome do time B"}
              handleSubmit={handleSubmit}
            />
          )}
          {timeA && timeB && slide === 2 && (
            <div className="flex flex-col items-center gap-4 text-xl mt-8">
              <h1>Escolha o primeiro time para fazer o scout</h1>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setTimeAtual(timeA);
                    setSlide(slide + 1);
                  }}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  {timeA}
                </button>
                <button
                  onClick={() => {
                    setTimeAtual(timeB);
                    setSlide(slide + 1);
                  }}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  {timeB}
                </button>
              </div>
            </div>
          )}
          {slide === 3 && (
            <div className="flex flex-col items-center mt-4">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => {
                    setTimeAtual(timeA);
                    setScout(true);
                  }}
                  className={`px-4 py-2 rounded-full ${
                    timeAtual === timeA ? "bg-blue-400" : "bg-blue-200"
                  }`}
                >
                  {timeA}
                </button>
                <button
                  onClick={() => {
                    setTimeAtual(timeB);
                    setScout(true);
                  }}
                  className={`px-4 py-2 rounded-full ${
                    timeAtual === timeB ? "bg-blue-400" : "bg-blue-200"
                  }`}
                >
                  {timeB}
                </button>
              </div>
              <h1 className="text-xl font-semibold">{timeAtual}</h1>
              {scout ? (
                <Form
                  id={"jogador"}
                  label={"Digite o Número do Jogador"}
                  placeholder={"Número do Jogador"}
                  handleSubmit={handleSubmitJogador}
                  value={jogador}
                  setTime={setJogador}
                />
              ) : (
                <Form
                  id={"pontuacao"}
                  label={"Valor da Cesta?"}
                  placeholder={"1 2 ou 3"}
                  handleSubmit={handleSubmitScout}
                  value={pontuacao}
                  setTime={setPontuacao}
                />
              )}
            </div>
          )}

          <Placar
            timeA={timeA}
            timeB={timeB}
            scoutTimeA={scoutTimeA}
            scoutTimeB={scoutTimeB}
          />
        </main>
      </div>
    </>
  );
};
