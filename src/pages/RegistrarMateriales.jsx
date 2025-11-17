import React, { useState,useEffect } from "react";
import UserMenu from "../components/UserMenu";
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
        "Botella de Amor",
        "Otro"
    ];

    const [materiales, setMateriales] = useState(
        materialesLista.reduce((acc, mat) => {
            acc[mat] = { checked: false, cantidad: "", nombre: "" };
            return acc;
        }, {})
    );

    const [mensaje, setMensaje] = useState("");

    const handleCheck = (mat) => {
        setMateriales({
            ...materiales,
            [mat]: {
                checked: !materiales[mat].checked,
                cantidad: "",
                nombre: ""
            }
        });
    };

    // Prevenir números negativos
    const validarCantidad = (valor) => {
        if (valor === "") return "";
        return Math.max(0, parseFloat(valor));
    };

    const handleCantidad = (mat, valor) => {
        setMateriales({
            ...materiales,
            [mat]: { ...materiales[mat], cantidad: validarCantidad(valor) }
        });
    };

    const handleNombreOtro = (valor) => {
        setMateriales({
            ...materiales,
            Otro: { ...materiales["Otro"], nombre: valor }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //  Validación extra de q la cantidad sea mayor a 0 por seguridad
        const seleccionados = Object.entries(materiales).filter(
            ([mat, data]) =>
                data.checked &&
                ((mat === "Otro" && data.nombre && data.cantidad >= 0) ||
                (mat !== "Otro" && data.cantidad >= 0))
        );

        if (seleccionados.length === 0) {
            setMensaje("Por favor seleccioná al menos un material y su cantidad.");
            return;
        }

        const registros = seleccionados.map(([mat, data]) => ({
            Id_login: 1,
            tipo_residuo: mat === "Otro" ? "Otro" : mat,
            otro_residuo: mat === "Otro" ? data.nombre : null,
            cantidad: data.cantidad
        }));

        fetch("http://grupo4.practicas.local/php/registrar_materiales.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registros)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setMensaje("❌ " + data.error);
                    return;
                }

                setMensaje("♻️ Materiales registrados correctamente");

                // Resetear el formulario
                setMateriales(
                    materialesLista.reduce((acc, mat) => {
                        acc[mat] = { checked: false, cantidad: "", nombre: "" };
                        return acc;
                    }, {})
                );
            })
            .catch(() => {
                setMensaje("❌ Error de conexión con el servidor");
            });
    };

    return (
        <>
        {/* NAVBAR */}
        <nav
            className="navbar navbar-expand-lg fixed-top custom-navbar"
            style={{
                backgroundColor: "rgba(192, 236, 236, 0.85)",
                backdropFilter: "blur(6px)",
            }}
        >
            <div className="container-fluid px-4">

            <Link
                to="/"
                className="navbar-brand d-flex align-items-center"
                style={{ cursor: "pointer" }}
            >
                <img src={logo} alt="GreenPoint" height="70" />
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

                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Inicio
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/porquereciclo">
                        ¿Para qué sirve reciclar?
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Materiales">
                        ¿Qué materiales puedo reciclar?
                    </Link>
                </li>

                <li className="nav-item">
                    <UserMenu />    
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

                    {/* Checkbox */}
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={materiales[mat].checked}
                            onChange={() => handleCheck(mat)}
                        />
                        <label className="form-check-label fw-bold">{mat}</label>
                    </div>

                    {/* Inputs */}
                    {materiales[mat].checked && (
                        <>
                            {mat === "Otro" ? (
                                <div className="d-flex flex-column" style={{ width: "220px" }}>

                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Nombre del material"
                                        value={materiales["Otro"].nombre}
                                        onChange={(e) => handleNombreOtro(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="form-control"
                                        placeholder="Cantidad kg o uds"
                                        value={materiales["Otro"].cantidad}
                                        onChange={(e) => handleCantidad("Otro", e.target.value)}
                                    />

                                </div>
                            ) : (
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                    style={{ width: "210px" }}
                                    placeholder="Cantidad kg o uds"
                                    value={materiales[mat].cantidad}
                                    onChange={(e) => handleCantidad(mat, e.target.value)}
                                />
                            )}
                        </>
                    )}

                </div>
                </div>
            ))}

            <button className="btn btn-success w-100 fw-bold" type="submit">
                Registrar ♻️
            </button>
            </form>

            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-success fw-bold">
                    ← Volver al inicio
                </Link>
            </div>
        </div>
        </>
    );
}
