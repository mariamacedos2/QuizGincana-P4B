import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Inicio from "./componentes/inicio.jsx";
import SalaQuiz from "./componentes/salaquiz.jsx";
import CriarQuiz from "./componentes/criarquiz.jsx";
import Resposta from "./componentes/Perguntas/resposta.jsx"
import MeusQuizzes from "./componentes/meusquizzes.jsx"

import "./App.css";
import SalaJogando from "./componentes/Perguntas/salajogando.jsx";

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
        <Route path="/resposta" element={<Resposta />} />
        <Route path="/meusquizzes" element={<MeusQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
