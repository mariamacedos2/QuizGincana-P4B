import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/salaquiz.module.css";

function SalaQuiz() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([
    { nome: "Matemática", qtd: 3 },
    { nome: "Ciências", qtd: 4 },
    { nome: "História", qtd: 2 },
    { nome: "Geografia", qtd: 5 },
    { nome: "Português", qtd: 6 },
  ]);

  const totalPerguntas = categorias.reduce((acc, c) => acc + c.qtd, 0);

  const alterarQtd = (index, delta) => {
    setCategorias((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, qtd: Math.max(0, cat.qtd + delta) } : cat
      )
    );
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.salaquizBox}>
        <Link to="/inicio">
          <button className={styles.btnVoltar}>
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        <div className={styles.salaquizContent}>
          {/* ESQUERDA */}
          <div className={styles.salaquizLeft}>
            <h1 className={styles.salaquizTitle}>Nome da sala</h1>

            <label>Código da sala:</label>
            <div className={styles.infoItem}>
              <div className={styles.codigo}>
                <i className="fas fa-lock icon"></i> 888-777
              </div>
            </div>

            <label>Jogador:</label>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-circle-user fa-2xl"></i>
              <div className={styles.jogador}>Maria_macedoS2</div>
            </div>
          </div>

          {/* DIREITA */}
          <div className={styles.salaquizRight}>
            <p className={styles.instrucao}>
              Antes de iniciar, selecione a quantidade de perguntas por categoria:
            </p>

            <div className={styles.categoriasLista}>
              {categorias.map((cat, index) => (
                <div key={index} className={styles.categoriaItem}>
                  <span>{cat.nome}</span>
                  <div className={styles.controles}>
                    <button onClick={() => alterarQtd(index, -1)}>-</button>
                    <span>{cat.qtd}</span>
                    <button onClick={() => alterarQtd(index, +1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.total}>
              (Selecione <b>20</b> perguntas) — Atual: {totalPerguntas}
            </p>

            <button
              className={styles.btnSalvar}
              onClick={() => navigate("/salajogando")}
            >
              Iniciar Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaQuiz;
