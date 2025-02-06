import React from "react";
import "./login.css";

const Login = () => {
    return (
<>
      <div className="fundo">
        <div className="container">
          <img className="logo_login" src="./src/assets/logo_login.png" alt="" />
        </div>
        <form>
          <h1>LOGIN</h1>
          <div>
            <input type="email" placeholder="EMAIL" />
          </div>
          <div>
            <input type="password" placeholder="SENHA" />
          </div>
          <button>ENTRAR</button>
          <div className="signup-link">
              Não tem login? <a href="#">Cadastre-se</a>
          </div>
        </form>
      </div>
</>
    );
  };

export default Login;