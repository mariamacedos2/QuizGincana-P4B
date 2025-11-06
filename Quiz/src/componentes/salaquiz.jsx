import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"; // mantém o visual igual às outras telas

function SalaQuiz() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleEntrar = (e) => {
    e.preventDefault();
    if (codigo.trim() === "") {
      setMensagem("Digite o código da sala!");
      return;
    }
    navigate("/inicio"); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <Link to="/inicio">
          <button className="btn-voltar">
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        <div className="title-container">
          <h1 className="login-title">Sala do Quiz</h1>
        </div>

        <form onSubmit={handleEntrar}>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                type="text"
                placeholder="Digite o código do quiz"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
          </div>

          {/* Botão entrar */}
          <button type="submit" className="btn-entrar">
            Entrar <i className="fas fa-sign-in-alt"></i>
          </button>

          {/* Botão Meus Quizzes */}
          <button
            type="button"
            className="teste"
            onClick={() => alert("Em breve: lista dos seus quizzes!")}
          >
            Meus Quizzes
          </button>

          {/* Botão Criar Quiz */}
          <button
            type="button"
            className="teste"
            onClick={() => navigate("/criarquiz")}
          >
            Criar Quiz <i className="fa-solid fa-plus fa-flip-horizontal fa-xs"></i>
          </button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <p className="cadastro-text">
          Crie quizzes interativos e cativantes 💡
        </p>
      </div>
    </div>
  );
}

export default SalaQuiz;
