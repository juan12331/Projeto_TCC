import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/navbarAdm.css"; 

const NavbarAdm = () => {

  const location = useLocation(); 

  return (

    <div className="navbarAdm-container">
        <header className="navbarAdm">
        <Link to="/usuarios" className={`nav-item ${location.pathname === "/usuarios" || location.pathname === "/criar_usuarios" ? "active" : ""}`}>
            USUÁRIOS
        </Link>

        <Link to="/quartosAdm" className={`nav-item ${location.pathname === "/quartosAdm" ? "active" : ""}`}>
            QUARTOS
        </Link>

        <img className="logo_navbar" src="./src/assets/imgNavbar/logo_navbar.png" alt="" />

        <Link to="/avaliacoesAdm" className={`nav-item ${ location.pathname === "/avaliacoesAdm" || location.pathname === "/ava_adm"? "active" : ""}`}>
            AVALIAÇÕES
        </Link>

        <Link to="/login" className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}>
            SAIR
        </Link>
        </header>
    </div>
  );
};

export default NavbarAdm;
