import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/navbarUser.css"; 

const NavbarUser = () => {

  const location = useLocation(); 

  return (

    <div className="navbarUser-container">
        <header className="navbarUser">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            INÍCIO
        </Link>

        <Link to="/contato" className={`nav-item ${location.pathname === "/contato" ? "active" : ""}`}>
            CONTATO
        </Link>
        
        <Link to="/" className="img-navbar">
            <img className="logo_navbar" src="./src/assets/imgNavbar/logo_navbar.png" alt="Logo" />
        </Link>

        <Link to="/acomodacoes" className={`nav-item ${ location.pathname === "/acomodacoes" || location.pathname === "/quartos" ? "active" : ""}`}>
            ACOMODAÇÕES
        </Link>

        <Link to="/perfil" className={`nav-item ${location.pathname === "/perfil" ? "active" : ""}`}>
            PERFIL
        </Link>
        </header>
    </div>
  );
};

export default NavbarUser;
