import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/porquereciclo.css";
import logo from "../assets/Logo.png"; 
import { Link } from "react-router-dom";

export default function PorqueReciclo() {
  return (
    <div>
      {/* 🌿 Navbar */}
      <nav
        className="navbar navbar-expand-lg fixed-top custom-navbar"
        style={{
          backgroundColor: "rgba(164, 207, 205, 0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="GreenPoint" className="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/materiales">
                  Materiales reciclables
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 🌎 Contenido principal */}
      <div className="container my-5">
        <h1 className="text-success text-center mb-4">
          ¿Para qué sirve reciclar?
        </h1>
        <p className="lead text-center mb-5">
          Reciclar es mucho más que separar basura: es cuidar el planeta, reducir la contaminación y construir un futuro sostenible. 🌎
        </p>

        {/* ✅ Cards con beneficios */}
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-recycle fs-1 text-success"></i>
                <h5 className="card-title mt-3">Reduce los residuos</h5>
                <p className="card-text">
                  Menos basura termina en rellenos sanitarios y más materiales vuelven a tener una segunda vida.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-tree fs-1 text-success"></i>
                <h5 className="card-title mt-3">Cuida los recursos naturales</h5>
                <p className="card-text">
                  Reciclar papel, vidrio y metales ayuda a conservar árboles, agua y minerales.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-lightning-charge fs-1 text-success"></i>
                <h5 className="card-title mt-3">Ahorra energía</h5>
                <p className="card-text">
                  Fabricar productos con materiales reciclados usa mucha menos energía que hacerlo desde cero.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Sección informativa */}
        <div className="bg-light p-4 rounded shadow-sm mt-5">
          <h3 className="text-success text-center mb-3">🌱 Sabías que...</h3>
          <ul className="list-unstyled fs-5">
            <li>🧃 Una lata reciclada puede volver a las góndolas en 60 días.</li>
            <li>🧻 Reciclar una tonelada de papel ahorra más de 20 árboles.</li>
            <li>♻️ El 70% de los residuos del hogar se pueden reciclar.</li>
          </ul>
        </div>

        {/* ✅ Botones al final */}
        <div className="text-center mt-5">
          <Link to="/" className="btn btn-success btn-lg mx-2">
            Volver al inicio
          </Link>
          <Link to="/materiales" className="btn btn-success btn-lg mx-2">
            Materiales Reciclables
          </Link>
        </div>
      </div>
    </div>
  );
}
