import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/meusquizzes.module.css"; 

function MeusQuizzes() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <Link to="/inicio">
            <button className={styles.btnVoltar}>
              <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
            </button>
          </Link>

            <div className={styles.quizzes}>
            <h2 className={styles.titulo}>Meus Quizzes</h2>
              <div className={styles.quizcaixa}>
                <h3>oioi</h3>

              </div>
            </div>

            <div className={styles.quizzes}>
              <h2 className={styles.titulo}>Meu Histórico</h2>
              <div className={styles.quizcaixa}>
                <h3>teste</h3>

              </div>
            </div>

        </div>
    </div>
  );
}

export default MeusQuizzes;
