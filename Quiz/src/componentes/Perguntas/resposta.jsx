import { useLocation, useNavigate } from "react-router-dom";
import styles from "./resposta.module.css";
import { supabase } from "../../supabaseClient";

import { useEffect, useState } from "react";

export default function Resposta() {
  const location = useLocation();
  const navigate = useNavigate();

  const indice = location.state?.indicePergunta;
  const indiceEscolhido = location.state?.indiceEscolhido;
  const correta = location.state?.correta;
  const pontos = location.state?.pontos;

  const [question, setQuestion] = useState(null);
  const [quizInfo, setQuizInfo] = useState(null);

  // recuperar quiz salvo
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("quizAtual") || "{}");
    setQuizInfo(quiz);
  }, []);

  // busca pergunta do banco de dados
  useEffect(() => {
    async function carregarPergunta() {
      if (indice === undefined) return;

      const quizAtual = JSON.parse(localStorage.getItem("quizAtual") || "{}");
      const quizId = quizAtual?.id;

      if (!quizId) {
        alert("Erro: quizId não encontrado.");
        return;
      }

      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("quiz_id", quizId)
        .order("id", { ascending: true });

      if (error) {
        console.error("Erro ao carregar pergunta:", error);
        return;
      }

      setQuestion(data[indice]);
    }

    carregarPergunta();
  }, [indice]);

  if (indice === undefined || indiceEscolhido === undefined) {
    return <h2>Erro: dados não recebidos.</h2>;
  }

  if (!question) {
    return <h2>Carregando resposta...</h2>;
  }

  const alternativas = [
    question.alternativa_a,
    question.alternativa_b,
    question.alternativa_c,
    question.alternativa_d
  ];

  const acertou = indiceEscolhido === Number(question.resposta_correta);

  function proximaQuestao() {
    const proximo = indice + 1;
    navigate("/salajogando", { state: { indice: proximo } });
  }

  return (
    <div className={styles.container}>
      <div className={styles.colunaEsquerda}>
        <h1 className={styles.tituloSala}>{quizInfo?.nome_sala}</h1>
        <h2 className={styles.materia}>{question.categoria}</h2>

        <div className={styles.questaoBox}>
          <span className={styles.numero}>0{indice + 1} —</span>
          <span className={styles.pontos}>{question.pontos} pontos</span>

          <p className={styles.enunciado}>{question.pergunta}</p>

          <ul className={styles.listaAlternativas}>
            {alternativas.map((alt, i) => (
              <li
                key={i}
                className={
                  i === Number(question.resposta_correta)
                    ? styles.alternativaCorreta
                    : i === indiceEscolhido
                    ? styles.alternativaErrada
                    : ""
                }
              >
                {alt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.colunaDireita}>
        <div className={styles.imagemContainer}></div>

        <div className={styles.caixa}>
          <h3 className={styles.tituloResposta}>Alternativa Certa</h3>

          <div className={styles.blocoCinza}>
            <div className={styles.grid}>
              {["A", "B", "C", "D"].map((letra, i) => (
                <button
                  key={i}
                  className={
                    i === Number(question.resposta_correta)
                      ? styles.btnCerto
                      : i === indiceEscolhido
                      ? styles.btnErrado
                      : styles.btnNeutro
                  }
                >
                  {letra}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.msg}>
            {acertou
              ? "Você acertou!"
              : `A resposta correta é a letra ${
                  ["A", "B", "C", "D"][Number(question.resposta_correta)]
                }`}
          </p>

          <button onClick={proximaQuestao} className={styles.btnProxima}>
            Próxima Questão
          </button>
        </div>
      </div>
    </div>
  );
}
