import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";


function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { username: usuario },
        emailRedirectTo: window.location.origin,
      },
    });

    setCarregando(false);

    if (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    } else {
      setMensagem("✅ Cadastro realizado! Verifique seu e-mail para confirmar sua conta.");
      setEmail("");
      setSenha("");
      setUsuario("");

   /*  setTimeout(() => {*/
   /*  navigate("/inicio");*/
   /*}, 2500);*/
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.titleContainer}>
          <i className={`fas fa-user-plus ${styles.titleIcon}`}></i>
          <h2 className={styles.loginTitle}>Cadastro</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-envelope ${styles.icon}`}></i>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Usuário */}
          <div className={styles.inputGroup}>
            <label>Usuário</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-user ${styles.icon}`}></i>
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <i
                className={`fas ${mostrarSenha ? "fa-eye-slash" : "fa-eye"} ${styles.iconOlho}`}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              ></i>
            </div>
          </div>

          {/* Botão */}
          <button type="submit" className={styles.btnEntrar} disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <p className={styles.cadastroText}>
          Já tem uma conta? <Link to="/">Voltar ao Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
