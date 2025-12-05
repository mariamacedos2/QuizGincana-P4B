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

      if (error) {
        console.error("Erro ao carregar perguntas:", error);
        setCarregando(false);
        return;
      }

      setPerguntas(data);
      setCarregando(false);
    }

    carregarPerguntas();
  }, [quizId]);

  // -----------------------------------------
  // 2. Função para pegar pontuação total salva
  // -----------------------------------------
  function pontosAtuaisNoLocalStorage() {
    return Number(localStorage.getItem("pontosTotais") || 0);
  }

  // -----------------------------------------
  // 3. SALVAR PONTUAÇÃO FINAL quando quiz acabar
  // -----------------------------------------
  async function salvarPontuacaoFinal() {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId || !quizId) {
      console.log("Erro: userId ou quizId faltando");
      return;
    }

    // Verifica se já existe pontuação salva
    const { data: existente, error: erroSelect } = await supabase
      .from("pontuacoes")
      .select("*")
      .eq("user_id", userId)
      .eq("quiz_id", quizId);

    if (erroSelect) {
      console.error("Erro SELECT:", erroSelect);
      return;
    }

    if (existente?.length > 0) {
      console.log("Pontuação já existente, não vou inserir novamente.");
      return;
    }

    const pontosTotais = pontosAtuaisNoLocalStorage();

    const { error: erroInsert } = await supabase
      .from("pontuacoes")
      .insert({
        user_id: userId,
        quiz_id: quizId,
        pontos_totais: pontosTotais
      });

    if (erroInsert) console.error("Erro INSERT:", erroInsert);
    else console.log("Pontuação salva com sucesso!");
  }

  // -----------------------------------------
  // 4. QUANDO O QUIZ TERMINAR → salva e vai pro ranking
  // -----------------------------------------
  useEffect(() => {
    if (!carregando && perguntas.length > 0 && !perguntas[indice]) {
      (async () => {
        await salvarPontuacaoFinal();
        navigate("/ranking");
      })();
    }
  }, [carregando, perguntas, indice, navigate]);

  // -----------------------------------------
  // 5. Tela da PERGUNTA atual
  // -----------------------------------------
  if (carregando) return <h2>Carregando perguntas...</h2>;
  if (!perguntas[indice]) return null; // evita crash

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
        pontos: question.pontos
      }
    });
  }

  // -----------------------------------------
  // 6. RENDERIZAÇÃO
  // -----------------------------------------
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
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#e4459b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
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
