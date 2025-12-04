import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/inicio.module.css";
import { supabase } from "../supabaseClient";

function Inicio() {
  const navigate = useNavigate();
  const [codigoDigitado, setCodigoDigitado] = useState("");

  const entrarNoQuiz = async () => {
    if (!codigoDigitado.trim()) {
      alert("Digite um código!");
      return;
    }

    // 🔎 BUSCA O QUIZ DIRETAMENTE NO SUPABASE
    const { data: quiz, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("codigo_acesso", codigoDigitado.toUpperCase())
      .maybeSingle(); // evita erro caso não exista

    if (error || !quiz) {
      console.error("Erro ou quiz não encontrado:", error);
      alert("Código inválido!");
      return;
    }

    // 💾 Salva o quiz atual no localStorage
    localStorage.setItem("quizAtual", JSON.stringify(quiz));
    localStorage.setItem("quizId", quiz.id);


    // 🚀 Vai para a sala do quiz
    navigate("/salaquiz");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link to="/">
          <button className={styles.btnVoltar}>
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
              value={codigoDigitado}
              onChange={(e) => setCodigoDigitado(e.target.value)}
              maxLength={6}
              required
            />
          </div>
        </div>

        <button 
          className={styles.btnEntrar}
          onClick={entrarNoQuiz}
        >
          Entrar <i className="fas fa-sign-in-alt"></i>
        </button>

        <button className={styles.btnQuiz} onClick={() => navigate("/meusquizzes")}>
          Meus Quizzes
        </button>

        <button className={styles.btnQuiz} onClick={() => navigate("/criarquiz")}>
          Criar Quiz <i className="fa-solid fa-plus fa-flip-horizontal fa-xs"></i>
        </button>

        <p className={styles.cadastroText}>Crie quizzes interativos e cativantes</p>
      </div>
    </div>
  );
}

export default Inicio;
