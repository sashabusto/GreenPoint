import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import fondo from "./assets/fondoGrennPoint.jpg";
import logo from "./assets/Logo.png";

export default function Home() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Crear mapa
    mapInstance.current = L.map(mapRef.current).setView([-34.61, -58.38], 12);

    // Capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance.current);

   
    // Cargar GeoJSON
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
          <span className="material-symbols-outlined">account_circle</span>
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
    </div>
  );
}
