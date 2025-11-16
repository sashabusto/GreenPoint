import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import L from "leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import fondo from "./assets/fondoGrennPoint.jpg";
import logo from "./assets/Logo.png";
import plantas from "./assets/plantasboton.png";
import ecoImg from "./assets/diamundialecologia.jpg";

export default function Home() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [showEco, setShowEco] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([-34.61, -58.38], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance.current);

    fetch("/puntosverdes.geojson")
      .then((res) => res.json())
      .then((data) => {
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) =>
            L.marker(latlng, {
              icon: L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                iconSize: [28, 28],
              }),
            }),
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              layer.bindPopup(`
                <b>${feature.properties.nombre}</b><br>
                Tipo: ${feature.properties.tipo}<br>
                Dirección: ${feature.properties.direccion}<br>
                Barrio: ${feature.properties.barrio}<br>
                Materiales: ${feature.properties.materiales}<br>
                Horario: ${feature.properties.horario}
              `);
            }
          },
        }).addTo(mapInstance.current);
      });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Navbar*/}
      <nav
        className="navbar navbar-expand-lg fixed-top custom-navbar"
        style={{
          backgroundColor: "rgba(164, 207, 205, 0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="container-fluid px-4">
          <a className="navbar-brand d-flex align-items-center" href="#inicio">
            <img src={logo} alt="GreenPoint" height="180" />
          </a>

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
                <button className="nav-link" onClick={() => scrollTo("boton-cambio")}>
                  ¡Empezá tu cambio!
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => scrollTo("map-section")}>
                  Ver mapa
                </button>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link d-flex align-items-center">
                  <span className="material-symbols-outlined me-1">account_circle</span>
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="inicio"
        className="hero"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay"></div>
        <div className="hero-text">
          <p className="subtitulo">Las 3R del cambio</p>
          <h1>REDUCÍ – REUTILIZÁ – RECICLÁ</h1>
          <p className="frase">
            <em>Encontrá tu punto verde y hacé la diferencia.</em>
          </p>
        </div>
      </section>

      {/* Mapa */}
      <section id="map-section" className="MapaReciclar">
        <div className="TextoMapa">
          <h1>PUNTOS DE RECICLAJE - CABA</h1>
          <span className="material-symbols-outlined iconoMapa">psychiatry</span>
        </div>
        <div className="mapa-container">
          <div ref={mapRef} className="mapa" />
        </div>
      </section>

      {/* Botón principal */}
      <div id="boton-cambio" className="container-boton">
        <button
          className="boton-cambio"
          onClick={() => {
            const usuario = localStorage.getItem("usuarioActivo");
            if (usuario) {
              navigate("/registrarMateriales"); // si inició sesión
            } else {
              navigate("/login"); // si NO inició sesión
          }
          }}
        >
          <img src={plantas} alt="Plantitas" className="boton-img" />
          <span className="boton-texto">¡Quiero empezar mi cambio!</span>
        </button>
      </div>

      {/* Día Mundial de la Ecología */}
      {showEco && (
        <div className="eco-container">
          <button className="close-btn" onClick={() => setShowEco(false)}>×</button>
          <img src={ecoImg} alt="Día Mundial de la Ecología" />
          <h3>1 de Noviembre</h3>
          <p>¡Día Mundial de la Ecología! 🌱</p>
          <p>
            Es el momento perfecto para reflexionar sobre nuestro impacto en el
            planeta y tomar pequeñas acciones cada día para proteger nuestro
            hogar. ¡Cuidar la Tierra es responsabilidad de todos!
          </p>
        </div>
      )}

      {/* Data bar */}
      <div className="data-bar">
        <div className="data-left">
          <p>
            🌱Las <strong>Botellas de Amor</strong> son botellas plásticas (como las
            de gaseosa o agua) que se rellenan con residuos plásticos que
            normalmente no se pueden reciclar, como bolsas, envoltorios de
            golosinas o envases flexibles. La idea es compactar todos esos
            plásticos dentro de la botella para darles una segunda vida. 💚
            <strong> ¡Comenzá hoy y hacé la diferencia! 🌿</strong>
          </p>
        </div>

        <div className="buttons-right">
          <button className="btn-small" onClick={() => navigate("/porquereciclo")}>¿Para qué sirve reciclar?</button>
          <button className="btn-large" onClick={() => navigate("/registrarMateriales")}>Registra tus reciclajes!</button>
          <button className="btn-small" onClick={() => navigate("/materiales")}>
            ¿Qué materiales puedo reciclar?
          </button>
        </div>
      </div>
    </div>
  );
}
