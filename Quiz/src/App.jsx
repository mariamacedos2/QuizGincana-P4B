import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Inicio from "./componentes/inicio.jsx";
import SalaQuiz from "./componentes/salaquiz.jsx";
import CriarQuiz from "./componentes/criarquiz.jsx";
import "./App.css";
import SalaJogando from "./componentes/salajogando.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/salaquiz" element={<SalaQuiz />} />
        <Route path="/criarquiz" element={<CriarQuiz />} />
        <Route path="/salajogando" element={<SalaJogando />} />
      </Routes>
    </Router>
  );
}

export default App;
