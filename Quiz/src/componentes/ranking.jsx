import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/ranking.module.css";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const quizAtual = JSON.parse(localStorage.getItem("quizAtual") || "{}");
  const quizId = quizAtual.id;

  useEffect(() => {
    async function carregarRanking() {
      const { data, error } = await supabase
      .from("pontuacoes")
      .select(`
        pontos_totais,
        user_id,
        perfis:user_id ( username )
      `)
      .eq("quiz_id", quizId)
      .order("pontos_totais", { ascending: false });


      if (!error) setRanking(data);
    }

    carregarRanking();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Ranking</h1>

      <div className={styles.grafico}>
        {ranking.map((item, index) => (
          <div key={index} className={styles.coluna}>
            <div
              className={styles.barra}
              style={{
                height: `${item.pontos_totais * 4}px`,
                background:
                  index === 0
                    ? "#ffb3d9"
                    : index === 1
                    ? "#ff66cc"
                    : index === 2
                    ? "#cc33aa"
                    : "#7f00d4ff"
              }}
            ></div>

            <p className={styles.nome}>{item.perfis?.username}</p>
            <p className={styles.posicao}>{index + 1}º</p>
          </div>
        ))}
      </div>

      <button className={styles.btnDesempenho}>
        Visualizar Desempenho
      </button>
    </div>
  );
}
