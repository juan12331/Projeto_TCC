import React from "react";
import "./cadastro.css";
import { createUser } from '../../../services/Api_service';
import { useState, useEffect } from "react";

function Cadastro() {



  return (
    <div className="cadastro-container2">
      <div className="cadastro-box2">
        <div className="container22">
        <img
          src="src/assets/img/logo2.png"
          alt="Logo"
          className=""
        />
        </div>
        <form className="cadastro-form">
          <input type="text" placeholder="Nome" className="input-cadastro" />
          <input type="email" placeholder="Email" className="input-cadastro" />
          <input type="text" placeholder="CPF" className="input-cadastro" />
          <input type="tel" placeholder="Número de telefone" className="input-cadastro" />
          <input type="password" placeholder="Senha" className="input-cadastro" />
          <input type="password" placeholder="Confirmar senha" className="input-cadastro" />
          <button type="submit" className="cadastro-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
