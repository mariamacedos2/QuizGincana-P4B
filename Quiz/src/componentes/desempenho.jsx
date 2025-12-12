import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { supabase } from "../supabaseClient";
import styles from "../styles/desempenho.module.css";
import { Link } from "react-router-dom";

export default function Desempenho() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDesempenho() {
      const quiz = JSON.parse(localStorage.getItem("quizAtual") || "{}");
      const quizId = quiz?.id;

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      // Buscar todas perguntas do quiz
      const { data: perguntas } = await supabase
        .from("perguntas")
        .select("*")
        .eq("quiz_id", quizId);

      // Buscar respostas registradas pelo usuário
      const { data: respostas } = await supabase
        .from("respostas")
        .select("*")
        .eq("quiz_id", quizId)
        .eq("user_id", userId);

      // Agrupar acertos por categoria
      const categorias = {};

      perguntas.forEach((p) => {
        if (!categorias[p.categoria]) {
          categorias[p.categoria] = { total: 0, acertos: 0 };
        }
        categorias[p.categoria].total++;
      });

      respostas.forEach((r) => {
        const pergunta = perguntas.find((p) => p.id === r.pergunta_id);
        if (pergunta && r.acertou) {
          categorias[pergunta.categoria].acertos++;
        }
      });

      // Criar array com porcentagens
      const resultado = Object.entries(categorias).map(([nome, info]) => ({
        nome,
        porcentagem: Math.round((info.acertos / info.total) * 100),
      }));

      setDados(resultado);
      setLoading(false);
    }

    carregarDesempenho();
  }, []);

  const cores = ["#9a0077", "#ff4ec5", "#ffb4ee", "#bd00ff"];

  if (loading) return <h2>Carregando desempenho...</h2>;

  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <Link to="/ranking">
            <button className={styles.btnVoltar}>
              <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
            </button>
          </Link>
            <h1 className={styles.titulo}>Seu desempenho no quiz</h1>

      <PieChart width={500} height={400}>
        <Pie
          data={dados}
          dataKey="porcentagem"
          nameKey="nome"
          cx="50%"
          cy="50%"
          outerRadius={130}
          label={({ percent }) => `${Math.round(percent * 100)}%`}
        >
          {dados.map((_, i) => (
            <Cell key={i} fill={cores[i % cores.length]} />
          ))}
        </Pie>

        <Legend />
      </PieChart>
        </div>
    </div>
  );
}
