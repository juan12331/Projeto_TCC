import React from "react";
import "./cadastro.css";
import { createUser } from '../../../services/Api_service';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
  const rageCaracter = /^.{8,}$/;
  const regexMaisDe14Caracteres = /^.{15,}$/

  const [cpf, setCpf] = useState('')
  const [nome, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [telefone, setTelefone] = useState('')

  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return phoneNumber;
    }
  }

  function Criar() {
    if (senha != confirmar) {
      showError("Confirmar senha e senha tem que estar igual")
      return;
    }
    if (nome == '' || email == '' || senha == '' || telefone == '' || cpf == '') {
      showError('preencha todos os campos')
      return;
    }
    if (!rageEmail.test(email)) {
      showError('Email invalido')
      return;
    } if (!rageSenha.test(senha)) {
      showError('Senha fraca, coloque numeros e letras maiusculas')
      return;
    } if (!rageCaracter.test(senha)) {
      showError('senha precisa no minimo de 8 caracteres')
      return
    } if (regexMaisDe14Caracteres.test(cpf)) {
      showError('Cpf incorreto')
      return
    } if (regexMaisDe14Caracteres.test(telefone)) {
      showError('telefone não suportado/incorreto')
      return
    }

    createUser(cpf, nome, email, senha, telefone).then(data => {


      Login()

    }).catch(err => console.log(err))
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
  }


  return (
    <div className="cadastro-container2">
      <div className="cadastro-box2">
        <div className="back-cadastro">
            <button onClick={() => navigate("/login")} className="backButton-cadastro"> ← </button>
            <h1 className="backLine-cadastro">|</h1>
            <button onClick={() => navigate("/login")} className="backText-cadastro"> LOGIN </button>
          </div>
          <div className="container22">
            <img
              src="src/assets/img/logo2.png"
              alt="Logo"
              className="logo-cadastro"
            />
          </div>
          <form className="cadastro-form">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setName(e.target.value)} className="input-cadastro login-input" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-cadastro login-input" />
            <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} className="input-cadastro login-input" />
            <input type="tel" placeholder="Número de telefone" value={telefone} onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} className="input-cadastro login-input" />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="input-cadastro login-input" />
            <input type="password" placeholder="Confirmar senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="input-cadastro login-input" />
            <div className="row">
              <span className='error' id='span'></span>
            </div>
            <div className="botoes-cadastro">
            <button type="submit" className="cadastro-button">Cadastrar</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Cadastro;
