import React from "react";
import "./usuariosAdm.css";
import NavbarAdm from "../../../assets/components/navbarAdm";

const UsuariosAdm = () => {

    return(
    <div className="usuarios-pageAdm">
        <NavbarAdm/>
        <div className="inicio-usuariosAdm">
        <h1 className="usuariosAdm-titulo">ACOMODAÇÕES <br /> DISPONÍVEIS</h1>
        <div className="separador-usuariosAdm">
          <div className="circle-usuariosAdm"></div>
          <div className="divider-usuariosAdm"></div>
          <div className="circle-usuariosAdm"></div>
        </div>
      </div>
    </div>
    );
};

export default UsuariosAdm