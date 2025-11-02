import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Materiales from "./materiales"; // <-- Nuevo componente

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  // Si NO está logueado → solo mostramos Login
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  // Si está logueado → mostramos las rutas
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materiales" element={<Materiales />} />
      </Routes>
    </Router>
  );
}

export default App;
