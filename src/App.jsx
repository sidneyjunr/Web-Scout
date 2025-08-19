import { useContext, useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { ComoUsar } from "./Components/ComoUsar";
import { Contribuir } from "./Components/Contribuir";
import { TelaTimeA } from "./Components/TelaTimeA";
import { TelaTimeB } from "./Components/TelaTimeB";
import { TelaEscolherTime } from "./Components/TelaEscolherTime";
import { TelaScout } from "./Components/TelaScout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  const [time, setTime] = useState(false);
  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [slide, setSlide] = useState(0);
  const [timeAtual, setTimeAtual] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSlide(slide + 1);
  }

  function MainContent() {
    return (
      <main className="flex flex-col w-full max-w-md mx-auto px-2 py-2 flex-1">
        {slide === 0 && (
          <TelaTimeA
            value={timeA}
            setTime={setTimeA}
            handleSubmit={handleSubmit}
          />
        )}
        {slide === 1 && (
          <TelaTimeB
            value={timeB}
            setTime={setTimeB}
            handleSubmit={handleSubmit}
          />
        )}
        {timeA && timeB && slide === 2 && (
          <TelaEscolherTime
            timeA={timeA}
            timeB={timeB}
            setTimeAtual={setTimeAtual}
            setSlide={setSlide}
            setTime={setTime}
          />
        )}
        {slide === 3 && (
          <TelaScout
            timeA={timeA}
            timeB={timeB}
            timeAtual={timeAtual}
            setTimeAtual={setTimeAtual}
          />
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
