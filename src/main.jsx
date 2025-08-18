import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { TimeA_Provider } from "./Components/contexts/TimeA_Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TimeA_Provider>
      <App />
    </TimeA_Provider>
  </StrictMode>
);
