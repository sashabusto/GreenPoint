import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Materiales from "./pages/materiales";

function App() {
  //const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/materiales" element={<Materiales />} />
      </Routes>
    </Router>
  );
}

export default App;
