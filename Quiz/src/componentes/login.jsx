import React, { useState } from "react";
import "../styles/login.css";
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
    console.log("Enviando login..."); // debug

    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      console.error(error);
      setErro("Email ou senha incorretos.");
      return;
    }

    console.log("Usuário autenticado:", data.user);
    navigate("/Inicio");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="usuario">Email</label>
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
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
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <i
                className={`fas ${mostrarSenha ? "fa-eye-slash" : "fa-eye"} icon-olho`}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              ></i>
            </div>
          </div>

          {/* Erro */}
          {erro && <p className="erro-text">{erro}</p>}

          {/* Botão */}
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Entrando..." : <>Entrar <i className="fas fa-sign-in-alt"></i></>}
          </button>
        </form>

        <p className="cadastro-text">
          Não tem cadastro? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
