import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/criarquiz.module.css";
import { supabase } from "../supabaseClient";

export default function CriarQuiz() {
  const navigate = useNavigate();

  const [sala, setSala] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [pontos, setPontos] = useState(5);
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [categoria, setCategoria] = useState("");

  const [temPergunta, setTemPergunta] = useState(false);

  // limpa quizId ao entrar
  useEffect(() => {
    localStorage.removeItem("quizId");
    localStorage.removeItem("codigoQuiz");
  }, []);

  // verifica se existe pergunta salva
  useEffect(() => {
    const q = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");
    if (q.length > 0) setTemPergunta(true);
  }, []);

  const handleAlternativaChange = (i, v) => {
    const copy = [...alternativas];
    copy[i] = v;
    setAlternativas(copy);
  };

  const salvarEProxima = async () => {
    if (!sala.trim()) return alert("Digite o nome da sala!");
    if (!pergunta.trim()) return alert("Digite a pergunta!");
    if (alternativas.some((a) => !a.trim()))
      return alert("Preencha todas as alternativas!");
    if (respostaCorreta === "")
      return alert("Selecione a alternativa correta!");
    if (!categoria.trim()) return alert("Digite a categoria!");

    let quizId = localStorage.getItem("quizId");

    // pega o usuário logado
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      alert("Erro ao obter usuário.");
      return;
    }

    const userId = userData.user.id;

    // cria quiz se ainda não existir
    if (!quizId) {
      const codigoAcesso = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const { data: quizCriado, error: quizError } = await supabase
        .from("quizzes")
        .insert([
          {
            user_id: userId,
            nome_sala: sala,
            codigo_acesso: codigoAcesso,
          },
        ])
        .select()
        .single();

      if (quizError) {
        alert("Erro ao criar quiz!");
        return;
      }

      quizId = quizCriado.id;
      localStorage.setItem("quizId", quizId);
      localStorage.setItem("codigoQuiz", codigoAcesso);
    }

    // salva pergunta no SUPABASE
    const { error: perguntaError } = await supabase.from("perguntas").insert([
      {
        quiz_id: quizId,
        pergunta,
        alternativa_a: alternativas[0],
        alternativa_b: alternativas[1],
        alternativa_c: alternativas[2],
        alternativa_d: alternativas[3],
        resposta_correta: respostaCorreta,
        pontos,
        categoria,
      },
    ]);

    if (perguntaError) {
      alert("Erro ao salvar pergunta!");
      return;
    }

    // salva localmente para permitir voltar
    const questoes = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");
    questoes.push({
      pergunta,
      alternativas,
      respostaCorreta,
      pontos,
      categoria,
    });

    localStorage.setItem("questoesQuiz", JSON.stringify(questoes));

    // limpa campos
    setPergunta("");
    setAlternativas(["", "", "", ""]);
    setRespostaCorreta("");
    setPontos(5);
    setCategoria("");

    setTemPergunta(true);
  };

  // VOLTAR 1 PERGUNTA
  const voltarPergunta = () => {
    const questoes = JSON.parse(localStorage.getItem("questoesQuiz") || "[]");

    if (questoes.length === 0) {
      alert("Não há pergunta anterior!");
      return;
    }

    const ultima = questoes[questoes.length - 1];

    // remove do array
    questoes.pop();
    localStorage.setItem("questoesQuiz", JSON.stringify(questoes));

    // repõe os valores
    setPergunta(ultima.pergunta);
    setAlternativas(ultima.alternativas);
    setRespostaCorreta(ultima.respostaCorreta);
    setPontos(ultima.pontos);
    setCategoria(ultima.categoria);
  };

  const finalizarQuiz = () => {
    const codigo = localStorage.getItem("codigoQuiz");

    if (!codigo) {
      alert("Erro: código não encontrado!");
      return;
    }

    navigate("/quizcodigo");
  };

  return (
    <div className={styles.criarquizContainer}>
      <div className={styles.criarquizCard}>
        {/* ESQUERDA */}
        <div className={styles.formLeft}>
          <Link to="/inicio">
            <button className={styles.btnVoltarMini}>
              <i className="fa-solid fa-right-from-bracket fa-flip-both"></i>
            </button>
          </Link>
          <h1 className={styles.titulo}>Criando Quiz</h1>

          {/* Nome da sala */}
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              {/* Ícone */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-pen-icon lucide-folder-pen"><path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"/><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
            </span>

            <input
              className={styles.inputStyled}
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              placeholder="Digite o nome da sala..."
            />
          </div>

          {/* Pergunta */}
          <div className={`${styles.inputWrapper} ${styles.perguntaBox}`}>
            <span className={styles.inputIcon}>
              {/* Ícone */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-question-mark-icon lucide-message-circle-question-mark"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            </span>

            <input
              className={styles.inputStyled}
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              placeholder="Digite a pergunta..."
            />
          </div>

          {/* Alternativas */}
          <div className={styles.alternativasBox}>
            {alternativas.map((alt, idx) => (
              <div key={idx} className={styles.formGroup}>
                <input
                  value={alt}
                  onChange={(e) =>
                    handleAlternativaChange(idx, e.target.value)
                  }
                  placeholder={`Digite a alternativa ${String.fromCharCode(
                    65 + idx
                  )}...`}
                />
              </div>
            ))}
          </div>

          {/* Botões */}
          <div className={styles.botoes}>
            <button className={styles.voltar} onClick={voltarPergunta}>
              Voltar
            </button>

            <button className={styles.salvar} onClick={salvarEProxima}>
              Próxima ➜
            </button>

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
                  setPontos(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
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
