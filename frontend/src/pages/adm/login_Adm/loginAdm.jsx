import React from "react";
import "./loginAdm.css";

const LoginAdm = () => {

    return (
    <div className="login-pageAdm">
      <div className="fundo-loginAdm">
        <div className="back-containerAdm">
          <button onClick={() => navigate("/usuarios")} className="back-buttonAdm"> ← </button>
          <h1 className="back-lineAdm">|</h1>
          <button onClick={() => navigate("/usuarios")} className="back-textAdm"> HOME </button>
        </div>
          <div className="container-loginAdm">
            <img className="logo_loginAdm" src="./src/assets/imgLogin/logo_login.png" alt="" />
          </div>
            <form className="login-formAdm">
              <h1 className="login-textoAdm">LOGIN</h1>
              <div>
                <input type="email" className="login-inputAdm" placeholder="EMAIL" />
              </div>
              <div>
                <input type="password" className="login-inputAdm" placeholder="SENHA" />
              </div>
              <button type="submit" className="login-buttonAdm">ENTRAR</button>
              <div className="signup-linkAdm">
                  Não tem login? <a href="cadastroAdm">Cadastre-se</a>
              </div>
            </form>
      </div>
    </div>
    );
  };

export default LoginAdm;