import React from "react";
import "./login.css";

const Login = () => {
    return (
<>
      <div className="fundo">
      <p>
        <div className="container">
          <img className="logo_login" src="./src/assets/logo_login.png" alt="" />
        </div>
        </p>
        <form>
          <h1>Login</h1>
          <p>
          <div>
            <input type="email" placeholder="E-mail" />
          </div>
          </p>
          <div>
            <input type="password" placeholder="Senha" />
          </div>
          <div className="signup-link">
            <p>
              Não tem login? <a href="#">Cadastra-se</a>
            </p>
          </div>
          <button>Entrar</button>
        </form>
      </div>
</>
    );
  };

export default Login;