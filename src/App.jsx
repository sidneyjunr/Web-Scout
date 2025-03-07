import React, { useState } from "react";
import Logo from "./assets/logo.png";
import { Form } from "./Components/Form";

export const App = () => {
  function handleSubmit(e) {
    e.preventDefault();
    setSlide(slide + 1);
  }

  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [slide, setSlide] = useState(0);

  return (
    <>
      <div className=" bg-gray-100">
        <header className="container mx-auto rounded-b-lg bg-white px-2">
          <nav className="flex justify-between items-center mx-4 ">
            <img src={Logo} className="size-16" alt="logo" />
            <ul className="">
              <li>Contribuir ☕</li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto h-[calc(100vh-64px)] flex justify-center ">
          {slide === 0 ? (
            <Form
              id={"timeA"}
              value={timeA}
              label={"Time A"}
              setTime={setTimeA}
              placeholder={"Digite o nome do time A"}
              handleSubmit ={handleSubmit}
            />
          ) : null}
          {slide === 1 ? (
            <Form
              id={"timeB"}
              value={timeB}
              label={"Time B"}
              setTime={setTimeB}
              placeholder={"Digite o nome do time B"}
              handleSubmit ={handleSubmit}

            />
          ) : null}
          {timeA && timeB && slide === 2 && (
            <p>
              {timeA} x {timeB}
            </p>
          )}
        </main>
      </div>
    </>
  );
};
