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
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </Link>

        {/* Meus Quizzes */}
        <h2 className={styles.titulo}>Meus Quizzes</h2>

        <div className={styles.cardsRow}>
          <div className={styles.quizcaixa}>
            <h3>Quiz 1</h3>
          </div>

          <div className={styles.quizcaixa}>
            <h3>Quiz 2</h3>
          </div>

          <Link to="/criarquiz" className={styles.quizLink}>
            <div className={styles.quizcaixa}>
              <h3 className={styles.plus}>+</h3>
            </div>
          </Link>
        </div>

        {/* Histórico */}
        <h2 className={styles.titulo}>Meu Histórico</h2>

        <div className={styles.cardsRow}>
          <div className={styles.quizcaixa}>
            <h3>Histórico 1</h3>
          </div>

          <div className={styles.quizcaixa}>
            <h3>Histórico 2</h3>
          </div>

          <div className={styles.quizcaixa}>
            <h3>Histórico 3</h3>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MeusQuizzes;
