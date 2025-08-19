import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white px-2 border-b-4 rounded-b-lg shadow-sm">
      <nav className="flex justify-between items-center px-2 py-2">
        <img src={Logo} className="w-12 h-12 cursor-pointer" alt="logo" onClick={() => navigate("/")} />
        <h3>
          <button className="hover:underline" onClick={() => navigate("/como-usar")}>Como Usar?</button>
        </h3>
        <ul>
          <li>
            <button className="text-xs md:text-base" onClick={() => navigate("/contribuir")}>Contribuir ☕</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
