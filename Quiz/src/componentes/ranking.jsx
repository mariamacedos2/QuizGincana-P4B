import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/ranking.module.css";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const [minhaPosicao, setMinhaPosicao] = useState(null);
  const [meusPontos, setMeusPontos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarRanking() {
      const quizId = localStorage.getItem("quizId");
      if (!quizId) return;

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      // 1️⃣ Busca TODAS as pontuações, sem usernames
      const { data, error } = await supabase
        .from("pontuacoes")
        .select("user_id, pontos_totais")
        .eq("quiz_id", quizId);

      if (error) {
        console.error(error);
        return;
      }

      // 2️⃣ Ordena por maior pontuação
      const rankingOrdenado = [...data].sort(
        (a, b) => b.pontos_totais - a.pontos_totais
      );

      // 3️⃣ Acha a posição do usuário
      const posicao = rankingOrdenado.findIndex((p) => p.user_id === userId) + 1;

      // 4️⃣ Acha a pontuação dele
      const meusPontosEncontrados =
        rankingOrdenado.find((p) => p.user_id === userId)?.pontos_totais || 0;

      setMinhaPosicao(posicao);
      setMeusPontos(meusPontosEncontrados);
    }

    carregarRanking();
  }, []);

  if (minhaPosicao === null) return <h2>Carregando...</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Seu Resultado</h1>

        <div className={styles.resultadoBox}>
          <h2 className={styles.posicaoGrande}>
            🏆 {minhaPosicao}º Lugar
          </h2>

          <p className={styles.pontos}>
            Você fez <strong>{meusPontos}</strong> pontos!
          </p>
        </div>

        <button
          className={styles.botao}
          onClick={() => navigate("/desempenho")}
        >
          Ver Desempenho
        </button>
      </div>
    </div>
  );
}
