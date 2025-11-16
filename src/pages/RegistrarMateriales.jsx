import React, { useState,useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RegistrarMateriales.css";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function RegistrarMateriales() {
    useEffect(() => {
        document.body.classList.add("body-registrar");

        return () => {
            document.body.classList.remove("body-registrar");
        };
    }, []);
    const materialesLista = [
        "Plástico",
        "Papel y Cartón",
        "Vidrio",
        "Metal",
        "Ropa y Tela",
        "Aceite vegetal usado",
        "Pilas",
        "RAEEs",
    ];

    const [materiales, setMateriales] = useState(
        materialesLista.reduce((acc, mat) => {
        acc[mat] = { checked: false, cantidad: "" };
        return acc;
        }, {})
    );

    const [mensaje, setMensaje] = useState("");

    const handleCheck = (mat) => {
        setMateriales({
        ...materiales,
        [mat]: {
            ...materiales[mat],
            checked: !materiales[mat].checked,
            cantidad: ""
        }
        });
    };

    const handleCantidad = (mat, valor) => {
        setMateriales({
        ...materiales,
        [mat]: {
            ...materiales[mat],
            cantidad: valor
        }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const seleccionados = Object.entries(materiales).filter(
        ([mat, data]) => data.checked && data.cantidad
        );

        if (seleccionados.length === 0) {
        setMensaje("Por favor seleccioná al menos un material y su cantidad.");
        return;
        }

        const registros = seleccionados.map(([mat, data]) => ({
        Id_login: 1,
        tipo_residuo: mat,
        otro_residuo: null,
        cantidad: data.cantidad
        }));

        console.log("A enviar al backend:", registros);
        setMensaje("♻️ Materiales registrados correctamente");

        setMateriales(
        materialesLista.reduce((acc, mat) => {
            acc[mat] = { checked: false, cantidad: "" };
            return acc;
        }, {})
        );
    };

    return (
        <>
        {/* NAVBAR */}
        <nav
            className="navbar navbar-expand-lg fixed-top custom-navbar"
            style={{
            backgroundColor: "rgba(164, 207, 205, 0.85)",
            backdropFilter: "blur(6px)",
            }}
        >
            <div className="container-fluid px-4">
            
            {/* Ruta al inicio */}
            <Link
                to="/"
                className="navbar-brand d-flex align-items-center"
                style={{ cursor: "pointer" }}
            >
                <img src={logo} alt="GreenPoint" height="180" />
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
                    className="nav-link fw-bold"
                    style={{ fontSize: "18px" }}
                    >
                    Inicio
                    </Link>
                </li>

                </ul>
            </div>

            
            </div>
        </nav>

        {/* Body */}
        <div className="container_registro_reciclaje">
            <h2 className="Titulo_Registrar_Reciclaje">Registrar materiales reciclados</h2>

            {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow">
            <p className="fw-bold">Seleccioná los materiales que reciclaste:</p>

            {materialesLista.map((mat) => (
                <div key={mat} className="mb-3 border-bottom pb-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                    <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={materiales[mat].checked}
                        onChange={() => handleCheck(mat)}
                    />
                    <label className="form-check-label fw-bold">{mat}</label>
                    </div>

                    {materiales[mat].checked && (
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        style={{ width: "170px" }}
                        placeholder="Cantidad kg"
                        value={materiales[mat].cantidad}
                        onChange={(e) => handleCantidad(mat, e.target.value)}
                    />
                    )}
                </div>
                </div>
            ))}

            <button className="btn btn-success w-100 fw-bold" type="submit">
                Registrar ♻️
            </button>
            </form>

            {/* Volver al inicio: */}
            <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline-success fw-bold">
                ← Volver al inicio
            </Link>
            </div>
        </div>
        </>
    );
}
