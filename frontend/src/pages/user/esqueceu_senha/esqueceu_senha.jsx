import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../login/login.css';
import { getUsersByCpf } from "../../../services/Api_service";
import emailjs from '@emailjs/browser';

const keyPublica = import.meta.env.VITE_TOKEN_EMAIL;
const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateID = import.meta.env.VITE_TEMPLATE_ID;

const ForgotPassword = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cpfzin = localStorage.getItem('cpf');
    if (!cpfzin) return;

    getUsersByCpf(cpfzin).then(data => {
      if (data.tipos_usuario.permissao === 'user') {
        window.alert('perfil logado como usuário');
        navigate('/');
      } else if (data.tipos_usuario.permissao === 'admin') {
        window.alert('perfil logado como admin');
        navigate('/Usuarios');
      }
    });
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Buscar os dados do usuário pelo CPF
      const dados = await getUsersByCpf(cpf);
      
      // 2. Verificar se o usuário existe e tem um email
      if (!dados) {
        alert("Usuário não encontrado com este CPF!");
        setLoading(false);
        return;
      }
      
      const emailDoUsuario = dados.email;
      
      if (!emailDoUsuario) {
        alert("Este usuário não possui um e-mail cadastrado!");
        setLoading(false);
        return;
      }
      
      console.log("Email do usuário encontrado:", emailDoUsuario);
      
      // 3. Preparar os parâmetros para o template
      // IMPORTANTE: Estes nomes devem corresponder exatamente aos campos do seu template
      const templateParams = {
        to_email: emailDoUsuario,  // Verifique o nome correto no seu template
        user_email: emailDoUsuario, // Tente ambos os formatos comuns
        email: emailDoUsuario,      // Tente ambos os formatos comuns
        cpf: cpf,
        reset_link: `${window.location.origin}/reset-password?cpf=${encodeURIComponent(cpf)}`
      };
      
      console.log("Parâmetros sendo enviados:", templateParams);
      
      // 4. Enviar o email
      await emailjs.send(
        serviceId, 
        templateID, 
        templateParams, 
        { publicKey: keyPublica }
      );
      
      console.log('Email enviado com sucesso!');
      alert('E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      navigate('/login');
      
    } catch (error) {
      console.error('Erro durante o processo:', error);
      
      if (error.status === 422) {
        alert('Erro ao enviar o e-mail: Endereço de e-mail inválido ou vazio.');
      } else {
        alert(`Erro: ${error.text || 'Não foi possível completar a operação'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="login-page">
      <div className="fundo-login">
        <div className="back-container">
          <button onClick={() => navigate("/login")} className="back-button"> ← </button>
          <h1 className="back-line">|</h1>
          <button onClick={() => navigate("/login")} className="back-text"> LOGIN </button>
        </div>

        <div className="container-login">
          <img className="logo_login" src="./src/assets/imgLogin/logo_login.png" alt="Logo" />
        </div>

        <form className="login-form" onSubmit={sendEmail}>
          <h1 className="login-texto">Esqueci minha senha</h1>

          <div>
            <input
              type="text"
              className="login-input"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              placeholder="Digite o seu CPF"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Mandar Email'}
          </button>

          <div className="row">
            <span className="error" id="span"></span>
          </div>

          <div className="signup-link">
            Não tem conta? <a href="/cadastro">Cadastre-se</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;