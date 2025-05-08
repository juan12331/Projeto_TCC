import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../login/login.css'
import { getUsersByCpf } from "../../../services/Api_service";

const ForgotPassword = () => {

  async function verificar () {
    const cpfzin = localStorage.getItem('cpf')
    console.log(cpfzin)
    if (cpfzin == null || cpfzin == undefined) {
      return;
    }
    await getUsersByCpf(cpfzin).then(data => {
      if (data.tipos_usuario.permissao == 'user'){
        window.alert('perfil logado como usuário');
        navigate('/')
        return;
      } if (data.tipos_usuario.permissao == 'admin') {
        window.alert('perfil logado como usuário')
        navigate('/Usuarios')
      }
    })
  }

  async function mandarEmail () {
    localStorage.clear() 
        if (cpf == '') {
          showError('digite seu cpf')
          return;
        }

  }

  useEffect(() => {
    verificar()
  }, [])

  const [cpf, setCpf] = useState('')
  const navigate = useNavigate();

  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
  }
    return (
    <div className="login-page">
      <div className="fundo-login">
        <div className="back-container">
          <button onClick={() => navigate("/login")} className="back-button"> ← </button>
          <h1 className="back-line">|</h1>
          <button onClick={() => navigate("/login")} className="back-text"> LOGIN </button>
        </div>
          <div className="container-login">
            <img className="logo_login" src="./src/assets/imgLogin/logo_login.png" alt="" />
          </div>
            <form className="login-form">
              <h1 className="login-texto">Esqueci minha senha</h1>
              <div>
                <input type="tecxt" className="login-input" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="Digite o seu cpf" />
              </div>
              <div className="row">
              <span className='error' id='span'></span>
            </div>
              <button type="button" className="login-button" onClick={mandarEmail}>Mandar Email</button>
              <div className="signup-link">
                  Não tem conta? <a href="cadastro">Cadastre-se</a>
              </div>
            </form>
      </div>
    </div>
    );
  };

export default ForgotPassword;