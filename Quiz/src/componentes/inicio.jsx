import React, { useState } from "react";
import "../styles/login.css"
import "../styles/inicio.css"
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"

function Inicio() {

  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <div className="login-container">
        
      <div className="login-box">
          <Link to="/">
          <button className="btn-entrar"><i class="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i></button>
          </Link>
        <div className="title-container">
          <h1>Doce Desafio</h1>

        </div>
        


        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                id="senha"
                type="password"
                placeholder="Digite o código do quiz"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>
            

          <button type="submit" className="teste">Meus Quizes</button>

          <button type="submit" className="teste">Criar quiz <i class="fa-solid fa-plus fa-flip-horizontal fa-xs"></i></button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <p className="cadastro-text">
        Crie quizzes interativos e cativantes
        </p>


      </div>
    </div>
  );
}

export default Inicio;