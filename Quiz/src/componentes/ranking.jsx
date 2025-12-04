import React, { useState, useEffect } from "react";
import styles from "../styles/ranking.module.css";

export default function Ranking() {

  return (
    <div className={styles.RankingContainer}>
      
      {/* botão de voltar */}
      
      <button className={styles.botaoSair} onClick={() => window.history.back()}>
        <img
          className={styles.iconeSair}
          src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
          alt="Voltar"
        />
      </button>

      <div className={styles.quizContent}>
        <h1 className={styles.titulo}>Ranking</h1>
      </div>
    </div>
  );
}
