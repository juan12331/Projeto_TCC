import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/navbarAdm.css"; 

const NavbarAdm = () => {

  const location = useLocation(); 

  return (

    <div className="navbarAdm-container">
        <header className="navbarAdm">
        <Link to="/usuarios" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            USUÁRIOS
        </Link>

        <Link to="/quartos" className={`nav-item ${location.pathname === "/contato" ? "active" : ""}`}>
            QUARTOS
        </Link>

        <img className="logo_navbar" src="./src/assets/imgNavbar/logo_navbar.png" alt="" />

        <Link to="/avaliacoes" className={`nav-item ${ location.pathname === "/acomodacoes" ? "active" : ""}`}>
            AVALIAÇÕES
        </Link>

        <Link to="/sair" className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}>
            SAIR
        </Link>
        </header>
    </div>
  );
};

export default NavbarAdm;
