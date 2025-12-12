import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/ranking.module.css";
import { useNavigate, Link } from "react-router-dom";

export default function Ranking() {
  const [minhaPosicao, setMinhaPosicao] = useState(null);
  const [meusPontos, setMeusPontos] = useState(0);
  const [mediaOutros, setMediaOutros] = useState(0);
  const [maiorPontuacao, setMaiorPontuacao] = useState(0);

  const navigate = useNavigate();

  // 🔥 Função usada para definir a altura das colunas
  const maiorValor = Math.max(meusPontos, mediaOutros, maiorPontuacao, 1);
  const calcAltura = (valor) => `${(valor / maiorValor) * 180}px`;

  useEffect(() => {
    async function carregarRanking() {
      const quizId = localStorage.getItem("quizId");
      if (!quizId) return;

      // usuário atual
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      // pega somente pontuações desse quiz
      const { data, error } = await supabase
        .from("pontuacoes")
        .select("user_id, pontos_totais")
        .eq("quiz_id", quizId);

      if (error) {
        console.error(error);
        return;
      }

      // ordena ranking
      const rankingOrdenado = [...data].sort(
        (a, b) => b.pontos_totais - a.pontos_totais
      );

      // posição
      const posicao = rankingOrdenado.findIndex((p) => p.user_id === userId) + 1;

      // pontos do jogador
      const meusPontosEncontrados =
        rankingOrdenado.find((p) => p.user_id === userId)?.pontos_totais || 0;

      // maior pontuação
      const maior = rankingOrdenado[0]?.pontos_totais || 0;

      // média dos outros
      const outros = rankingOrdenado.filter((p) => p.user_id !== userId);
      const media =
        outros.length > 0
          ? Math.round(
              outros.reduce((acc, p) => acc + p.pontos_totais, 0) /
                outros.length
            )
          : 0;

      setMinhaPosicao(posicao);
      setMeusPontos(meusPontosEncontrados);
      setMediaOutros(media);
      setMaiorPontuacao(maior);
    }

    carregarRanking();
  }, []);

  if (minhaPosicao === null) return <h2>Carregando...</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
         <Link to="/inicio">
            <button className={styles.btnVoltar}>
              <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
            </button>
          </Link>
        <h1 className={styles.titulo}>Seu Resultado</h1>

        <div className={styles.resultadoBox}>
          <h2 className={styles.posicaoGrande}>🏆 {minhaPosicao}º Lugar</h2>

          <p className={styles.pontos}>
            Você fez <strong>{meusPontos}</strong> pontos!
          </p>
        </div>

        {/* 🔥 GRÁFICO DE COLUNAS VERTICAIS EXATAMENTE COMO O SEU */}
        <h3 className={styles.subtitulo}>Comparação de Pontuação</h3>

        <div className={styles.graficoContainer}>
          <div className={styles.colunaItem}>
            <div
              className={styles.colunaUser}
              style={{ height: calcAltura(meusPontos) }}
            ></div>
            <span className={styles.label}>Você</span>
            <span className={styles.valor}>{meusPontos}</span>
          </div>

          <div className={styles.colunaItem}>
            <div
              className={styles.colunaMedia}
              style={{ height: calcAltura(mediaOutros) }}
            ></div>
            <span className={styles.label}>Média</span>
            <span className={styles.valor}>{mediaOutros}</span>
          </div>

          <div className={styles.colunaItem}>
            <div
              className={styles.colunaMaior}
              style={{ height: calcAltura(maiorPontuacao) }}
            ></div>
            <span className={styles.label}>Maior</span>
            <span className={styles.valor}>{maiorPontuacao}</span>
          </div>
        </div>

        <button className={styles.botao} onClick={() => navigate("/desempenho")}>
          Ver Desempenho
        </button>
      </div>
    </div>
  );
}
