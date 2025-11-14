import React, { useState } from "react";
import styles from "../styles/login.module.css"; 
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro("Email ou senha incorretos.");
      return;
    }

    navigate("/Inicio");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginAvatar}>
          <i className="fas fa-user-circle"></i>
        </div>
        <h2 className={styles.loginTitle}>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="usuario">Email</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-user ${styles.icon}`}></i>
              <input
                id="usuario"
                type="email"
                placeholder="Digite seu e-mail"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Senha com olho */}
          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
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

          {/* Erro */}
          {erro && <p className={styles.erroText}>{erro}</p>}

          {/* Botão */}
          <button type="submit" className={styles.btnEntrar} disabled={carregando}>
            {carregando ? "Entrando..." : <>Entrar <i className="fas fa-sign-in-alt"></i></>}
          </button>
        </form>

        <p className={styles.cadastroText}>
          Não tem cadastro? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
