import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/navbarAdm.css"; 
import { logout } from "../../services/Api_service";

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

        <Link to="/quartosAdm" className={`nav-item ${location.pathname === "/quartosAdm" ? "active" : ""}`}>
            QUARTOS
        </Link>

        <img className="logo_navbar" src="./src/assets/imgNavbar/logo_navbar.png" alt="" />

<<<<<<< HEAD
        <Link to="/avaliacoesAdm" className={`nav-item ${ location.pathname === "/avaliacoesAdm" || location.pathname === "/ava_adm"?  "active" : ""}`}>
=======
        <Link to="/avaliacoesAdm" className={`nav-item ${ location.pathname === "/avaliacoesAdm" || location.pathname === "/ava_adm"? "active" : ""}`}>
>>>>>>> 6dd29902f694b3d7f3af83de348cc43210d50c3a
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
