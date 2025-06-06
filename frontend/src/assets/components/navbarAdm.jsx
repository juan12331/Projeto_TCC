import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/navbarAdm.css"; 
import { logout } from "../../services/Api_service";
import logo from '../../assets/imgNavbar/logo_navbar.png';

const NavbarAdm = () => {

  const location = useLocation(); 

    async function LogOut(){
        logout()
    }

  return (

    <div className="navbarAdm-container">
        <header className="navbarAdm">
        <Link to="/usuarios" className={`nav-item ${location.pathname === "/usuarios" || location.pathname === "/criar_usuarios" || location.pathname === "/perfilAdm" ? "active" : ""}`}>
            USUÁRIOS
        </Link>

        <Link to="/acomodacoesAdm" className={`nav-item ${location.pathname === "/acomodacoesAdm" || location.pathname.startsWith("/quartosAdm") || location.pathname === "/criarAcomodacao" ? "active" : ""}`}>
            QUARTOS
        </Link>

        <Link to="/usuarios" className="img-navbar">
          <img className="logo_navbar" src={logo} alt="Logo" />
        </Link>

        <Link to="/avaliacoesAdm" className={`nav-item ${ location.pathname === "/avaliacoesAdm" || location.pathname === "/Avaliacao"?  "active" : ""}`}>

            AVALIAÇÕES
        </Link>

        <Link to="/login" className={`nav-item ${location.pathname === "/login" ? "active" : ""}`} onClick={() => {
    localStorage.clear();
    LogOut
  }}
>
            SAIR
        </Link>
        </header>
    </div>
  );
};

export default NavbarAdm;
