import React from "react";
import "./acomodacoes.css";

const Acomodacoes = () => {

    return (
    <div className="acomodacoes-page">
    {/* Colocar componente navbar */}
        <div className="container-acomodacoes">
            <h1 className="acomodacoes-titulo">Acomodações Disponíveis</h1>
            <img className="separador-acomodacoes" src="./src/assets/separador-acomodacoes.png" alt="" />
        </div>
    </div>
    );
  };

export default Acomodacoes;