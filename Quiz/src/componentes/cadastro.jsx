import React, { useState } from "react";
import "../styles/login.css";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { username: usuario }, // 🔹 armazena o nome no perfil do Supabase
        emailRedirectTo: window.location.origin, // redireciona após confirmar e-mail
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
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="title-container">
          <i className="fas fa-user-plus title-icon"></i>
          <h2 className="login-title">Cadastro</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <i className="fas fa-envelope icon"></i>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Usuário */}
          <div className="input-group">
            <label>Usuário</label>
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
              <input
                id="usuario"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)} // ✅ corrigido
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                id="senha"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botão */}
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <p className="cadastro-text">
          Já tem uma conta? <Link to="/">Voltar ao Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
