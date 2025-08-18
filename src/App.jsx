import { useContext, useEffect, useState } from "react";
import Logo from "./assets/logo.png";
import { Form } from "./Components/Form";
import { Placar } from "./Components/Placar";
import { FormScout } from "./Components/FormScout";
import { TimeA_Context } from "./Components/contexts/TimeA_Context";

export const App = () => {
  const [time, setTime] = useState(false);
  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [scoutA, setScoutA] = useContext(TimeA_Context);
  const [slide, setSlide] = useState(0);
  const [timeAtual, setTimeAtual] = useState("");
  const [jogador, setJogador] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSlide(slide + 1);
  }

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
          {/* TELA PERGUNTANDO TIME A  */}
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

          {/* TELA PERGUNTANDO TIME B */}
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

          {/* ESCOLHER TIME A OU B PARA FAZER O SCOUT */}
          {timeA && timeB && slide === 2 && (
            <div className="flex flex-col items-center gap-4 text-xl mt-8">
              <h1>Escolha o primeiro time para fazer o scout</h1>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setTimeAtual(timeA);
                    setSlide(slide + 1);
                    setTime(true)
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

          {/* TELA DE FAZER SCOUT DE FATO */}

          {slide === 3 && (
            <div className="flex flex-col items-center mt-4">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => {
                    setTimeAtual(timeA);
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
                  }}
                  className={`px-4 py-2 rounded-full ${
                    timeAtual === timeB ? "bg-blue-400" : "bg-blue-200"
                  }`}
                >
                  {timeB}
                </button>
              </div>

              {/* TABELA DE PONTO */}

              {/* DIV DO NUMERO DO JOGADOR E DE FAZER SCOUT */}
              <h1 className="text-xl font-semibold ">{timeAtual}</h1>
              <FormScout time={timeAtual === timeA ? "timeA" : "timeB"} />

            </div>
          )}
        </main>
      </div>
    </>
  );
};
