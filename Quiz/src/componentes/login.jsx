import React, { useState } from "react";
import "../styles/login.css";

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
                <label>Usuário</label>
                <input
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Senha</label>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
              </div>
              <button type="submit" className="btn-entrar">Entrar</button>
            </form>
            <p className="cadastro-text">
                Não tem cadastro? <a href="#">Cadastrar</a>
            </p>
        </div>
    </div>
);
}

export default Login;