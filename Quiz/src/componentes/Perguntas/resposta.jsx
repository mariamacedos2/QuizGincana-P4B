import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/resposta.module.css";
import { perguntas } from "./perguntas";

import { useEffect } from "react";

export default function Resposta() {
  const location = useLocation();
  const navigate = useNavigate();

  const indice = location.state?.indicePergunta;
  const indiceEscolhido = location.state?.indiceEscolhido;

  // Redireciona para Pergunta se não houver dados
  useEffect(() => {
    if (indice === undefined || indiceEscolhido === undefined) {
      navigate("/", { replace: true });
    }
  }, [indice, indiceEscolhido, navigate]);

  if (indice === undefined || indiceEscolhido === undefined) return null;

  const question = perguntas[indice];
  const acertou = indiceEscolhido === question.correta;

  function proximaQuestao() {
    const proximo = indice + 1;
    if (proximo >= perguntas.length) {
      alert("Fim do quiz!");
      return;
    }
    navigate("/salajogando", { state: { indice: proximo } });
  }

  return (
    <div className={styles.container}>
      <div className={styles.colunaEsquerda}>
        <h1 className={styles.tituloSala}>Nome da Sala</h1>
        <h2 className={styles.materia}>Matemática</h2>

        <div className={styles.questaoBox}>
          <span className={styles.numero}>0{indice + 1} —</span>
          <span className={styles.pontos}>5 pontos</span>

          <p className={styles.enunciado}>{question.enunciado}</p>

          <ul className={styles.listaAlternativas}>
            {question.alternativas.map((alt, i) => (
              <li
                key={i}
                className={
                  i === question.correta
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
              {/* container da imagem */}
        <div className={styles.imagemContainer}></div>
        <h3 className={styles.tituloResposta}>Alternativa Certa</h3>

        <div className={styles.blocoCinza}>
          <div className={styles.grid}>
            {["A", "B", "C", "D"].map((letra, i) => (
              <button
                key={i}
                className={
                  i === question.correta
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
            : `A resposta correta é a letra ${["A", "B", "C", "D"][question.correta]}`}
        </p>

        <button onClick={proximaQuestao} className={styles.btnProxima}>
          Próxima Questão
        </button>
      </div>
    </div>
  );
}
