import React from "react";

export default function Login({ onLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Iniciar sesión</h1>
      <button
        onClick={onLogin}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Entrar
      </button>
    </div>
  );
}
