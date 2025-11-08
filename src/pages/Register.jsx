import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/register.css";
import fondoRegistro from "../assets/fondoregistro.jpg";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/greenpoint-backend/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          contrasena: password, // el nombre debe coincidir con el de tu PHP
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
    <div className="auth-page" style={{ backgroundImage: `url(${fondoRegistro})` }}>
      <div className="auth-container">
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
        <p>
          ¿Ya tenés cuenta? <Link to="/Login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}
