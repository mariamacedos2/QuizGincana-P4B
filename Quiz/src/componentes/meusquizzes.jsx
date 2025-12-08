import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/meusquizzes.module.css";

function MeusQuizzes() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>

        {/* Botão voltar */}
        <Link to="/inicio">
          <button className={styles.btnVoltar}>
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        {/* Meus Quizzes */}
        <h2 className={styles.titulo}>Meus Quizzes</h2>

        <div className={styles.cardsRow}>
          <div className={styles.quizcaixa}>
            <h3>oioi</h3>
          </div>

          <Link to="/criarquiz" className={styles.quizLink}>
          <div className={styles.quizcaixa}>
            <h3 style={{ color: "#e4459b", fontSize: "60px" }}>+</h3>
            </div>
            </Link>


          <div className={styles.quizcaixa}></div>
        </div>

        {/* Histórico */}
        <h2 className={styles.titulo}>Meu Histórico</h2>

        <div className={styles.cardsRow}>
          <div className={styles.quizcaixa}>
            <h3>teste</h3>
          </div>

          <div className={styles.quizcaixa}></div>
          <div className={styles.quizcaixa}></div>
        </div>

      </div>
    </div>
  );
}

export default MeusQuizzes;
