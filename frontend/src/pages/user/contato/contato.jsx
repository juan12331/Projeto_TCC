import React, { useState, useEffect } from "react";
import "./contato.css";
import { FaStar } from "react-icons/fa";
import { Envelope, Telephone, Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";
import vamos from "/src/assets/img/vamos.png"; // Importe a imagem "vamos.png"
import ava from "/src/assets/img/ava.png";
import NavbarUser from "../../../assets/components/navbarUser";
import { createAvaliacoes } from "../../../services/Api_service";
import { useParams } from "react-router-dom";

const Contato = () => {
  const [avaliacao_texto, setAvaliacao_texto] = useState('');
  const [nota, setNota] = useState(0);
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  
  // Use useEffect to safely get the CPF from localStorage
  useEffect(() => {
    // Try different possible storage formats
    try {
      // First key is 'cpf' in your screenshot
      const cpfKey = Object.keys(localStorage).find(key => key === 'cpf');
      if (cpfKey) {
        setCpf(localStorage.getItem(cpfKey));
        return;
      }
      
      // Check all localStorage keys for any that might contain CPF info
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        // Check if any key or value contains CPF-like pattern (xxx.xxx.xxx-xx)
        if (/\d{3}\.\d{3}\.\d{3}-\d{2}/.test(value)) {
          const cpfMatch = value.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
          if (cpfMatch) {
            setCpf(cpfMatch[0]);
            return;
          }
        }
        
        // Try parsing as JSON in case CPF is stored in a JSON object
        try {
          const parsedValue = JSON.parse(value);
          if (parsedValue && parsedValue.cpf) {
            setCpf(parsedValue.cpf);
            return;
          }
        } catch (e) {
          // Not JSON, continue checking
        }
      }
      
      console.log('CPF not found in localStorage');
    } catch (error) {
      console.error('Error retrieving CPF from localStorage:', error);
    }
  }, []);

  const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);

    return (
      <div className="star-rating">
        {Array.from({ length: totalStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              size={35}
              color={starValue <= rating ? "#ffc107" : "#c0c0c0"} // Cinza mais visível
              style={{ cursor: "pointer" }}
              onClick={() => {setRating(starValue); setNota(starValue)}}
            />
          );
        })}
      </div>
    );
  };

  async function Criar() {
    console.log('Current CPF value:', cpf);
    
    // Check if cpf is available before proceeding
    if (!cpf) {
      showError('Você precisa estar logado para enviar uma avaliação');
      return;
    }

    if (avaliacao_texto === '' || nota === 0) {
      showError('Preencha todos os campos');
      return;
    }

    try {
      const response = await createAvaliacoes(avaliacao_texto, nota, cpf);
      console.log('API Response:', response);
      if (response === 'avaliação adicionada com sucesso') {
        showError('Avaliação enviada com sucesso!');
        // Reset form
        setAvaliacao_texto('');
        setNota(0);
        setNome('');
        setEmail('');
      } else {
        showError('Avaliação Já Adicionada');
      }
    } catch (err) {
      console.error('Error in Criar function:', err);
      if (err.status === 401) {
        showError('Lembre-se de logar antes de fazer uma avaliação');
      } else {
        showError('Erro ao enviar avaliação. Tente novamente.');
      }
    }
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    if (span) {
      span.textContent = message;
    } else {
      console.error('Elemento span não encontrado');
      alert(message); // Fallback if span doesn't exist
    }
  };

  return (
    <div className="contato-page">
      <NavbarUser />
      <div className="container-contato">
        <img src={vamos} alt="Vamos" className="vamos-image" />
        <div className="contact-box">
          <p className="contact-text">
            Entre em contato com a gente para informações sobre reservas,
            disponibilidade de datas, preços e outras dúvidas. Estaremos à disposição
            para atendê-lo e tornar a sua experiência com a pousada inesquecível.
          </p>
          <button className="contact-button">Fale conosco</button>
        </div>
        <div className="icons-container">
          <a href="tel:+554899940-9732" className="gridPhone-contato">
            <Telephone className="phoneIcon-contato" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pousadaquintadoypua@gmail.com" target="_blank" className="gridEmail-contato">
            <Envelope className="emailIcon-contato" />
          </a>
          <a href="https://www.facebook.com/pousadaquintadoypua" target="_blank" rel="noopener noreferrer" className="gridFacebook-contato">
            <Facebook className="faceIcon-contato" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5548999409732&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20pousada%20e%20tenho%20interesse%20em%20saber%20mais%20informa%C3%A7%C3%B5es." target="_blank" rel="noopener noreferrer" className="gridWhatsapp-contato">
            <Whatsapp className="whatsIcon-contato" />
          </a>
          <a href="https://www.instagram.com/pousadaquintadoypua/" target="_blank" rel="noopener noreferrer" className="gridInstagram-contato">
            <Instagram className="instaIcon-contato" />
          </a>
        </div>
      </div>
      <img src={ava} alt="Avaliações" className="ava-image" />
      <p className="contact-text2">
        Agradecemos por escolher a Quinta do Ypuã para sua estadia. <br />
        Compartilhe sua experiência conosco logo abaixo!
      </p>
      <StarRating />
      <form className="contato-form-contato">
        <input 
          type="text" 
          placeholder="Nome" 
          className="input-contato2" 
          maxLength={100}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="input-contato2" 
          maxLength={100}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Digite sua mensagem" 
          className="input-contato2" 
          maxLength={100} 
          value={avaliacao_texto} 
          onChange={(e) => setAvaliacao_texto(e.target.value)}
        />
        <div className="input-button-container">
          <button type="button" className="contato-button2" onClick={Criar}>Enviar</button>
        </div>
        <span id="span" style={{ color: "red", display: "block", marginTop: "10px" }}></span>
      </form>
    </div>
  );
};

export default Contato;