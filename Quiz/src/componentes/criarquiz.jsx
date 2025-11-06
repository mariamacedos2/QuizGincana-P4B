import React, { useState } from "react";
import "../styles/criarquiz.css";
import { useNavigate } from "react-router-dom";

function CriarQuiz() {
  const navigate = useNavigate();
  const [sala, setSala] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pontos, setPontos] = useState(5);

  const salvarPergunta = () => {
    if (!sala || !pergunta || alternativas.some((a) => !a) || !respostaCorreta || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Pergunta salva com sucesso!");
  };

  return (
    <div className="criarquiz-container">
      <div className="criarquiz-card">
        <h1 className="titulo">Doce Desafio </h1>

        <div className="form-group">
          <label>Digite o nome da sala:</label>
          <input
            type="text"
            placeholder="Digite o nome da sala..."
            value={sala}
            onChange={(e) => setSala(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Comece a digitar a pergunta..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
          />
        </div>

        {alternativas.map((alt, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              placeholder={`Digite a alternativa ${String.fromCharCode(65 + index)}...`}
              value={alt}
              onChange={(e) => {
                const novaLista = [...alternativas];
                novaLista[index] = e.target.value;
                setAlternativas(novaLista);
              }}
            />
          </div>
        ))}

        <div className="form-group inline">
          <label>Pontos:</label>
          <input
            type="number"
            value={pontos}
            onChange={(e) => setPontos(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Resposta correta:</label>
          <select
            value={respostaCorreta}
            onChange={(e) => setRespostaCorreta(e.target.value)}
          >
            <option value="">Selecione</option>
            {alternativas.map((_, index) => (
              <option key={index} value={index}>
                Alternativa {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Categoria:</label>
          <input
            type="text"
            placeholder="Categoria..."
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div className="botoes">
          <button className="voltar" onClick={() => navigate("/salaquiz")}>
            Voltar
          </button>
          <button className="salvar" onClick={salvarPergunta}>
            Salvar pergunta 💾
          </button>
        </div>
      </div>
    </div>
  );
}

export default CriarQuiz;
