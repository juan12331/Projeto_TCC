import React from "react";
import "./login.css";

const Login = () => {

    return (
    <div className="login-page">
      <div className="fundo-login">
        <div className="back-container">
          <button onClick={() => navigate("/")} className="back-button"> ← </button>
          <h1 className="back-line">|</h1>
          <button onClick={() => navigate("/")} className="back-text"> HOME </button>
        </div>
          <div className="container-login">
            <img className="logo_login" src="./src/assets/logo_login.png" alt="" />
          </div>
            <form className="login-form">
              <h1 className="login-texto">LOGIN</h1>
              <div>
                <input type="email" className="login-input" placeholder="EMAIL" />
              </div>
              <div>
                <input type="password" className="login-input" placeholder="SENHA" />
              </div>
              <button type="submit" className="login-button">ENTRAR</button>
              <div className="signup-link">
                  Não tem login? <a href="#">Cadastre-se</a>
              </div>
            </form>
      </div>
    </div>
    );
  };

export default Login;