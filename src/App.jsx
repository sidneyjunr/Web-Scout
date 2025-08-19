import { useContext, useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { ComoUsar } from "./Components/ComoUsar";
import { Contribuir } from "./Components/Contribuir";
import Logo from "./assets/logo.png";
import { Form } from "./Components/Form";
import { Placar } from "./Components/Placar";
import { FormScout } from "./Components/FormScout";
import { TimeA_Context } from "./Components/contexts/TimeA_Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlacarTotal } from "./Components/PlacarTotal";

export const App = () => {
  const [time, setTime] = useState(false);
  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [slide, setSlide] = useState(0);
  const [timeAtual, setTimeAtual] = useState("");
  const [jogador, setJogador] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSlide(slide + 1);
  }

  function MainContent() {
    return (
      <main className="flex flex-col w-full max-w-md mx-auto px-2 py-2 flex-1">
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
          <div className="flex flex-col items-center gap-4 text-lg mt-8 w-full">
            <h1 className="text-base md:text-xl text-center">
              Escolha o primeiro time para fazer o scout
            </h1>
            <div className="flex flex-col w-full gap-2 md:flex-row md:justify-center md:gap-4">
              <button
                onClick={() => {
                  setTimeAtual(timeA);
                  setSlide(slide + 1);
                  setTime(true);
                }}
                className="w-full md:w-auto px-4 py-2 bg-blue-200 rounded-full text-base md:text-lg"
              >
                {timeA}
              </button>
              <button
                onClick={() => {
                  setTimeAtual(timeB);
                  setSlide(slide + 1);
                }}
                className="w-full md:w-auto px-4 py-2 bg-blue-200 rounded-full text-base md:text-lg"
              >
                {timeB}
              </button>
            </div>
          </div>
        )}
        {slide === 3 && (
          <div className="flex flex-col items-center mt-4 w-full relative">
            <div className="flex w-full gap-2 mb-4 md:justify-center md:gap-4">
              <button
                onClick={() => setTimeAtual(timeA)}
                className={`w-full md:w-auto px-4 py-2 rounded-full text-base md:text-lg ${
                  timeAtual === timeA ? "bg-blue-400" : "bg-blue-200"
                }`}
              >
                {timeA}
              </button>
              <button
                onClick={() => setTimeAtual(timeB)}
                className={`w-full md:w-auto px-4 py-2 rounded-full text-base md:text-lg ${
                  timeAtual === timeB ? "bg-blue-400" : "bg-blue-200"
                }`}
              >
                {timeB}
              </button>
            </div>
            <div className="flex w-full px-8 justify-between items-center mb-2">
              <PlacarTotal time="timeA" />
              <h1 className="text-base md:text-xl font-semibold text-center w-full">
                {timeAtual}
              </h1>
              <PlacarTotal time="timeB" />
            </div>
            <div className="w-full">
              <FormScout time={timeAtual === timeA ? "timeA" : "timeB"} />
            </div>
            <div className="w-full overflow-x-auto mt-2 bg-gray-100 rounded">
              <Placar time={timeAtual === timeA ? "timeA" : "timeB"} />
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen w-full flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/como-usar" element={<ComoUsar />} />
          <Route path="/contribuir" element={<Contribuir />} />
        </Routes>
      </div>
    </Router>
  );
};
