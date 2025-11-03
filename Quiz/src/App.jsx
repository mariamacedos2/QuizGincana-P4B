import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx"
import Inicio from "./componentes/inicio.jsx"

function App() {
  return (
    <Router>
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/cadastro" element={<Cadastro />} />
           <Route path="/inicio" element={<Inicio />} />
       </Routes>
    </Router>
  )
}

export default App
