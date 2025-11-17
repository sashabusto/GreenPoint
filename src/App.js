import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Materiales from "./pages/materiales";
import PorqueReciclo from "./pages/porquereciclo"
import RegistrarMateriales from "./pages/RegistrarMateriales";
import Usermenu from "./components/UserMenu";
import MisMateriales from "./pages/MisMateriales";

function App() {
  //const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/materiales" element={<Materiales />} />
        <Route path="/porquereciclo" element={<PorqueReciclo />} />
        <Route path="/registrarMateriales" element={<RegistrarMateriales />} />
        <Route path="/UserMenu" element={<Usermenu />} />
        <Route path="/misMateriales" element={<MisMateriales />} />

      </Routes>
    </Router>
  );
}

export default App;
