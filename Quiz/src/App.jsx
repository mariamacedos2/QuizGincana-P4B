import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx"

function App() {
  return (
    <Router>
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/cadastro" element={<Cadastro />} />
       </Routes>
    </Router>
  )
}

export default App
