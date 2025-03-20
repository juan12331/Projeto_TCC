import React, { useState } from "react";
import "./contato.css";
import { FaStar } from "react-icons/fa";
import logo from "/src/assets/img/Logo.png";
import vamos from "/src/assets/img/vamos.png"; // Importe a imagem "vamos.png"
import icons from "/src/assets/img/icons.png"; // Importe a imagem "icons.png"
import ava from "/src/assets/img/ava.png";

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star"
              size={30}
              color={currentRating <= (hover || rating) ? "#FFD700" : "#ccc"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

const Contato = () => {
  return (
    <div>
      <form className="contato-form-contato">
        <input type="text" placeholder="Nome" className="input-contato2" />
        <input type="email" placeholder="Email" className="input-contato2" />
        <input type="text" placeholder="Digite sua mensagem" className="input-contato2" />
        <div className=".input-button-container">
        <button type="submit" className="contato-button2">Enviar</button>
        </div>
      </form>
      
      <header>
        <h3 className="inicio">Início</h3>
        <h3 className="contato">Contato</h3>
        <img src={logo} alt="Pousada" className="logo" />
        <h3 className="acomodacao">Acomodações</h3>
        <h3 className="login">Perfil</h3>
      </header>
      {/* Conteúdo principal */}
      <div className="container-contato">
        <img
          src="/src/assets/img/fundoctt.png"
          alt="Fundoctt"
          className="background-image-contato"
        />
        <img src={vamos} alt="Vamos" className="vamos-image" />
      </div>
      <img src={ava} alt="Avaliações" className="ava-image" />
      <div className="contact-box">
        <p className="contact-text">
          Entre em contato com a gente para informações sobre reservas,
          disponibilidade de datas, preços e outras dúvidas. Estaremos à disposição
          para atendê-lo e tornar a sua experiência com a pousada inesquecível.
        </p>
        <button className="contact-button">Fale conosco</button>
      </div>
      <div className="icons-container">
        <img src={icons} alt="Icons" className="icons-image" />
      </div>
      <p className="contact-text2">
        Agradecemos por escolher a Quinta do Ypuã para sua estadia. <br />
        Compartilhe sua experiência conosco logo abaixo!
      </p>
      {/* Adicionando o sistema de estrelas abaixo do texto de avaliações */}
      <StarRating />
    </div>
  );
};

export default Contato;
