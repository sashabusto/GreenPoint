import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserMenu() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuarioActivo");
        navigate("/login");
    };

    return (
        <div className="dropdown">
        <button
            className="btn btn-link nav-link dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
        >
            <span className="material-symbols-outlined">account_circle</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
            <li>
            <Link className="dropdown-item" to="/misMateriales">
                Mis materiales reciclados
            </Link>
            </li>
            <li>
            <button className="dropdown-item text-danger" onClick={handleLogout}>
                Cerrar sesión
            </button>
            </li>
        </ul>
        </div>
    );
}
