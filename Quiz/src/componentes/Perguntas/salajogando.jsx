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

  // 🔹 Quiz salvo no início
  const quizAtual = JSON.parse(localStorage.getItem("quizAtual") || "{}");
  const quizId = quizAtual?.id; // <-- usa o ID do quiz resgatado pelo código

  // 🔹 Carrega perguntas da sala correta
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

  // 🔹 Enquanto carrega
  if (carregando) {
    return <h2>Carregando perguntas...</h2>;
  }

  // 🔹 Fim das perguntas
  if (!perguntas[indice]) {
     navigate("/ranking")
  }

  const question = perguntas[indice];

  // 🔹 Alternativas
  const alternativas = [
    question.alternativa_a,
    question.alternativa_b,
    question.alternativa_c,
    question.alternativa_d
  ];

  // 🔹 Selecionar resposta
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

  return (
    <div className={styles.container}>

      {/* 🔙 VOLTAR */}
      <Link to="/salaquiz">
        <button className={styles.btnVoltar}>
          <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
        </button>
      </Link>

      {/* 🔹 ESQUERDA */}
      <div className={styles.colunaEsquerda}>
        <h1>{quizAtual?.nome_sala || "Doce Desafio"}</h1>
        <h2>{question.categoria || "Categoria"}</h2>

        <p className={styles.enunciado}>{question.pergunta}</p>

        <ul>
          {alternativas.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* 🔹 DIREITA */}
      <div className={styles.colunaDireita}>
        <div className={styles.caixa}>
          <h3>Escolha sua resposta</h3>

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
