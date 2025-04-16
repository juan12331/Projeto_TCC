import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./login.css";
import { loginUser, getUsersByCpf } from "../../../services/Api_service";





const Login = () => {

  async function verificar () {
    const cpfzin = localStorage.getItem('cpf')
    console.log(cpfzin)
    if (cpfzin == null || cpfzin == undefined) {
      return;
    }
    await getUsersByCpf(cpfzin).then(data => {
      if (data.tipos_usuario.permissao == 'user'){
        navigate('/')
        return;
      } if (data.tipos_usuario.permissao == 'admin') {
        navigate('/Usuarios')
      }
    })
  }

  useEffect(() => {
    verificar()
  }, [])


  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate();


  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  
  function Logar() {
    if (cpf == '' || senha == '') {
      showError('preencha todos os campos')
      return;
    }

    loginUser(cpf, senha).then(data => {
      console.log(data.usuario.tipoUsuario)
      localStorage.clear() 
     localStorage.setItem("cpf", data.usuario.cpf);
      if (data.usuario.tipoUsuario == '2') {     
        navigate('/')
        return;
      } else if ( data.usuario.tipoUsuario == '1') {
      window.location.href = '/Usuarios'
    }
    }).catch(err => console.log(err))
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
  }
    return (
    <div className="login-page">
      <div className="fundo-login">
        <div className="back-container">
          <button onClick={() => navigate("/")} className="back-button"> ← </button>
          <h1 className="back-line">|</h1>
          <button onClick={() => navigate("/")} className="back-text"> HOME </button>
        </div>
          <div className="container-login">
            <img className="logo_login" src="./src/assets/imgLogin/logo_login.png" alt="" />
          </div>
            <form className="login-form">
              <h1 className="login-texto">LOGIN</h1>
              <div>
                <input type="tecxt" className="login-input" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="cpf" />
              </div>
              <div>
                <input type="password" className="login-input" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="SENHA" />
              </div>
              <div className="row">
              <span className='error' id='span'></span>
            </div>
              <button type="button" className="login-button" onClick={Logar}>ENTRAR</button>
              <div className="signup-link">
                  Não tem login? <a href="cadastro">Cadastre-se</a>
              </div>
            </form>
      </div>
    </div>
    );
  };

export default Login;