// src/pages/QuizCodigo.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/quizcodigo.module.css";

export default function QuizCodigo() {
  const [codigo, setCodigo] = useState("-----");
  const [sala, setSala] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Carrega o código e a sala quando a página abre
  useEffect(() => {
    const codigoLS = localStorage.getItem("codigoQuiz");
    const salaLS = localStorage.getItem("salaQuiz");

    if (codigoLS) setCodigo(codigoLS);
    if (salaLS) setSala(salaLS);

    return () => {
      // limpa APENAS quando sair da página
      localStorage.removeItem("quizId");
      localStorage.removeItem("questoesQuiz");
    };
  }, []);

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);

      setTimeout(() => setCopiado(false), 1200);
    } catch {
      alert("Erro ao copiar. Copie manualmente.");
    }
  };

  return (
    <div className={styles.quizCodigoContainer}>
      
      {/* botão de voltar */}
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
