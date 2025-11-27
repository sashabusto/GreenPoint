import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserMenu from "../components/UserMenu";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function MisMateriales() {
    const [lista, setLista] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    useEffect(() => {
        if (!usuario) return;

        fetch("http://grupo4.practicas.local/php/misMateriales.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Id_login: usuario.Id_login })
        })
        .then(res => res.json())
        .then(data => setLista(data))
        .catch(err => console.error(err));
    }, [usuario]);

    return (
        <>
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
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registrarmateriales">Registrar Materiales</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/materiales">Materiales</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/porquereciclo">¿Para qué sirve reciclar?</Link>
                            </li>

                            {!usuario ? (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link d-flex align-items-center">
                                        <span className="material-symbols-outlined me-1">account_circle</span>
                                        Iniciar sesión
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <UserMenu />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 pt-5">
                {!usuario ? (
                    <h2 className="text-center mt-5">No has iniciado sesión</h2>
                ) : (
                    <>
                        <h2 className="text-center mb-4">Mis materiales reciclados</h2>

                        {lista.length === 0 ? (
                            <p className="text-center">Todavía no se han registrado materiales.</p>
                        ) : (
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Otro (si corresponde)</th>
                                        <th>Cantidad</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((item) => (
                                        <tr key={item.Id_residuos}>
                                            <td>{item.tipo_residuo}</td>
                                            <td>{item.otro_residuo ?? "-"}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{new Date(item.fecha).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </div>
        </>
    );
}