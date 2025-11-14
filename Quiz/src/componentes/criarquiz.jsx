import React, { useState } from "react";
import styles from "../styles/criarquiz.module.css"; // nome do arquivo CSS abaixo

export default function CriarQuiz() {
  const [sala, setSala] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [pontos, setPontos] = useState(5);
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleAlternativaChange = (i, v) => {
    const copy = [...alternativas];
    copy[i] = v;
    setAlternativas(copy);
  };

  const salvarPergunta = () => {
    if (!sala.trim() || !pergunta.trim() || alternativas.some(a => !a.trim()) || respostaCorreta === "" || !categoria.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
    const nova = { sala, pergunta, alternativas, pontos, respostaCorreta, categoria };
    const q = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");
    q.push(nova);
    localStorage.setItem("questoesQuiz", JSON.stringify(q));
    alert("Pergunta salva!");
    setSala(""); setPergunta(""); setAlternativas(["","","",""]); setPontos(5); setRespostaCorreta(""); setCategoria("");
  };

  return (
    <div className={styles.criarquizContainer}>
      <div className={styles.criarquizCard}>

        {/* ESQUERDA */}
        <div className={styles.formLeft}>
          <h1 className={styles.titulo}>Doce Desafio</h1>

          <div className={styles.formGroup}>
            <label>Digite o nome da sala:</label>
            <input value={sala} onChange={e => setSala(e.target.value)} placeholder="Digite o nome da sala..." />
          </div>

          <div className={styles.formGroup}>
            <input value={pergunta} onChange={e => setPergunta(e.target.value)} placeholder="Comece a digitar a pergunta..." />
          </div>

          {alternativas.map((alt, idx) => (
            <div key={idx} className={styles.formGroup}>
              <input
                value={alt}
                onChange={e => handleAlternativaChange(idx, e.target.value)}
                placeholder={`Digite a alternativa ${String.fromCharCode(65 + idx)}...`}
              />
            </div>
          ))}

          <div className={styles.botoes}>
            <button className={styles.voltar} type="button" onClick={() => window.history.back()}>Voltar</button>
            <button className={styles.salvar} type="button" onClick={salvarPergunta}>Salvar pergunta 💾</button>
          </div>
        </div>

        {/* DIREITA (FUNDO COM PADRÃO + CAIXA CINZA POR CIMA) */}
        <div className={styles.formRight}>
          {/* A imagem de fundo está na própria .formRight (cover). A caixa interna (painelBox) fica SOBRE essa imagem */}
          <div className={styles.painelBox}>
            <div className={styles.formGroup}>
              <label>Pontos:</label>
              <input type="number" min="1" value={pontos} onChange={e => setPontos(e.target.value === "" ? "" : Number(e.target.value))} />
            </div>

            <div className={styles.formGroup}>
              <label>Resposta correta:</label>
              <select value={respostaCorreta} onChange={e => setRespostaCorreta(e.target.value)}>
                <option value="">Selecione</option>
                <option value="0">Alternativa A</option>
                <option value="1">Alternativa B</option>
                <option value="2">Alternativa C</option>
                <option value="3">Alternativa D</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Categoria:</label>
              <input value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Categoria..." />
            </div>

            <button className={`${styles.salvar} ${styles.salvarFull}`} type="button" onClick={salvarPergunta}>
              Salvar pergunta
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
