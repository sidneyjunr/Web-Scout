import { useContext } from "react";
import { TimeA_Context } from "./contexts/TimeA_Context";
import { TimeB_Context } from "./contexts/TimeB_Context";

export const PlacarTotal = ({ time }) => {
  const { scoutA } = useContext(TimeA_Context);
  const { scoutB } = useContext(TimeB_Context);
  const scout = time === "timeA" ? scoutA : scoutB;
  const total = scout.reduce(
    (acc, item) => acc + (item.qtd_bola1 * 1 + item.qtd_bola2 * 2 + item.qtd_bola3 * 3),
    0
  );
  return (
    <div>
      <span className="text-lg md:text-2xl font-bold text-blue-600">{total}</span>
    </div>
  );
};
