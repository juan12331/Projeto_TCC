import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsersByCpf } from "../../../services/Api_service";
import axios from "axios";
import bcryptjs from 'bcryptjs';

// Use o http instance para chamadas API
const http = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

const RedefinirSenha = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se o usuário está logado e redireciona conforme o tipo
  async function verificar() {
    const cpfzin = localStorage.getItem('cpf');
    if (!cpfzin) {
      return;
    }
    
    try {
      const data = await getUsersByCpf(cpfzin);
      if (data.tipos_usuario.permissao === 'user') {
        navigate('/');
      } else if (data.tipos_usuario.permissao === 'admin') {
        navigate('/Usuarios');
      }
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    }
  }

  useEffect(() => {
    verificar();
  }, []);

  // Formata o CPF com pontos e traço (XXX.XXX.XXX-XX)
  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Atualiza a senha do usuário
  async function updatePassword(cpf, senha) {
    try {
      // Usa a mesma estrutura que você mostrou no updateUser
      const response = await http.put(`/usuarios/${cpf}`, { senha: senha });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      throw error;
    }
  }

  // Função para confirmar a atualização da senha
  async function Confirm(e) {
    e.preventDefault();
    
    // Validações
    if (cpf === '' || senha === '' || confirmSenha === '') {
      showError('Preencha todos os campos');
      return;
    }
    
    if (senha !== confirmSenha) {
      showError('As senhas não coincidem');
      return;
    }
    
    if (senha.length < 6) {
      showError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Criptografa a senha com bcryptjs e fator 10
      const salt = await bcryptjs.genSalt(10);
      const senhaCriptografada = await bcryptjs.hash(senha, salt);
      
      // Chama a função para atualizar a senha
      await updatePassword(cpf, senhaCriptografada);
      
      // Feedback e redireção
      window.alert("Senha alterada com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro na atualização de senha:", error);
      if (error.response && error.response.status === 404) {
        showError("CPF não encontrado");
      } else {
        showError("Erro ao atualizar senha. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Exibe mensagens de erro
  const showError = (message) => {
    const span = document.getElementById('span');
    if (span) {
      span.textContent = message;
    }
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
        <form className="login-form" onSubmit={Confirm}>
          <h1 className="login-texto">Alterar a senha</h1>
          <div>
            <input 
              type="text" 
              className="login-input" 
              value={cpf} 
              onChange={(e) => setCpf(formatCPF(e.target.value))} 
              placeholder="Digite seu CPF" 
              maxLength="14"
              disabled={isLoading}
            />
          </div>
          <div>
            <input 
              type="password" 
              className="login-input" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Digite sua nova senha" 
              disabled={isLoading}
            />
          </div>
          <div>
            <input 
              type="password" 
              className="login-input" 
              value={confirmSenha} 
              onChange={(e) => setConfirmSenha(e.target.value)} 
              placeholder="Confirme sua nova senha" 
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : 'Confirmar alterações'}
          </button>
          <div className="row">
            <span className='error' id='span'></span>
          </div>
          <div className="signup-link">
            Voltar para <a href="login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedefinirSenha;