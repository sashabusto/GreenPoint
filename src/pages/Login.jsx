import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
import fondoLogin from "../assets/fondologin.jpg";
import logo from "../assets/Logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://grupo4.practicas.local/php/login.php", //lo de grupo4.practicas.local cambia segun mi url
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            contrasena: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("usuarioActivo", JSON.stringify(data));

        if (data.rol === "admin") {
          alert("Bienvenido administrador 🌱");
          navigate("/admin");
        } else {
          alert("Bienvenido usuario 🌿");
          navigate("/");
        }
      } else {
        alert(data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

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

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item mx-2">
                <Link
                  to="/"
                  className="nav-inicio-link"
                  style={{ fontSize: "18px",
                    color:(255,255,255)
                  }}
                >
                  Inicio
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      {/* FORM */}
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" disabled={loading}>
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
