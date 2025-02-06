<<<<<<< HEAD
import React from "react";
import "./Cadastro.css";

function Cadastro() {
  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <img
          src="src/assets/quinta2.png"
          alt="Logo"
          className="logo"
        />
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
=======
import React from 'react'

const cadastro = () => {
  return (
    <></>
  )
}

export default cadastro
>>>>>>> 60f0637d0fa809813c974e9d5acbf7d85af4c515
