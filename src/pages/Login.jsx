import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
import fondoLogin from "../assets/fondologin.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Cuando estés en el cole, reemplazá la URL por la del hosting Hestia
      const response = await fetch(
        "http://localhost/greenpoint-backend/login.php", // 👉 cambiar por tu URL en el cole
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            contrasena: password, // este nombre debe coincidir con el que usa login.php
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Guardamos la sesión localmente
        localStorage.setItem("usuarioActivo", JSON.stringify(data));

        // Mensaje y redirección según el rol
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
