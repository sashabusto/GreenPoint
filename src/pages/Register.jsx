import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/register.css";
import fondoRegistro from "../assets/fondoregistro.jpg";
import logo from "../assets/Logo.png";

export default function Register() {
  const [nombre, setNombre] = useState("");   // Se muestra pero NO se envía
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://grupo4.practicas.local/php/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registro exitoso. Ahora podés iniciar sesión.");
        navigate("/Login");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
      console.error(error);
    }
  };

  return (
    <div
      className="auth-page-register"
      style={{ backgroundImage: `url(${fondoRegistro})` }}
    >

      {/* NAVBAR*/}
      <nav className="navbar navbar-expand-lg navbar_register">
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="GreenPoint" height="80" />
          </Link>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <Link to="/" className="nav-inicio-link">
                  Inicio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* FORM */}
      <div className="contenedor-register">
        <h2>Registrarse</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Registrarse</button>
        </form>

        <p className="register-link">
          ¿Ya tenés cuenta? <Link to="/Login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}
