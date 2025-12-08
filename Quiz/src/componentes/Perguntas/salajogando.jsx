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

  // -----------------------------------------
  // QUANDO O QUIZ ACABA → SALVA PONTUAÇÃO FINAL
  // -----------------------------------------
  useEffect(() => {
    if (!carregando && perguntas.length > 0 && !perguntas[indice]) {
      salvarPontuacaoFinal();
    }
  }, [carregando, perguntas, indice]);

  // SALVA NO SUPABASE APENAS UMA VEZ
  async function salvarPontuacaoFinal() {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const pontosTotais = Number(localStorage.getItem("pontosTotais") || 0);

    await supabase.from("pontuacoes").insert({
      user_id: userId,
      quiz_id: quizId,
      pontos_totais: pontosTotais
    });

    navigate("/ranking");
  }

  // -----------------------------------------
  // RENDERIZAÇÃO
  // -----------------------------------------
  if (carregando) return <h2>Carregando perguntas...</h2>;
  if (!perguntas[indice]) return null;

  const question = perguntas[indice];

  const alternativas = [
    question.alternativa_a,
    question.alternativa_b,
    question.alternativa_c,
    question.alternativa_d
  ];

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
          {alternativas.map((t, i) => (
            <li key={i}>
              <strong>{["A", "B", "C", "D"][i]})</strong> {t}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.colunaDireita}>
        <div className={styles.caixa}>
          <h3 className={styles.tituloResposta}>Escolha sua resposta</h3>

          <div className={styles.blocoCinza}>
            <div className={styles.grid}>
              {alternativas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selecionarResposta(i)}
                  className={styles.btngeral}
                >
                  {["A", "B", "C", "D"][i]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
