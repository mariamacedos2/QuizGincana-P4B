// src/pages/QuizCodigo.jsx
import React, { useState } from "react";
import styles from "../styles/quizcodigo.module.css";

export default function QuizCodigo() {
  const codigo = localStorage.getItem("codigoQuiz") || "-----";
  const sala = localStorage.getItem("salaQuiz") || "";
  const [copiado, setCopiado] = useState(false);

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
      alert("Não foi possível copiar. Copie manualmente.");
    }
  };

  return (
    <div className={styles.quizCodigoContainer}>
      
      {/* BOTÃO SAIR NO CANTO SUPERIOR — IGUAL AO FIGMA */}
      <button className={styles.botaoSair} onClick={() => window.history.back()}>
        <img
          className={styles.iconeSair}
          src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
          alt="Voltar"
        />
      </button>

      <div className={styles.quizContent}>
        <h1 className={styles.titulo}>Nome da Sala</h1>

        {sala && (
          <h2 className={styles.sala}>
            Sala: <span>{sala}</span>
          </h2>
        )}

        <p className={styles.infoText}>Código da Sala:</p>

        <div className={styles.codigoBox}>{codigo}</div>

        <button className={styles.btnCopiar} onClick={copiarCodigo}>
          {copiado ? "Copiado!" : "Copiar código"}
        </button>
      </div>
    </div>
  );
}
