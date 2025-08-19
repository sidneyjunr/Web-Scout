import { PlacarTotal } from "./PlacarTotal";
import { FormScout } from "./FormScout";
import { Placar } from "./Placar";

export const TelaScout = ({ timeA, timeB, timeAtual, setTimeAtual }) => (
  <div className="flex flex-col items-center mt-4 w-full relative">
    <div className="flex w-full justify-between items-center mb-2 ">
      <PlacarTotal time="timeA"/>
      <h1 className="text-base md:text-xl font-semibold text-center w-full ">{timeAtual}</h1>
      <PlacarTotal time="timeB"/>
    </div>
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
    <div className="w-full">
      <FormScout time={timeAtual === timeA ? "timeA" : "timeB"} />
    </div>
    <div className="w-full overflow-x-auto mt-2 bg-gray-100 rounded">
      <Placar time={timeAtual === timeA ? "timeA" : "timeB"} />
    </div>
  </div>
);
