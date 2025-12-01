import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/criarquiz.module.css";
import { supabase } from "../supabaseClient"

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

  const salvarEProxima = async () => {
  if (!sala.trim()) return alert("Digite o nome da sala!");
  if (!pergunta.trim()) return alert("Digite a pergunta!");
  if (alternativas.some((a) => !a.trim())) return alert("Preencha todas as alternativas!");
  if (respostaCorreta === "") return alert("Selecione a alternativa correta!");
  if (!categoria.trim()) return alert("Digite a categoria!");

  let quizId = localStorage.getItem("quizId");

  //pega o usuário logado
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    console.error(userError);
    alert("Erro ao obter usuário logado.");
    return;
  }

  const userId = userData.user.id;

  // cria quiz
  if (!quizId) {
    const codigoAcesso = Math.floor(100000 + Math.random() * 900000).toString();

    const { data: quizCriado, error: quizError } = await supabase
      .from("quizzes")
      .insert([
        {
          user_id: userId,
          nome_sala: sala,
          categoria: categoria,
          codigo_acesso: codigoAcesso
        }
      ])
      .select()
      .single();

    if (quizError) {
      console.error("Erro ao criar quiz:", quizError);
      alert("Erro ao criar quiz.");
      return;
    }

    quizId = quizCriado.id;

    // salvamos no localStorage
    localStorage.setItem("quizId", quizId);
    localStorage.setItem("codigoQuiz", codigoAcesso);
  }

  // salva as perguntas no supabase
  const { error: perguntaError } = await supabase
    .from("perguntas")
    .insert([
      {
        quiz_id: quizId,
        pergunta: pergunta,
        alternativa_a: alternativas[0],
        alternativa_b: alternativas[1],
        alternativa_c: alternativas[2],
        alternativa_d: alternativas[3],
        resposta_correta: respostaCorreta, // sua coluna é TEXT
        pontos: pontos
      }
    ]);

  if (perguntaError) {
    console.error("Erro ao salvar pergunta:", perguntaError);
    alert("Erro ao salvar a pergunta.");
    return;
  }

  //limpa os campos para próxima pergunta
  setPergunta("");
  setAlternativas(["", "", "", ""]);
  setRespostaCorreta("");
  setPontos(5);

  setTemPergunta(true);
};

  const finalizarQuiz = () => {
  const codigo = localStorage.getItem("codigoQuiz");

  if (!codigo) {
    alert("Erro: o código não foi gerado!");
    return;
  }

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
