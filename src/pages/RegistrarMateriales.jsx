import React, { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RegistrarMateriales.css";
import { Link, Navigate } from "react-router-dom"; // <-- necesario si validamos login
import logo from "../assets/Logo.png";

export default function RegistrarMateriales() {
    // -----------------------------
    // HOOKS (siempre primero)
    // -----------------------------
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

    const [materiales, setMateriales] = useState(() =>
        materialesLista.reduce((acc, mat) => {
            acc[mat] = { checked: false, cantidad: "", nombre: "" };
            return acc;
        }, {})
    );

    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        document.body.classList.add("body-registrar");
        return () => document.body.classList.remove("body-registrar");
    }, []);

    // -----------------------------
    // LOGIN / USUARIO
    // -----------------------------
    // Si querés sacar la validación de login, comentar estas 2 líneas
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) return <Navigate to="/Login" replace />; // <- redirige al login si no hay usuario

    // -----------------------------
    // FUNCIONES DEL FORMULARIO
    // -----------------------------
    const handleCheck = (mat) => {
        setMateriales({
            ...materiales,
            [mat]: { checked: !materiales[mat].checked, cantidad: "", nombre: "" }
        });
    };

    const validarCantidad = (valor) => (valor === "" ? "" : Math.max(0, parseFloat(valor)));

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
            Id_login: usuario?.id || 1 , // <- usa id del usuario activo
            tipo_residuo: mat === "Otro" ? "Otro" : mat,
            otro_residuo: mat === "Otro" ? data.nombre : null,
            cantidad: data.cantidad
        }));

        fetch("http://grupo4.practicas.local/php/registrar_materiales.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registros)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setMensaje("❌ " + data.error);
                    return;
                }

                setMensaje("♻️ Materiales registrados correctamente");

                setMateriales(
                    materialesLista.reduce((acc, mat) => {
                        acc[mat] = { checked: false, cantidad: "", nombre: "" };
                        return acc;
                    }, {})
                );
            })
            .catch(() => setMensaje("❌ Error de conexión con el servidor"));
    };

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <>
            {/* NAVBAR */}
            <nav
                className="navbar navbar-expand-lg custom-navbar"
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
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/porquereciclo">¿Para qué sirve reciclar?</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Materiales">¿Qué materiales puedo reciclar?</Link>
                            </li>
                            <li className="nav-item">
                                <UserMenu />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* BODY */}
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
