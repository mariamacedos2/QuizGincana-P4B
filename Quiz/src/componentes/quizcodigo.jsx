// src/pages/QuizCodigo.jsx
import React, { useState } from "react";
import styles from "../styles/quizcodigo.module.css"; // certifique-se do caminho

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
      alert("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
    }
  };

  return (
    <div className={styles.quizCodigoContainer}>
      <div className={styles.quizContent}>
        <h1 className={styles.titulo}>Quiz criado com sucesso!</h1>

        {sala && <h2 className={styles.sala}>Sala: <span>{sala}</span></h2>}

        <p className={styles.infoText}>
        Código da Sala:
        </p>

        <div className={styles.codigoBox}>{codigo}</div>
        <button className={styles.voltarBtn} onClick={() => window.history.back()}>
  Voltar
</button>


        <button className={styles.btnCopiar} onClick={copiarCodigo}>
          {copiado ? "Copiado!" : "Copiar código"}
        </button>

        
      </div>
    </div>
  );
}
