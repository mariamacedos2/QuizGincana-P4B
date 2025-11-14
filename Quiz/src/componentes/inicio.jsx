import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/inicio.module.css"; // ✅ CSS Module

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link to="/">
          <button className={styles.btnEntrar}>
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        <div className={styles.titleContainer}>
          <h1>Doce Desafio</h1>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <i className={`fas fa-lock ${styles.icon}`}></i>
            <input
              type="text"
              placeholder="Digite o código do quiz"
              required
            />
          </div>
        </div>

        <button 
          className={styles.btnEntrar}
          onClick={() => navigate("/salaquiz")}
        >  
          Entrar <i className="fas fa-sign-in-alt"></i>
        </button>

        <button className={styles.btnQuiz}>Meus Quizzes</button>
        <button className={styles.btnQuiz} onClick={() => navigate("/criarquiz")}>
          Criar Quiz <i className="fa-solid fa-plus fa-flip-horizontal fa-xs"></i>
        </button>


        <p className={styles.cadastroText}>Crie quizzes interativos e cativantes</p>
      </div>
    </div>
  );
}

export default Inicio;
