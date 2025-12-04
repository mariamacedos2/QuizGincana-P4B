import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/salaquiz.module.css";
import { supabase } from "../supabaseClient"

function SalaQuiz() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [nomeJogador, setNomeJogador] = useState("");

  const [categorias, setCategorias] = useState([
    { nome: "Matemática", qtd: 3 },
    { nome: "Ciências", qtd: 4 },
    { nome: "História", qtd: 2 },
    { nome: "Geografia", qtd: 5 },
    { nome: "Português", qtd: 6 },
  ]);

  const totalPerguntas = categorias.reduce((acc, c) => acc + c.qtd, 0);

  const alterarQtd = (index, delta) => {
    setCategorias((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, qtd: Math.max(0, cat.qtd + delta) } : cat
      )
    );
  };

  // 🔥 CARREGA O QUIZ SALVO NO LOCAL STORAGE
  useEffect(() => {
    const quizSalvo = localStorage.getItem("quizAtual");

    if (!quizSalvo) {
      alert("Erro: Nenhum quiz carregado!");
      navigate("/inicio");
      return;
    }

    const obj = JSON.parse(quizSalvo);
    setQuiz(obj);

    // Salva o quizId para a página de perguntas
    localStorage.setItem("quizId", obj.id);

    async function buscarUsuario() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Se você salvou username no signup:
        setNomeJogador(user.user_metadata.username || user.email);
      }
   }

   buscarUsuario();

  }, []);

  if (!quiz) {
    return <h2>Carregando dados da sala...</h2>;
  }

  return (
    <div className={styles.Container}>

      {/* LADO ESQUERDO */}
      <div className={styles.salaquizLeft}>
        <div className={styles.salaquizBox}>

          <Link to="/inicio">
            <button className={styles.btnVoltar}>
              <i className="fa-solid fa-right-from-bracket fa-flip-both fa-sm"></i>
            </button>
          </Link>

          <h1>{quiz.nome_sala}</h1>

          <label>Código da sala:</label>
          <div className={styles.infoItem}>
            <div className={styles.codigo}>
              <i className="fas fa-lock icon"></i> {quiz.codigo_acesso}
            </div>
          </div>

          <label>Jogador:</label>
          <div className={styles.infoItem}>
            <i className="fa-solid fa-circle-user fa-2xl"></i>
            <div className={styles.jogador}>{nomeJogador || "Carregando..."}</div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className={styles.salaquizRight}>
        <div className={styles.boxdireita}>

          <p className={styles.instrucao}>
            Antes de iniciar, selecione a quantidade de perguntas por categoria:
          </p>

          <div className={styles.categoriasLista}>
            {categorias.map((cat, index) => (
              <div key={index} className={styles.categoriaItem}>
                <span>{cat.nome}</span>
                <div className={styles.controles}>
                  <button onClick={() => alterarQtd(index, -1)}>-</button>
                  <span>{cat.qtd}</span>
                  <button onClick={() => alterarQtd(index, +1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.total}>
            (Selecione <b>20</b> perguntas) — Atual: {totalPerguntas}
          </p>

          <button
            className={`${styles.btnSalvar} ${totalPerguntas < 20 ? styles.btnDesabilitado : ""}`}
            disabled={totalPerguntas < 20}
            onClick={() => {
              if (totalPerguntas < 20) {
                alert("Você precisa selecionar pelo menos 20 perguntas!");
                return;
              }
              navigate("/salajogando");
            }}
          >
            Iniciar Quiz
          </button>

        </div>
      </div>

    </div>
  );
}

export default SalaQuiz;
