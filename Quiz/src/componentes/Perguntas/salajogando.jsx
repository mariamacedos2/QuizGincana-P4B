import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "../../styles/salajogando.module.css";
import { perguntas } from "./perguntas";


export default function Pergunta() {
  const navigate = useNavigate();
  const location = useLocation();

  // índice recebido da tela anterior (ou 0 se for a primeira vez)
  const indice = location.state?.indice ?? 0;

  const question = perguntas[indice];

  function selecionarResposta(indiceEscolhido) {
    navigate("/resposta", {
      state: {
        indicePergunta: indice,
        indiceEscolhido,
      },
    });
  }

  return (
    <div className={styles.container}>
      <Link to="/salaquiz">
          <button className={styles.btnVoltar}>
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>
      <div className={styles.colunaEsquerda}>
        <h1>Nome da Sala</h1>
        <h2>Matemática</h2>

        <p className={styles.enunciado}>{question.enunciado}</p>

        <ul>
          {question.alternativas.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className={styles.colunaDireita}>
        <h3>Escolha sua resposta</h3>

        <div className={styles.blocoCinza}>

          <div className={styles.grid}>
          {question.alternativas.map((_, i) => (
            <button key={i} onClick={() => selecionarResposta(i)}>
              {["A", "B", "C", "D"][i]}
            </button>
          ))}
        </div>
        </div>
        
      </div>
    </div>
  );
}