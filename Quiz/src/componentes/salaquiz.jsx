import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import "../styles/inicio.css";
import "../styles/salaquiz.css"; 

function SalaQuiz() {
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
        i === index
          ? { ...cat, qtd: Math.max(0, cat.qtd + delta) }
          : cat
      )
    );
  };

  return (
    <div className="login-container">
      <div className="salaquiz-box">
        <Link to="/inicio">
          <button className="btn-voltar">
            <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
          </button>
        </Link>

        <div className="salaquiz-content">
          {/* ESQUERDA */}
          <div className="salaquiz-left">
            <h1>Nome da sala</h1>

            <div className="info-item">
              <label>Código da sala:</label>
              <div className="codigo">
                <i className="fas fa-lock icon"></i> 888-777
              </div>
            </div>

            <div className="info-item">
              <label>Jogador:</label>
              <div className="jogador">Maria_macedoS2</div>
            </div>
          </div>

          {/* DIREITA */}
          <div className="salaquiz-right">
            <p className="instrucao">
              Antes de iniciar, selecione a quantidade de perguntas por categoria:
            </p>

            <div className="categorias-lista">
              {categorias.map((cat, index) => (
                <div key={index} className="categoria-item">
                  <span>{cat.nome}</span>
                  <div className="controles">
                    <button onClick={() => alterarQtd(index, -1)}>-</button>
                    <span>{cat.qtd}</span>
                    <button onClick={() => alterarQtd(index, +1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <p className="total">
              (Selecione <b>20</b> perguntas) — Atual: {totalPerguntas}
            </p>

            <button className="btn-salvar">
              Salvar <i className="fa-solid fa-floppy-disk"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaQuiz;
