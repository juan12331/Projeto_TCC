import React from "react";
import "./usuarios.css";
import NavbarAdm from "../../../assets/components/navbarAdm";

const Usuarios = () => {

    return(
    <div className="usuarios-page">
        <NavbarAdm/>
        <div className="inicio-usuarios">
        <h1 className="usuarios-titulo">Buscar por Usuários</h1>
        <div className="separador-usuarios">
          <div className="circle-usuarios"></div>
          <div className="divider-usuarios"></div>
          <div className="circle-usuarios"></div>
        </div>
      </div>

      <div className="fundo-usuarios">
        <div className="pesquisa-usuarios">
          <input id='search' className='search-usuarios' placeholder='CPF ou NOME de usuário'></input>
          <button type="submit" className="buttonSearch-usuarios">Buscar</button>
        </div>
      </div>
    </div>
    );
};

export default Usuarios