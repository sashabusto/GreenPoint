import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../materiales.css";
import logo from "../assets/Logo.png";
import plastico from "../assets/plastico.png";
import papelycarton from "../assets/papelycarton.jpg";
import vidrio from "../assets/vidrio.jpg";
import metal from "../assets/metales.jpg";
import ropaytela from "../assets/ropa.jpg";
import aceite from "../assets/aceite.png";
import pila from "../assets/pilas.png";
import raees from "../assets/RAEES.jpg";

export default function Materiales() {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Logo GreenPoint" className="logo" />
        
        <div className="user-icon">
        <Link to="/" className="inicio-link">Inicio</Link>
          <span className="material-symbols-outlined">account_circle</span>
          
        </div>
      </header>
    <div className="container mt-4">
        <h2 className="text-center mb-4">¿Que materiales puedo reciclar?</h2>
        <div className="ptitulo">
        <p>Todos los materiales deben estar limpios y secos.</p>
        </div>
        <span className="material-symbols-outlined iconotitulo">psychiatry</span>

        <div className="card-group">
        <div className="card">
            <img src={plastico} className="card-img-top" alt="Plástico" />
                <div className="card-body">
            <h5 className="card-title">Plástico</h5>
            <p className="card-text">Botellas, envases, tapitas, papel film, bolsas, sachets, potes, sillas, bidones, telgopor, envoltorios, radiografías, vajilla descartable limpia y seca.</p>
            </div>
        </div>

        <div className="card">
            <img src={papelycarton} className="card-img-top" alt="Cartón/Papel" />
            <div className="card-body">
            <h5 className="card-title">Papel y Cartón</h5>
            <p className="card-text">Papel blanco o de color (impreso o no), cartulinas, sobres de todo tipo de papel, diarios y revistas, folletos, guías telefónicas, cajas, cajas de huevos, rollos de papel. Envases tetra-brick de jugo, vino, salsa, leche.</p>
            </div>
        </div>

        <div className="card">
            <img src={vidrio} className="card-img-top" alt="Vidrio" />
            <div className="card-body">
            <h5 className="card-title">Vidrio</h5>
            <p className="card-text">Botellas, frascos, envases de vidrio transparente o de color. <strong>Por seguridad, los vidrios rotos deben envolverse.</strong></p>
            </div>
        </div>

        <div className="card">
            <img src={metal} className="card-img-top" alt="Metal" />
            <div className="card-body">
            <h5 className="card-title">Metal</h5>
            <p className="card-text">Latas y envases de acero, aluminio, hierro, plomo, cobre, zinc, bronce y otros metales ferrosos. Desodorante en aerosol, tapas de frascos, tapas de aluminio alimentos y papel de aluminio. Llaves, candados, picaportes, griferías, ollas o cualquier otro artefacto compuesto por cobre o estaño.</p>
            </div>
        </div>

        <div className="card">
            <img src={ropaytela} className="card-img-top" alt="Ropa y tela" />
            <div className="card-body">
            <h5 className="card-title">Papel y Cartón</h5>
            <p className="card-text">Trapos, sábanas, manteles viejos y ropa en desuso que no estén en condiciones de ser donados.</p>
            </div>
        </div>

        <div className="card">
            <img src={aceite} className="card-img-top" alt="Aceite vegetal usado" />
            <div className="card-body">
            <h5 className="card-title">Aceite vegetal usado</h5>
            <p className="card-text">Aceite de cocina usado de frituras, salsas, etc. Aceite de restaurantes o casa.</p>
            </div>
        </div>

        <div className="card">
            <img src={pila} className="card-img-top" alt="Pilas" />
            <div className="card-body">
            <h5 className="card-title">Pilas</h5>
            <p className="card-text">Pila común (zinc-carbono), alcalinas, de botón, recargables (litio, níquel).</p>
            </div>
        </div>

            <div className="card">
                <img src={raees} className="card-img-top" alt="RAEES" />
                <div className="card-body">
                <h5 className="card-title">Residuos de Aparatos Eléctricos y Electrónicos (RAEEs)</h5>
                <p className="card-text">Celulares viejos, computadoras, impresoras, televisores, microondas, cargadores, cables, heladeras, lavarropas, etc..</p>
            </div>
        </div>
        </div>
    </div>
    </div>
    );
}
