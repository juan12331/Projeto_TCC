import React from "react";
import "./cadastro.css";
import { createUser , getUsersByCpf } from '../../../services/Api_service';
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

  function Criar(e) {
    e.preventDefault();

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
    } if (validateCPF(cpf) != true) {
      console.log(validateCPF(cpf))
      showError('cpf inexistente')
      return
    }
    console.log(cpf, nome, email, senha, telefone)

    createUser(cpf, nome, email, senha, telefone, 2).then(data => {
      console.log(data)
      if (data == 'usuario ja foi cadastrado'){
        showError('Usuário Já Cadastrado')
        return;
      }
      Login()
    }).catch(err => console.log(err))
    
  }

  const validateCPF = (cpf) => {
        // Função para validar CPF
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
      };

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
  }

  function Login() {
    navigate("/login")
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
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setName(e.target.value)} className="input-cadastro login-input" maxLength={100} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-cadastro login-input"maxLength={100} />
            <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} className="input-cadastro login-input"maxLength={100} />
            <input type="tel" placeholder="Número de telefone" value={telefone} onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} className="input-cadastro login-input"maxLength={25} />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="input-cadastro login-input"maxLength={100} />
            <input type="password" placeholder="Confirmar senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="input-cadastro login-input"maxLength={100} />
            <div className="row">
              <span className='error' id='span'></span>
            </div>
            <div className="botoes-cadastro">
            <button className="cadastro-button" onClick={(e) => Criar(e)}>Cadastrar</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Cadastro;
