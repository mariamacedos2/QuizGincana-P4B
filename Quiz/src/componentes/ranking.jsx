import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/ranking.module.css";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarRanking() {
      try {
        const quizId = localStorage.getItem("quizId");

        if (!quizId) return;

        // 1. Buscar pontuações do quiz atual
        const { data: pontuacoes, error } = await supabase
          .from("pontuacoes")
          .select("pontos_totais, user_id")
          .eq("quiz_id", quizId);

        if (error) {
          console.error("Erro ao buscar pontuações:", error);
          return;
        }

        // 2. Para cada pontuação, pegar o nome do usuário
        const rankingCompleto = [];

        for (let p of pontuacoes) {
          const { data: usuario } = await supabase
            .from("usuarios")
            .select("username")
            .eq("id_autenticacao", p.user_id)
            .single();

          rankingCompleto.push({
            username: usuario?.username || "Usuário",
            pontos: p.pontos_totais,
          });
        }

        // 3. Ordenar por pontuação decrescente
        rankingCompleto.sort((a, b) => b.pontos - a.pontos);

        setRanking(rankingCompleto);
      } catch (err) {
        console.error(err);
      }
    }

    carregarRanking();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Ranking</h1>

      <div className={styles.rankingBox}>
        {ranking.slice(0, 4).map((item, index) => (
          <div key={index} className={styles.coluna}>
            <div className={styles.nome}>{item.username}</div>

            <div
              className={styles.barra}
              style={{ height: `${40 + item.pontos * 2}px` }}
            >
              <div className={styles.pontos}>{item.pontos}</div>
            </div>

            <div
              className={`${styles.posicao} ${
                index === 0
                  ? styles.ouro
                  : index === 1
                  ? styles.prata
                  : index === 2
                  ? styles.bronze
                  : styles.quarto
              }`}
            >
              {index + 1}º
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.botao}
        onClick={() => navigate("/desempenho")}
      >
        Visualizar Desempenho
      </button>
    </div>
  );
}
