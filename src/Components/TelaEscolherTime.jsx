export const TelaEscolherTime = ({ timeA, timeB, setTimeAtual, setSlide, setTime }) => (
  <div className="flex flex-col items-center gap-4 text-lg mt-8 w-full">
    <h1 className="text-base md:text-xl text-center">Escolha o primeiro time para fazer o scout</h1>
    <div className="flex flex-col w-full gap-2 md:flex-row md:justify-center md:gap-4">
      <button
        onClick={() => {
          setTimeAtual(timeA);
          setSlide(3);
          setTime(true);
        }}
        className="w-full md:w-auto px-4 py-2 bg-blue-200 rounded-full text-base md:text-lg"
      >
        {timeA}
      </button>
      <button
        onClick={() => {
          setTimeAtual(timeB);
          setSlide(3);
        }}
        className="w-full md:w-auto px-4 py-2 bg-blue-200 rounded-full text-base md:text-lg"
      >
        {timeB}
      </button>
    </div>
  </div>
);
