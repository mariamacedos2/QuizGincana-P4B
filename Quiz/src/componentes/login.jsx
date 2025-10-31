import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
 
function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuário: ${usuario}\nSenha: ${senha}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usuario">Usuário</label>
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
              <input
                id="usuario"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <i className="fas fa-lock icon"></i>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-entrar">
            Entrar <i className="fas fa-sign-in-alt"></i>
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