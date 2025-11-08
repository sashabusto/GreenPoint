import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ IMPORTANTE
import L from "leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import fondo from "./assets/fondoGrennPoint.jpg";
import logo from "./assets/Logo.png";
import plantas from "./assets/plantasboton.png"; 
import ecoImg from "./assets/diamundialecologia.jpg";

export default function Home() {
  const navigate = useNavigate(); // ✅ PARA NAVEGAR
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

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo GreenPoint" className="logo" />
        <div className="user-icon">
          <Link to="/Login">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
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
      <section className="MapaReciclar">
        <div className="TextoMapa">
          <h1>PUNTOS DE RECICLAJE - CABA </h1>
          <span className="material-symbols-outlined iconoMapa">psychiatry</span>
        </div>
        <div className="mapa-container">
          <div ref={mapRef} className="mapa" />
        </div>
      </section>

      {/* Botón principal */}
      <div className="container-boton">
        <button className="boton-cambio">
          <img src={plantas} alt="Plantitas" className="boton-img" />
          <span className="boton-texto">¡Quiero empezar mi cambio!</span>
        </button>
      </div>

      {/* Contenedor Día Mundial de la Ecología */}
      {showEco && (
        <div className="eco-container">
          <button className="close-btn" onClick={() => setShowEco(false)}>×</button>
          <img src={ecoImg} alt="Día Mundial de la Ecología" />
          <h3>1 de Noviembre</h3>
          <p>¡Día Mundial de la Ecología! 🌱</p>
          <p>Es el momento perfecto para reflexionar sobre nuestro impacto en el planeta y tomar pequeñas acciones cada día para proteger nuestro hogar. ¡Cuidar la Tierra es responsabilidad de todos!</p>
        </div>
      )}

      {/* Data bar */}
      <div className="data-bar">
        <div className="data-left">
          <p>🌱Las <strong>Botellas de Amor</strong> son botellas plásticas (como las de gaseosa o agua) que se rellenan con residuos plásticos que normalmente no se pueden reciclar, como bolsas, envoltorios de golosinas o envases flexibles. La idea es compactar todos esos plásticos dentro de la botella para darles una segunda vida. Es una forma creativa de reciclar materiales que normalmente serían basura. 💚<strong> ¡Comenzá hoy y hacé la diferencia! 🌿</strong></p>
        </div>

        <div className="buttons-right">
          <button className="btn-small">¿Para qué sirve reciclar?</button>
          <button className="btn-large">Registra tus reciclajes!</button>
          <button className="btn-small" onClick={() => navigate("/materiales")}>
            ¿Qué materiales puedo reciclar?
          </button>
        </div>
      </div>
    </div>
  );
}
