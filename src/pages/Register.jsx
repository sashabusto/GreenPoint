import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/register.css";
import fondoRegistro from "../assets/fondoregistro.jpg";
import logo from "../assets/Logo.png";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validación de campos
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Por favor completá todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://grupo4.practicas.local/php/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, contrasena: password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/Login");
      } else {
        setErrorMsg(data.message || "Error al registrarse");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = nombre.trim() && email.trim() && password.trim();

  return (
    <div
      className="auth-page-register"
      style={{ backgroundImage: `url(${fondoRegistro})` }}
    >
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar_register">
        <div className="container-fluid px-4">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="GreenPoint" height="80" />
          </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* FORM */}
      <div className="contenedor-register">
        <h2>Registrarse</h2>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={!isFormValid || loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="register-link">
          ¿Ya tenés cuenta? <Link to="/Login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}
