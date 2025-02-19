import React from "react";
import "./cadastro.css";

function Cadastro() {
  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="container">
        <img
          src="src/assets/img/logo2.png"
          alt="Logo"
          className=""
        />
        </div>
        <form className="cadastro-form">
          <input type="text" placeholder="Nome" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input type="text" placeholder="CPF" className="input-field" />
          <input type="tel" placeholder="Número de telefone" className="input-field" />
          <input type="password" placeholder="Senha" className="input-field" />
          <input type="password" placeholder="Confirmar senha" className="input-field" />
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
