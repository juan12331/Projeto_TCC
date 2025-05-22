import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/navbarUser.css"; 
import logo from '../../assets/imgNavbar/logo_navbar.png';

const NavbarUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar se há um CPF no localStorage para determinar se o usuário está logado
    const userCpf = localStorage.getItem('cpf');
    setIsLoggedIn(!!userCpf); // Converte para booleano (true se existir, false se não)
  }, [location]); // Re-verificar sempre que a localização mudar
  
  const handleLogout = () => {
    // Limpar localStorage e redirecionar para login
    localStorage.clear();
    navigate('/login');
  };

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
          <img className="logo_navbar" src={logo} alt="Logo" />
        </Link>

        <Link to="/acomodacoes" className={`nav-item ${ location.pathname === "/acomodacoes" || location.pathname === "/quartos" ? "active" : ""}`}>
          ACOMODAÇÕES
        </Link>

        {isLoggedIn ? (
          // Se logado, mostra PERFIL
          <Link to="/perfil" className={`nav-item ${location.pathname === "/perfil" ? "active" : ""}`}>
            PERFIL
          </Link>
        ) : (
          // Se não logado, mostra LOGIN
          <Link to="/login" className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}>
            LOGIN
          </Link>
        )}
      </header>
    </div>
  );
};

export default NavbarUser;
