import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./salajogando.module.css";
import { supabase } from "../../supabaseClient";

export default function SalaJogando() {
  const navigate = useNavigate();
  const location = useLocation();

  const indice = location.state?.indice ?? 0;

  const [perguntas, setPerguntas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // NOVO — controla quais alternativas ficam visíveis
  const [visiveis, setVisiveis] = useState([0, 1, 2, 3]);
  const [usar5050, setUsar5050] = useState(false);

  const quizAtual = JSON.parse(localStorage.getItem("quizAtual") || "{}");
  const quizId = quizAtual?.id;

  // -----------------------------------------
  // 1. Carregar perguntas do quiz
  // -----------------------------------------
  useEffect(() => {
    async function carregarPerguntas() {
      if (!quizId) {
        alert("Erro: quizId não encontrado.");
        setCarregando(false);
        return;
      }

      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("quiz_id", quizId)
        .order("id", { ascending: true });

      if (!error) setPerguntas(data);
      setCarregando(false);
    }

    carregarPerguntas();
  }, [quizId]);

  // Resetar alternativas visíveis ao mudar de pergunta
  useEffect(() => {
    setVisiveis([0, 1, 2, 3]);
    setUsar5050(false);
  }, [indice]);

  if (carregando) return <h2>Carregando perguntas...</h2>;
  if (!perguntas[indice]) return null;

  const question = perguntas[indice];

  const alternativas = [
    question.alternativa_a,
    question.alternativa_b,
    question.alternativa_c,
    question.alternativa_d
  ];

  // -----------------------------------------
  // FUNÇÃO 50/50 — elimina duas alternativas erradas
  // -----------------------------------------
  function ativar5050() {
    if (usar5050) return; // só pode usar 1 vez por pergunta

    const correta = Number(question.resposta_correta);

    // pega somente alternativas erradas
    let erradas = [0, 1, 2, 3].filter((i) => i !== correta);

    // embaralha e pega 2 para ocultar
    let ocultar = erradas.sort(() => Math.random() - 0.5).slice(0, 2);

    // mantém só as que NÃO estão na lista de ocultar
    let novasVisiveis = [0, 1, 2, 3].filter((i) => !ocultar.includes(i));

    setVisiveis(novasVisiveis);
    setUsar5050(true);
  }

  // -----------------------------------------
  // SELECIONAR A RESPOSTA
  // -----------------------------------------
  function selecionarResposta(indiceEscolhido) {
    navigate("/resposta", {
      state: {
        indicePergunta: indice,
        indiceEscolhido,
        correta: Number(question.resposta_correta),
        pontos: Number(question.pontos)
      }
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
        <h1>{quizAtual?.nome_sala}</h1>
        <h2>{question.categoria}</h2>

        <p className={styles.enunciado}>{question.pergunta}</p>

        <ul>
          {alternativas.map((t, i) =>
            visiveis.includes(i) ? (
              <li key={i}>
                <strong>{["A", "B", "C", "D"][i]})</strong> {t}
              </li>
            ) : null
          )}
        </ul>
      </div>

      <div className={styles.colunaDireita}>
        <div className={styles.caixa}>
          <h3 className={styles.tituloResposta}>Escolha sua resposta</h3>

          {/* BOTÃO 50/50 NOVO */}
          <button
            onClick={ativar5050}
            className={styles.btn5050}
            disabled={usar5050}
          >
            50/50
          </button>

          <div className={styles.blocoCinza}>
            <div className={styles.grid}>
              {alternativas.map((_, i) =>
                visiveis.includes(i) ? (
                  <button
                    key={i}
                    onClick={() => selecionarResposta(i)}
                    className={styles.btngeral}
                  >
                    {["A", "B", "C", "D"][i]}
                  </button>
                ) : (
                  <button key={i} disabled className={styles.btngeralOculto}>
                    —
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
