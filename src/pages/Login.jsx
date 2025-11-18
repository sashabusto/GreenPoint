import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
import fondoLogin from "../assets/fondologin.jpg";
import logo from "../assets/Logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // para mensajes de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Limpiar mensaje previo
    setErrorMsg("");

    // Validación de campos
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor completá todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://grupo4.practicas.local/php/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, contrasena: password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("usuarioActivo", JSON.stringify(data));

        if (data.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMsg(data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <div
      className="auth-page"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-light navbar_login"
        style={{
          backgroundColor: "rgba(133, 149, 58, 0.48)",
          backdropFilter: "blur(6px)",
          padding: "5px 20px",
        }}
      >
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
              <Link className="nav-link" to="/" style={{ color: "white", fontWeight: "bold" }}>
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* FORM */}
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        <form onSubmit={handleLogin}>
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
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p>
          ¿No tenés cuenta? <Link to="/Register">Registrate</Link>
        </p>
      </div>
    </div>
  );
}
