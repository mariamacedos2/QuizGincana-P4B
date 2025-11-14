import React, { useState } from "react";
import styles from "../styles/criarquiz.module.css"; // CSS Module
import { useNavigate } from "react-router-dom";

function CriarQuiz() {
  const navigate = useNavigate();
  const [sala, setSala] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pontos, setPontos] = useState(5);

  const salvarPergunta = () => {
    if (!sala || !pergunta || alternativas.some((a) => !a) || !respostaCorreta || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Pergunta salva com sucesso!");
  };

  return (
    <div className={styles.criarquizContainer}>
      <div className={styles.criarquizCard}>
        {/* Lado esquerdo */}
        <div className={styles.formLeft}>
          <h1 className={styles.titulo}>Doce Desafio</h1>

          <div className={styles.formGroup}>
            <label>Digite o nome da sala:</label>
            <input
              type="text"
              placeholder="Digite o nome da sala..."
              value={sala}
              onChange={(e) => setSala(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Comece a digitar a pergunta..."
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            />
          </div>

          {alternativas.map((alt, index) => (
            <div key={index} className={styles.formGroup}>
              <input
                type="text"
                placeholder={`Digite a alternativa ${String.fromCharCode(65 + index)}...`}
                value={alt}
                onChange={(e) => {
                  const novaLista = [...alternativas];
                  novaLista[index] = e.target.value;
                  setAlternativas(novaLista);
                }}
              />
            </div>
          ))}

          <div className={styles.botoes}>
            <button className={styles.voltar} onClick={() => navigate("/inicio")}>
              Voltar
            </button>
            <button className={styles.salvar} onClick={salvarPergunta}>
              Salvar pergunta 💾
            </button>
          </div>
        </div>

        {/* Lado direito */}
        <div className={styles.formRight}>
          <div className={`${styles.formGroup} ${styles.inline}`}>
            <label>Pontos:</label>
            <input
              type="number"
              value={pontos}
              onChange={(e) => setPontos(e.target.value)}
              min="1"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Resposta correta:</label>
            <select
              value={respostaCorreta}
              onChange={(e) => setRespostaCorreta(e.target.value)}
            >
              <option value="">Selecione</option>
              {alternativas.map((_, index) => (
                <option key={index} value={index}>
                  Alternativa {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Categoria:</label>
            <input
              type="text"
              placeholder="Categoria..."
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarQuiz;
