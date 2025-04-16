import React, { useState } from "react";
import "./contato.css";
import { FaStar } from "react-icons/fa";
import { Envelope, Telephone, Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";
import vamos from "/src/assets/img/vamos.png"; // Importe a imagem "vamos.png"
import ava from "/src/assets/img/ava.png";
import NavbarUser from "../../../assets/components/navbarUser";

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
            onClick={() => setRating(starValue)}
          />
        );
      })}
      
    </div>
  );
};

const Contato = () => {
  return (
    <div>
       <NavbarUser/>
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
        <input type="text" placeholder="Nome" className="input-contato2" />
        <input type="email" placeholder="Email" className="input-contato2" />
        <input type="text" placeholder="Digite sua mensagem" className="input-contato2" />
        <div className=".input-button-container">
        <button type="submit" className="contato-button2">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Contato;
