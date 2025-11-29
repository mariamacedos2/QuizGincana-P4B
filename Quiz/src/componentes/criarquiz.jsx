import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/criarquiz.module.css";

export default function CriarQuiz() {
  const navigate = useNavigate();

  const [sala, setSala] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [pontos, setPontos] = useState(5);
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [categoria, setCategoria] = useState("");

  // controla se já existe pergunta salva
  const [temPergunta, setTemPergunta] = useState(false);

  // Carrega perguntas existentes para exibir o botão
  useEffect(() => {
    const q = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");
    if (q.length > 0) setTemPergunta(true);
  }, []);

  const handleAlternativaChange = (i, v) => {
    const copy = [...alternativas];
    copy[i] = v;
    setAlternativas(copy);
  };

  const salvarEProxima = () => {
    // VALIDAÇÕES CORRIGIDAS
    if (!sala.trim()) {
      alert("Digite o nome da sala!");
      return;
    }

    if (!pergunta.trim()) {
      alert("Digite a pergunta!");
      return;
    }

    if (alternativas.some((a) => !a.trim())) {
      alert("Preencha todas as alternativas!");
      return;
    }

    if (respostaCorreta === "") {
      alert("Selecione a alternativa correta!");
      return;
    }

    if (!categoria.trim()) {
      alert("Digite a categoria!");
      return;
    }

    const nova = {
      sala,
      pergunta,
      alternativas,
      pontos,
      respostaCorreta,
      categoria,
    };

    const q = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");
    q.push(nova);
    localStorage.setItem("questoesQuiz", JSON.stringify(q));

    // limpa campos
    setPergunta("");
    setAlternativas(["", "", "", ""]);
    setPontos(5);
    setRespostaCorreta("");
    setCategoria("");

    // Agora funciona 100%
    setTemPergunta(true);
  };

  const finalizarQuiz = () => {
    const questoes = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");

    if (!sala.trim()) {
      alert("Digite o nome da sala para finalizar!");
      return;
    }

    if (questoes.length === 0) {
      alert("Você precisa criar pelo menos 1 pergunta!");
      return;
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    const quizCompleto = {
      codigo,
      sala,
      questoes,
    };

    const lista = JSON.parse(localStorage.getItem("quizzesComCodigo") || "[]");
    lista.push(quizCompleto);
    localStorage.setItem("quizzesComCodigo", JSON.stringify(lista));

    localStorage.removeItem("questoesQuiz");
    localStorage.setItem("codigoQuiz", codigo);

    navigate("/quizcodigo");
  };

  return (
    <div className={styles.criarquizContainer}>
      <div className={styles.criarquizCard}>

        {/* ESQUERDA */}
        <div className={styles.formLeft}>
          <h1 className={styles.titulo}>Doce Desafio</h1>

          {/* Nome da sala */}
          <div className={styles.formGroup}>
            <label>Digite o nome da sala:</label>
            <input
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              placeholder="Digite o nome da sala..."
            />
          </div>

          {/* Pergunta */}
          <div className={styles.formGroup}>
            <input
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              placeholder="Comece a digitar a pergunta..."
            />
          </div>

          {/* Alternativas */}
          {alternativas.map((alt, idx) => (
            <div key={idx} className={styles.formGroup}>
              <input
                value={alt}
                onChange={(e) => handleAlternativaChange(idx, e.target.value)}
                placeholder={`Digite a alternativa ${String.fromCharCode(65 + idx)}...`}
              />
            </div>
          ))}

          {/* BOTÕES */}
          <div className={styles.botoes}>
            <button className={styles.voltar} onClick={() => window.history.back()}>
              Voltar
            </button>

            <button className={styles.salvar} onClick={salvarEProxima}>
              Próxima ➜
            </button>

            {/* Agora funciona */}
            {temPergunta && (
              <button className={styles.salvarFull} onClick={finalizarQuiz}>
                Finalizar Quiz ✔️
              </button>
            )}
          </div>
        </div>

        {/* DIREITA */}
        <div className={styles.formRight}>
          <div className={styles.painelBox}>

            <div className={styles.formGroup}>
              <label>Pontos:</label>
              <input
                type="number"
                min="1"
                value={pontos}
                onChange={(e) =>
                  setPontos(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Resposta correta:</label>
              <select
                value={respostaCorreta}
                onChange={(e) => setRespostaCorreta(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="0">Alternativa A</option>
                <option value="1">Alternativa B</option>
                <option value="2">Alternativa C</option>
                <option value="3">Alternativa D</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Categoria:</label>
              <input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Categoria..."
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
