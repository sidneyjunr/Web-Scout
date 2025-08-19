import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { TimeA_Provider } from "./Components/contexts/TimeA_Context.jsx";
import { TimeB_Provider } from "./Components/contexts/TimeB_Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TimeA_Provider>
      <TimeB_Provider>

      <App />
      </TimeB_Provider>
    </TimeA_Provider>
  </StrictMode>
);
