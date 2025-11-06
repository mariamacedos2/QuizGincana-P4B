import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom"
import styles from "../styles/salaquiz.module.css"

function SalaQuiz() {

  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <div className={"styles.login-container"}>
        
      <div className="login-box">
          <Link to="/inicio">
          <button className="btn-voltar"><i class="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i></button>
          </Link>
        <div className="title-container">
          <h1>Nome da Sala</h1>

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
          <Link to="/salaquiz">
            <button type="submit" className="btn-entrar"> Entrar  <i className="fas fa-sign-in-alt"></i></button> 
          </Link>
            

          <button type="submit" className="teste">Meus Quizes</button>

          <button type="submit" className="teste">Criar Quiz <i class="fa-solid fa-plus fa-flip-horizontal fa-xs"></i></button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <p className="cadastro-text">
        Crie quizzes interativos e cativantes
        </p>


      </div>
    </div>
  );
}

export default SalaQuiz;