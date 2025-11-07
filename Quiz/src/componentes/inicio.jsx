import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/inicio.css";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/">
          <button className="btn-voltar">
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        <div className="title-container">
          <h1>Doce Desafio</h1>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <i className="fas fa-lock icon"></i>
            <input
              type="text"
              placeholder="Digite o código do quiz"
              required
            />
          </div>
        </div>

        <button 
        className="btn-entrar"
        onClick={() => navigate("/salaquiz")}
        >  
          Entrar <i className="fas fa-sign-in-alt"></i>
        </button>

        <button className="teste" >
          Meus Quizzes
        </button>

        <button
          className="teste"
          onClick={() => navigate("/criarquiz")}
        >
          Criar Quiz <i className="fa-solid fa-plus fa-flip-horizontal fa-xs"></i>
        </button>

        <p className="cadastro-text">Crie quizzes interativos e cativantes</p>
      </div>
    </div>
  );
}

export default Inicio;
